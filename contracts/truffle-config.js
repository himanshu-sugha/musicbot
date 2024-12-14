module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "your-mnemonic-or-private-key",
          `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`
        ),
      network_id: 4, // Rinkeby testnet id
      gas: 4500000,
      gasPrice: 10000000000, // 10 gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Specify compiler version
    },
  },
};
