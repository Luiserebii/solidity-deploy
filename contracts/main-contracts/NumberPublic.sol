pragma solidity ^0.5.0;


/*==================
 * NumberPublic.sol
 *==================
 *
 * A public number contract, which can also be publicly set regardless of sender. 
 * Utility is primarily for testing (as you might imagine).
 * Fails if number has already been set (to the one requested).
 *
 */

import "./Number.sol";
import "./NumberBasic.sol";

contract NumberPublic is Number, NumberBasic {

  function setNumber(uint256 num) public returns (bool) {
    require(num != number());
    _setNumber(num);
    return true;
  }

}

