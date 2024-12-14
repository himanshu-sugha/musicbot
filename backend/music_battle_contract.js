const { web3, contract, privateKey } = require('./web3Config'); // Import necessary Web3 config

// Function to send a signed transaction (e.g., for starting the battle or voting)
async function sendTransaction(data) {
  try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);

      // Estimate gas for the transaction
      const gas = await data.tx.estimateGas({ from: account.address });

      // Create the transaction object
      const txData = {
          from: account.address,
          to: contract.options.address,
          gas,
          data: data.tx.encodeABI(),
          gasPrice: web3.utils.toWei('200', 'gwei'),  // Adjust gas price if needed
      };

      // Sign the transaction with the private key
      const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);

      // Send the signed transaction using Infura (or another provider)
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('Transaction receipt:', receipt);
      return receipt;  // Return the transaction receipt
  } catch (error) {
      if (error.message.includes('revert')) {
          // Extract revert reason from the error
          const revertReason = error.message.split('revert ')[1] || 'Unknown revert reason';
          console.error('Transaction reverted:', revertReason);
      } else {
          console.error('Error sending transaction:', error.message || error);
      }
      throw error;  // Rethrow to handle it elsewhere if needed
  }
}


// Function to start a battle
async function startBattle(track1, track2) {
    try {
        const tx = contract.methods.createBattle(track1, track2);
        
        // Call sendTransaction to send the signed transaction
        const result = await sendTransaction({ tx });

        console.log('Battle created:', result);
        return result;  // Return the result of the transaction
    } catch (error) {
        console.error('Error creating battle:', error.message || error);
        throw error;  // Rethrow to handle it elsewhere if needed
    }
}

// Function to vote for a track
async function voteTrack(battleId, trackNumber) {
    try {
        // Ensure battleId exists (optional: check contract state before voting)
        const battle = await contract.methods.battles(battleId).call();
        if (!battle || battle.id !== battleId) {
            throw new Error('Battle does not exist or has been closed.');
        }

        // Create a transaction for voting for a track
        const tx = contract.methods.vote(battleId, trackNumber);

        // Send the transaction
        const result = await sendTransaction({ tx });

        console.log('Vote registered:', result);
        return result;  // Return the result of the vote transaction
    } catch (error) {
        console.error('Error voting for track:', error.message || error);
        throw error;  // Rethrow to handle it elsewhere if needed
    }
}

module.exports = { startBattle, voteTrack, sendTransaction };
