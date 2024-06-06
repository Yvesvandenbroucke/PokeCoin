const contractUrl = "../build/contracts/PokeToken.json";
const pokeHelper = "../build/contracts/PokeHelper.json";
let contractInstance;
const initApp = async () => {
  try {
    const contractData = await fetchContractData(pokeHelper);
    if (!contractData) {
      console.error("Contract data is null");
      return;
    }

    let contractAddress = localStorage.getItem("contractAddress");

    if (!contractAddress) {
      const deployedContract = await deployContract(contractData);
      if (!deployedContract) {
        console.error("Contract deployment failed");
        return;
      }
      contractAddress = deployedContract.options.address;
    }

    contractInstance = new web3.eth.Contract(contractData.abi, contractAddress);

    const accounts = await web3.eth.getAccounts();

    document
      .getElementById("buyPokemonForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonName").value;
        try {
          await buyPokemon(pokemonName, accounts[0], contractInstance);
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
    contract.methods.buyPokemon(pokemonName).send({
      from: account,
      gas: 3000000,
    });
    const output = await contract.methods.ownerPokemonCount(account).call();
    console.log(output);
    window.location.href = "myPokemon.html";
  } catch (error) {
    console.error("Error buying pokemon:", error);
  }
};
