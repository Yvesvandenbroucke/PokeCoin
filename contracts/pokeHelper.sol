// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './pokeToken.sol';


contract pokeHelper is PokeToken{

    uint public pokemonBuyFee = 300;

    modifier ownerOf(uint _pokemonId) {
        require(msg.sender == pokemonToOwner[_pokemonId]);
        _;
    }

    function setBuyFee(uint _fee) external onlyOwner {
        pokemonBuyFee = _fee;
    }

    function buyPokemon(string memory _name) external payable {
        require(msg.value == pokemonBuyFee);
        payable(owner()).transfer(msg.value);
        createPokemon(_name);
    }

}