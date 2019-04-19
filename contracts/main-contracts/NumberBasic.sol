pragma solidity ^0.5.0;


/*=================
 * NumberBasic.sol
 *=================
 *
 * A basic number contract which defines the number upon construction.
 *
 */

import "./Number.sol";

contract NumberBasic is Number {

  constructor(uint256 initNumber){
    _setNumber(initNumber);
  }

}
