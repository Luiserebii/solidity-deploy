pragma solidity ^0.5.0;

/*
 * Simple NumberInterface contract. A contract implementing this interface can be assumed to be "quantifiable", and thus expose a number for manipulation
 *
 */

interface NumberInterface {
    function number() external view returns (uint256);
}
