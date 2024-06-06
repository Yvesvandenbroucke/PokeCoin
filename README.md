# Pokémon Battle Game
Welcome to the Pokémon Battle Game! This repository contains the code and files necessary to deploy and run a simple Pokémon battle game using Ethereum smart contracts and web development technologies.

## Contents
- Contracts: Contains the Solidity smart contract code for the Pokémon game.
- HTML Files: Contains HTML files for different pages of the game, including the main game interface and pages for buying Pokémon and viewing owned Pokémon.
- JavaScript Files: Contains JavaScript files for interacting with the Ethereum blockchain using Web3.js, including fetching contract data, deploying contracts, and managing the game interface.
- CSS Files: Contains CSS files for styling the HTML pages.
## Getting Started
To set up and run the Pokémon Battle Game, follow these steps:
1. ***clone the project from github***
   ´git clone https://github.com/Yvesvandenbroucke/PokeCoin.git´ 
3.  ***Deploy the smart contract to ganache using truffle***
    - Update the ´truffle.config.js´ file with your network settings
    - run ´truffle migrate --reset´
4. ***Run the web3js on a local server***
*in this example we use a python server*
    - run ´python -m http.server´
    - visit ´http://localhost:8000/app´
5. ***Enjoy the game***

 ## Code
 In this project solidity is used for the creation of the blockchain code. This paired with javescript and html made for an interactive web3js site.

 ### Solidity
 The solidity part is spread over six files:
   - PokeCoin.sol
   - PokeToken.sol
   - PokeHelper.sol
   - PokeBattle.sol
   - randomTypeGenerator.sol
   - Ownable.sol
#### Support files
In this project there are two support files. RandomTypeGenerator.sol is used to randomly selected the type of the pokemon by it's DNA. The pokemon can be 18 different types like in the real games.
Ownable.sol is used to see if the owner is doing the command.

#### Coin and Token
The coin called PokeCoin (PKC) is an ERC20 coin. It can be won by battle with your pokemon and defeating the opponent. With this coin a trainer can purchase new pokemon to add to their collection.
A pokemon is represented by the pokeToken. It has a unique nickname, dna and type. The win and loss count are also being tracked. Your pokemon levels each time they defeat an opponent.

#### Battle
In the pokeBattle.sol file is where the battle mechanics are kept. All pokemon have a weakness and resistance like in the real games. These attributes have an impact on the pokemons chance to win.

#### Helper
In the helper file is where the pokemon can be bought.

### App
in the app map is where all files are needed to visualize the project.
