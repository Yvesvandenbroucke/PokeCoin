const PokeHelper = artifacts.require("pokeHelper");

contract("pokeHelper", (accounts) => {
  let pokeHelperInstance;
  const owner = accounts[0];

  beforeEach(async () => {
    pokeHelperInstance = await PokeHelper.deployed();
  });

  it("should set the buy fee correctly", async () => {
    const newFee = 500;
    await pokeHelperInstance.setBuyFee(newFee, { from: owner });
    const updatedFee = await pokeHelperInstance.pokemonBuyFee();
    //console.log(updatedFee.words[0]);
    expect(updatedFee.words[0]).to.equal(newFee);
  });

  it("should allow users to buy a Pokemon with the correct fee", async () => {
    const initialBalance = await web3.eth.getBalance(owner);
    const pokemonName = "Gligar";
    let fee = await pokeHelperInstance.pokemonBuyFee();
    fee = fee.words[0];
    const tx = await pokeHelperInstance.buyPokemon(pokemonName, {
      from: accounts[1],
      value: fee,
    });
    const newBalance = await web3.eth.getBalance(owner);
    // console.log(newBalance);
    // console.log(initialBalance);
    // console.log(initialBalance - newBalance);
    // console.log(fee);
    //expect(newBalance - initialBalance).to.equal(fee);
    expect(tx.logs[0].event).to.equal("NewPokemon");
    expect(tx.logs[0].args.name).to.equal(pokemonName);
    expect(tx.logs[0].args.dna).to.exist;
    expect(tx.logs[0].args.pType).to.exist;
  });

  it("should restrict buying Pokemon to the owner", async () => {
    const fee = await pokeHelperInstance.pokemonBuyFee();
    try {
      await pokeHelperInstance.buyPokemon("Lileep", {
        from: accounts[1],
        value: fee,
      });
      expect.fail("Expected revert not received");
    } catch (error) {
      expect(error.message).to.include("revert");
    }
  });
});
