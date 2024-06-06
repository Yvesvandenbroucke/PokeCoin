const rndmTypeGenerator = artifacts.require("RandomTypeGenerator");
const ownable = artifacts.require("Ownable");
const pokeHelper = artifacts.require("PokeHelper");
const pokeToken = artifacts.require("PokeToken");
const PokeBattle = artifacts.require("PokeBattle");

module.exports = function (deployer) {
  deployer.deploy(rndmTypeGenerator);
  deployer.deploy(ownable);
  deployer.deploy(pokeToken);
  deployer.deploy(pokeHelper);
  deployer.deploy(PokeBattle, "0xaD3fd857b2Ee79d234613300dBA61865539c5524");
};
