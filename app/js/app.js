const contractUrl = "../build/contracts/PokeBattle.json";
let contractInstance;

const initApp = async () => {
  try {
    const contractData = await fetchContractData(contractUrl);
    if (!contractData) {
      console.error("Contract data is null");
      return;
    }
    //my account on ganache cause it kept asking to use my real metamask account
    const accounts = getWeb3();

    contractInstance = new web3.eth.Contract(
      contractData.abi,
      contractData.networks[5777].address
    );

    const output = await contractInstance.methods
      .ownerPokemonCount(accounts)
      .call();

    if (output === "0") {
      const button = document.createElement("button");
      button.textContent = "Get Starter Pokemon";
      button.onclick = async () => {
        try {
          getStarterPokemon(contractInstance, accounts);
        } catch (error) {
          console.error("Error getting starter pokemon:", error);
        }
      };
      document.body.appendChild(button);
    } else {
      const divElement = document.getElementById("headerButtons");
      const button = document.createElement("button");
      button.textContent = "See My pokémon";
      button.onclick = async () => {
        window.location.href = "myPokemon.html";
      };
      divElement.appendChild(button);
    }
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

initApp();

//helper methods
const getStarterPokemon = async (contract, account) => {
  try {
    await contract.methods.createPokemon("Starter Pokemon").send({
      from: account,
      gas: 3000000, // Increase the gas limit here
    });
    alert("Starter Pokemon obtained!");
    window.location.href = "myPokemon.html";
  } catch (error) {
    console.error("Error getting starter pokemon:", error);
  }
};
