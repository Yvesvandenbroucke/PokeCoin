const contractUrl = "../build/contracts/PokeBattle.json";

const loadMyPokemon = async () => {
  try {
    const contractData = await fetchContractData(contractUrl);
    if (!contractData) {
      console.error("Contract data is null");
      return;
    }
    const accounts = getWeb3();

    const contract = new web3.eth.Contract(
      contractData.abi,
      contractData.networks[5777].address
    );

    const pokemonCount = await contract.methods
      .ownerPokemonCount(accounts)
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
