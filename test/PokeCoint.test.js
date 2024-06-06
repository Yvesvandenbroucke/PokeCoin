const PokeCoin = artifacts.require("PokeCoin");

contract("PokeCoin", (accounts) => {
  let pokeCoinInstance;
  const owner = accounts[0];
  const recipient = accounts[1];

  before(async () => {
    pokeCoinInstance = await PokeCoin.deployed();
  });

  it("should set the owner's balance to total supply upon deployment", async () => {
    const balance = await pokeCoinInstance.balanceOf(owner);
    const totalSupply = await pokeCoinInstance.totalSupply();
    assert.equal(
      balance.toString(),
      totalSupply.toString(),
      "Owner's balance should equal total supply"
    );
  });

  it("should transfer tokens between accounts", async () => {
    const amount = web3.utils.toBN(100);
    await pokeCoinInstance.transfer(recipient, amount, { from: owner });
    const ownerBalance = await pokeCoinInstance.balanceOf(owner);
    const recipientBalance = await pokeCoinInstance.balanceOf(recipient);
    assert.equal(
      ownerBalance.toString(),
      (await pokeCoinInstance.totalSupply()).sub(amount).toString(),
      "Owner's balance should decrease by the transferred amount"
    );
    assert.equal(
      recipientBalance.toString(),
      amount.toString(),
      "Recipient's balance should increase by the transferred amount"
    );
  });
});
