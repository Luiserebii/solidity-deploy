
// File: contracts/main-contracts/interfaces/NumberInterface.sol

pragma solidity ^0.5.0;

/*
 * Simple NumberInterface contract. A contract implementing this interface can be assumed to be "quantifiable", and thus expose a number for manipulation
 *
 */

interface NumberInterface {
    function number() external view returns (uint256);
}

// File: contracts/main-contracts/Number.sol

pragma solidity ^0.5.0;

/*============
 * Number.sol
 *============
 *
 * A simple contract extending the Number interface, a contract which extends this,
 * will gain a basic private instance variable "_number" and related methods
 *
 */


contract Number is NumberInterface {

  uint256 private _number;

  function number() public view returns (uint256) {
    return _number;
  }
 
  //Accessor function for _number var
  function _setNumber(uint256 num) internal returns (bool) {
    _number = num;
  }
}
