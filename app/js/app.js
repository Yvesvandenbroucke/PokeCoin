const contractUrl = "../build/contracts/PokeToken.json";
let contractInstance;
const initApp = async () => {
  try {
    const contractData = await fetchContractData(contractUrl);
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
    const output = await contractInstance.methods
      .ownerPokemonCount(accounts[0])
      .call();

    if (output === "0") {
      const button = document.createElement("button");
      button.textContent = "Get Starter Pokemon";
      button.onclick = async () => {
        try {
          getStarterPokemon(contractInstance, accounts[0]);
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
