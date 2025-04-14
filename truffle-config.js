module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "5777", // Match any network id
      gas: 6721975, // Gas limit
      gasPrice: 20000000000, // Gas price
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Ensure correct Solidity version
    },
  },
};
