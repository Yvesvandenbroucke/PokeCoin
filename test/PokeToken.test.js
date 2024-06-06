const PokeToken = artifacts.require("PokeToken");

contract("PokeToken", (accounts) => {
  let instance;
  before(async () => {
    instance = await PokeToken.deployed();
  });
  it("should create a new Pokemon with correct attributes", async () => {
    const owner = accounts[0];
    const pokemonName = "Pikachu";
    await instance.createPokemon(pokemonName, { from: owner });

    const pokemon = await instance.pokemons(0);

    assert.equal(pokemon.name, pokemonName, "Incorrect Pokemon name");
    assert.equal(pokemon.level, 1, "Incorrect Pokemon level");
  });

  it("should not allow creating multiple Pokemon by the same owner", async () => {
    const owner = accounts[0];
    const pokemonName = "Charmander";
    // Attempt to create another Pokemon by the same owner
    try {
      await instance.createPokemon(pokemonName, { from: owner });
      assert.fail("Expected an error but got success");
    } catch (error) {
      assert(error.message.includes("revert"), "Expected revert error");
    }
  });
});
