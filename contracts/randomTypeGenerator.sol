// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RandomTypeGenerator {
    function generateRandomType(uint dna) public pure returns (string memory) {
        uint typeIndex = dna % 18; 
        if (typeIndex == 0) {
            return "normal";
        } else if (typeIndex == 1) {
            return "fire";
        } else if (typeIndex == 2) {
            return "water";
        } else if (typeIndex == 3) {
            return "electric";
        } else if (typeIndex == 4) {
            return "grass";
        } else if (typeIndex == 5) {
            return "ice";
        } else if (typeIndex == 6) {
            return "fighting";
        } else if (typeIndex == 7) {
            return "poison";
        } else if (typeIndex == 8) {
            return "ground";
        } else if (typeIndex == 9) {
            return "flying";
        } else if (typeIndex == 10) {
            return "psychic";
        } else if (typeIndex == 11) {
            return "bug";
        } else if (typeIndex == 12) {
            return "rock";
        } else if (typeIndex == 13) {
            return "ghost";
        } else if (typeIndex == 14) {
            return "dragon";
        } else if (typeIndex == 15) {
            return "dark";
        } else if (typeIndex == 16) {
            return "steel";
        } else {
            return "fairy";
        }
    }
}
