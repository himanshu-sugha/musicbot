const { Web3 } = require('web3');
require('dotenv').config(); // To load the .env file for sensitive information

// Connect to Ethereum network (using Infura or your local node)
const web3 = new Web3('HTTP://127.0.0.1:7545'); // Replace with your Infura project ID or local node URL

// ABI files for the contracts
const musicBattleABI = require('../contracts/build/contracts/MusicBattle.json').abi;
const shareMusicABI = require('../contracts/build/contracts/ShareMusic.json').abi;
const voteTrackABI = require('../contracts/build/contracts/VoteTrack.json').abi;
const leaderboardsABI = require('../contracts/build/contracts/Leaderboards.json').abi;

// Hardcoded contract addresses
const musicBattleAddress = '0xA2469Bf60a150d70630c75a6f2E8A28AEb89a2f8'; // Replace with your deployed contract address
const shareMusicAddress = '0x2a970D30fF7AA95CEF89dfF8e6227c9D83B007c4'; // Replace with your deployed contract address
const voteTrackAddress = '0x2a970D30fF7AA95CEF89dfF8e6227c9D83B007c4'; // Replace with your deployed contract address
const leaderboardsAddress = '0x2a970D30fF7AA95CEF89dfF8e6227c9D83B007c4'; // Replace with your deployed contract address

// Hardcoded private key (use with caution)
const privateKey = '0x7fa1d88ecaf403121b5548d86d5128382099cd23e3b057f497058374a13505e8'; // Replace with your private key

// Create contract instances
const musicBattleContract = new web3.eth.Contract(musicBattleABI, musicBattleAddress);
const shareMusicContract = new web3.eth.Contract(shareMusicABI, shareMusicAddress);
const voteTrackContract = new web3.eth.Contract(voteTrackABI, voteTrackAddress);
const leaderboardsContract = new web3.eth.Contract(leaderboardsABI, leaderboardsAddress);

// Export the web3 instance, contracts, and private key for use in other files
module.exports = { 
  web3, 
  musicBattleContract, 
  shareMusicContract, 
  voteTrackContract, 
  leaderboardsContract, 
  privateKey 
};
