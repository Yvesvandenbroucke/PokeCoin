const contractUrl = "../build/contracts/PokeBattle.json";

let contractInstance;
const initApp = async () => {
  try {
    const contractData = await fetchContractData(contractUrl);
    if (!contractData) {
      console.error("Contract data is null");
      return;
    }
    const accounts = getWeb3();

    contractInstance = new web3.eth.Contract(
      contractData.abi,
      contractData.networks[5777].address
    );

    document
      .getElementById("buyPokemonForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonName").value;
        try {
          await buyPokemon(pokemonName, accounts, contractInstance);
        } catch (error) {
          console.error("Error buying Pokémon:", error);
        }
      });
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

initApp();

//helper methods
const buyPokemon = async (pokemonName, account, contract) => {
  try {
    await contract.methods.buyPokemon(pokemonName).send({
      from: account,
      value: 300,
      gas: 3000000,
    });

    window.location.href = "myPokemon.html";
  } catch (error) {
    console.error("Error buying pokemon:", error);
  }
};
