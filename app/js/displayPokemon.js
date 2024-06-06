const contractUrl = "../build/contracts/PokeToken.json";

const fetchContractData2 = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contractData = await response.json();
    return contractData;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return null;
  }
};

const loadMyPokemon = async () => {
  try {
    const contractData = await fetchContractData2(contractUrl);
    if (!contractData) {
      console.error("Contract data is null");
      return;
    }

    const contractAddress = localStorage.getItem("contractAddress");
    const contract = new web3.eth.Contract(contractData.abi, contractAddress);

    const accounts = await web3.eth.getAccounts();
    const pokemonCount = await contract.methods
      .ownerPokemonCount(accounts[0])
      .call();

    const container = document.createElement("div");
    container.className = "pokemon-container";

    for (let i = 0; i < pokemonCount; i++) {
      const pokemon = await contract.methods.pokemons(i).call();
      const currentTime = Math.floor(Date.now() / 1000);
      const pokemonElement = document.createElement("div");
      pokemonElement.className = "pokemon";
      pokemonElement.innerHTML = `
          <p>Name: ${pokemon.name}</p>
          <p>Type: ${pokemon.pType}</p>
          <p>Level: ${pokemon.level}</p>
          <p>Win Count: ${pokemon.winCount}</p>
          <p>Loss Count: ${pokemon.lossCount}</p>
        `;
      container.appendChild(pokemonElement);
      console.log(pokemon);

      //if cool down timer is done
      console.log(currentTime);
      console.log(pokemon.readyTime);
      if (currentTime >= pokemon.readyTime) {
        const fightButton = document.createElement("button");
        fightButton.textContent = "Fight";
        fightButton.onclick = () => {
          // Add your fight button click event handler here
          console.log("Fight button clicked for Pokemon ID:", i);
        };
        pokemonElement.appendChild(fightButton);

        container.appendChild(pokemonElement);
      }
    }
    document.body.appendChild(container);
  } catch (error) {
    console.error("Error loading Pokémon:", error);
  }
};

window.onload = loadMyPokemon;
