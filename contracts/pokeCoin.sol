// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PokeCoin {
    string public constant name = "PokeCoin";
    string public constant symbol = "PKC";
    uint8 public constant decimals = 18; 
    uint256 public totalSupply = 12000000 * (10 ** uint256(decimals)); 

    mapping(address => uint256) public balanceOf;
    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }   
}