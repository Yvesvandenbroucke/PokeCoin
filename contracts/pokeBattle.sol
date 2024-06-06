// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//safeMath isn't necassary anymore when using solidity 0.8+
//https://ethereum.stackexchange.com/questions/140714/how-to-do-safemath-with-solidity-0-8-0
//https://metaschool.so/articles/use-safemath-sol-into-contract/
//import "./safeMath.sol";
import "./pokeHelper.sol";
import "./pokeCoin.sol";


contract PokeBattle is pokeHelper {
    PokeCoin public pokeCoinContract; 

    constructor(address pokeCoinAddress) {
        pokeCoinContract = PokeCoin(pokeCoinAddress);
    }

    uint256 public rewardAmount = 100;
    uint randNonce = 0;

    function randMod(uint _modulus) internal returns(uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
    }

    function battle(uint256 _pokemonId1, uint256 _pokemonId2) public ownerOf(_pokemonId1){
        uint attackVictoryProbability;

        Pokemon memory pokemon1 = pokemons[_pokemonId1];
        Pokemon memory pokemon2 = pokemons[_pokemonId2];

        //battle function
        address winner;
        attackVictoryProbability = typeAdvantage(pokemon1.pType, pokemon2.pType);
        uint rand = randMod(100);
        if(attackVictoryProbability >= rand) {
            pokemon1.winCount++;
            if(pokemon1.level < 100){
                pokemon1.level++;
            }
            pokemon2.lossCount++;
            winner = pokemonToOwner[_pokemonId1];
        }else{
            pokemon2.winCount++;
            if(pokemon2.level < 100){
                pokemon2.level++;
            }
            pokemon1.lossCount++;
            winner = pokemonToOwner[_pokemonId2];
        }
        pokeCoinContract.transfer(winner, rewardAmount);
    }

function typeAdvantage(string memory pTypeAttacker, string memory pTypeDefender) internal pure returns (uint){
        // Fire type
        if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("fire"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("water")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 80; // Advantage
            }
        } 
        // Water type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("water"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("water"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock"))) {
                return 80; // Advantage
            }
        }
        // Grass type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("grass"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("poison")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dragon"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("water")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock"))) {
                return 80; // Advantage
            }
        }
        // Electric type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("electric"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("water")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying"))) {
                return 80; // Advantage
            }
        }
        // Ice type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("ice"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dragon"))) {
                return 80; // Advantage
            }
        }
        // Fighting type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("fighting"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("psychic")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fairy"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("normal")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dark"))) {
                return 80; // Advantage
            }
        }
        // Poison type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("poison"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fairy"))) {
                return 80; // Advantage
            }
        }
        //ground type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("ground"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("water")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("electric")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("poison")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 80; // Advantage
            }
        }
        // Flying type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("flying"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("electric")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug"))) {
                return 80; // Advantage
            }
        }
        // Psychic type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("psychic"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ghost")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dark"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("poison"))) {
                return 80; // Advantage
            }
        }
        // Bug type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("bug"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("grass")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("psychic")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dark"))) {
                return 80; // Advantage
            }
        }
        // Rock type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("rock"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("flying")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug"))) {
                return 80; // Advantage
            }
        }
        // Ghost type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("ghost"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("normal")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("psychic"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("ghost")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dark"))) {
                return 80; // Advantage
            }
        }
        // Dragon type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("dragon"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("dragon"))) {
                return 80; // Advantage
            }
        }
        // Dark type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("dark"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("bug")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fairy"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("ghost")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("psychic"))) {
                return 80; // Advantage
            }
        }
        // Steel type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("steel"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fire")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("ground"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("ice")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("fairy"))) {
                return 80; // Advantage
            }
        }
        // Fairy type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("fairy"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("poison")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))) {
                return 30; // Disadvantage
            } else if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("fighting")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dragon")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("dark"))) {
                return 80; // Advantage
            }
        }
        // Normal type
        else if (keccak256(bytes(pTypeAttacker)) == keccak256(bytes("normal"))) {
            if (keccak256(bytes(pTypeDefender)) == keccak256(bytes("rock")) ||
                keccak256(bytes(pTypeDefender)) == keccak256(bytes("steel"))
                || keccak256(bytes(pTypeDefender)) == keccak256(bytes("ghost"))) {
                return 30; // Disadvantage
            }
        }
        // If none of the conditions match, return 50 for neutral advantage
        return 50;
    }
}