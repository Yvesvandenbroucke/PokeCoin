// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";
import "./randomTypeGenerator.sol";

contract PokeToken is Ownable, RandomTypeGenerator {

    event NewPokemon(uint pokemonId, string name, uint dna, string pType);
    uint cooldownTime = 1 days;
    
    struct Pokemon {
        string name;
        uint dna;
        string pType;
        uint8 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Pokemon[] public pokemons;

    mapping (uint => address) public pokemonToOwner;
    mapping (address => uint) public ownerPokemonCount;

    //used to generate DNA but also to generates the pokemon type
    function _generateRandomDna(string memory _str) private pure returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand;
    }
    function _createPokemon(string memory _name, uint _dna) internal {
        string memory pType = generateRandomType(_dna);
        pokemons.push(Pokemon(_name, _dna, pType, 1, uint32(block.timestamp + cooldownTime), 0, 0));
        uint id = pokemons.length;
        pokemonToOwner[id] = msg.sender;
        ownerPokemonCount[msg.sender]++;
        emit NewPokemon(id, _name, _dna, pType);
    }

    function createPokemon(string memory _name) public {
        require(ownerPokemonCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createPokemon(_name, randDna);
    }
}
