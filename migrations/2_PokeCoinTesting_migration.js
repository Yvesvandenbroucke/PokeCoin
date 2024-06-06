const PokeCoin = artifacts.require("PokeCoin");

module.exports = function (deployer) {
  deployer.deploy(PokeCoin);
};
