pragma solidity ^0.5.0;

/*============
 * Number.sol
 *============
 *
 * A simple contract extending the Number interface, a contract which extends this,
 * will gain a basic private instance variable "_number" and related methods
 *
 */

import "./interfaces/NumberInterface.sol";

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
