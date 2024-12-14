const {Web3} = require('web3');
require('dotenv').config(); // To load the .env file for sensitive information

// Connect to Ethereum network (using Infura or your local node)
const web3 = new Web3('HTTP://127.0.0.1:7545'); // Replace with your Infura project ID or local node URL

// ABI of the contract generated from compiling the Solidity contract
const contractABI = require('../contracts/build/contracts/MusicBattle.json').abi;
const contractAddress = '0x03dC815ced0b07c263930e0b834487321be44099'; // Replace with your deployed contract address

// Hardcoded private key (replace this with a secure method later)
const privateKey = '0x84218a4fc1599ee6d92573e7e5ac6909fa837a76c35f7be02ded25aff3a71d2c';

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, contract, privateKey };
