const RandomTypeGenerator = artifacts.require("RandomTypeGenerator");

contract("RandomTypeGenerator", (accounts) => {
  let instance;
  before(async () => {
    instance = await RandomTypeGenerator.deployed();
  });
  it("should get type normal", async () => {
    const dna = 18;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "normal", "pokemon type should equal normal");
  });
  it("should get type fire", async () => {
    const dna = 19;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "fire", "pokemon type should equal fire");
  });
  it("should get type water", async () => {
    const dna = 20;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "water", "pokemon type should equal water");
  });
  it("should get type electric", async () => {
    const dna = 21;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(
      generatedType,
      "electric",
      "pokemon type should equal electric"
    );
  });
  it("should get type grass", async () => {
    const dna = 22;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "grass", "pokemon type should equal grass");
  });
  it("should get type ice", async () => {
    const dna = 23;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "ice", "pokemon type should equal ice");
  });
  it("should get type fighting", async () => {
    const dna = 24;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(
      generatedType,
      "fighting",
      "pokemon type should equal fighting"
    );
  });
  it("should get type poison", async () => {
    const dna = 25;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "poison", "pokemon type should equal poison");
  });
  it("should get type ground", async () => {
    const dna = 26;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "ground", "pokemon type should equal ground");
  });
  it("should get type flying", async () => {
    const dna = 27;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "flying", "pokemon type should equal flying");
  });
  it("should get type psychic", async () => {
    const dna = 28;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "psychic", "pokemon type should equal psychic");
  });
  it("should get type bug", async () => {
    const dna = 29;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "bug", "pokemon type should equal bug");
  });
  it("should get type rock", async () => {
    const dna = 30;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "rock", "pokemon type should equal rock");
  });
  it("should get type ghost", async () => {
    const dna = 31;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "ghost", "pokemon type should equal ghost");
  });
  it("should get type dragon", async () => {
    const dna = 32;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "dragon", "pokemon type should equal dragon");
  });
  it("should get type dark", async () => {
    const dna = 33;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "dark", "pokemon type should equal dark");
  });
  it("should get type steel", async () => {
    const dna = 34;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "steel", "pokemon type should equal steel");
  });
  it("should get type fairy", async () => {
    const dna = 35;
    const generatedType = await instance.generateRandomType(dna);
    assert.equal(generatedType, "fairy", "pokemon type should equal fairy");
  });
});
