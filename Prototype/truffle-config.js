const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "twenty audit thank borrow brain gaze truck piano slice rotate pill egg";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
		rinkeby: {
			// provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/e0f8c2efe7c64865bf39f167399ee984`),
			provider: () => new HDWalletProvider(mnemonic, `wss://rinkeby.infura.io/ws/v3/f0f1b86ad0564740b96219185806734d`),
			network_id: 4,       // Ropsten's id
			gas: 1000000,        // Ropsten has a lower block limit than mainnet
			gasPrice: 200000000000,
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

	// Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

};
