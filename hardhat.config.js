require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
require('hardhat-gas-reporter');
require('solidity-coverage');

module.exports = {
  solidity: {
    version: '0.8.13',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    showTimeSpent: true,
  },
  plugins: ['solidity-coverage'],
};