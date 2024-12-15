const { web3, musicBattleContract, shareMusicContract, voteTrackContract, leaderboardsContract, privateKey } = require('./web3Config');

// Helper function to send a signed transaction
async function sendTransaction(tx, contractAddress) {
    try {
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        // Estimate gas for the transaction
        const gas = await tx.estimateGas({ from: account.address });

        // Prepare transaction data
        const txData = {
            from: account.address,
            to: contractAddress || musicBattleContract.options.address, // Default to the main contract address
            gas,
            data: tx.encodeABI(),
            gasPrice: web3.utils.toWei('20', 'gwei'), // Adjust gas price if needed
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error sending transaction:', error.message || error);
        throw error;
    }
}

// Function to start a music battle
async function startBattle(track1, track2) {
    try {
        const tx = musicBattleContract.methods.startBattle(track1, track2);
        const result = await sendTransaction(tx, musicBattleContract.options.address);
        console.log('Music battle started:', result);
        return result;
    } catch (error) {
        console.error('Error starting music battle:', error.message || error);
        throw error;
    }
}

// Function to vote for a track in a battle
async function voteTrack(battleId, trackNumber) {
    try {
        const tx = musicBattleContract.methods.voteTrack(battleId, trackNumber);
        const result = await sendTransaction(tx, musicBattleContract.options.address);
        console.log(`Vote for track ${trackNumber} in battle ${battleId} registered:`, result);
        return result;
    } catch (error) {
        console.error('Error voting for track:', error.message || error);
        throw error;
    }
}

// Function to share a music track with another user
async function shareMusic(trackId, userAddress) {
    try {
        const tx = shareMusicContract.methods.shareMusic(trackId, userAddress);
        const result = await sendTransaction(tx, shareMusicContract.options.address);
        console.log(`Track ${trackId} shared with user ${userAddress}:`, result);
        return result;
    } catch (error) {
        console.error('Error sharing music:', error.message || error);
        throw error;
    }
}

// Function to fetch the leaderboard
async function getLeaderboards() {
    try {
        const leaderboard = await leaderboardsContract.methods.getLeaderboard().call();
        console.log(leaderboard);
        return leaderboard;
    } catch (error) {
        console.error("Error fetching leaderboards:", error);
    }
}

module.exports = {
    startBattle,
    voteTrack,
    shareMusic,
    getLeaderboards,
    sendTransaction,
};
