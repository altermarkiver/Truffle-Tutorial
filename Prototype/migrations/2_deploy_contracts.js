var Lottery = artifacts.require("./Lottery.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Lottery, {from: accounts[0]});
};
