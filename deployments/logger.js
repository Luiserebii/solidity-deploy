/*=============
 *  Logger.js
 *=============
 *
 * Basic logger class that allows for selectively printing certain messages
 * to the console, depending on the level of desired verbosity.
 * 
 * The states, in order of verbosity, are:
 *   NONE, NORMAL, SUPER, MASTER
 *
 *
 */

class Logger {

  const state = {
    NONE: 0,
    NORMAL: 1,
    SUPER: 2,
    MASTER: 3
  };

  constructor(_setting) {
    this.setting = _setting;
  }


  //Print "Super", as in "super-verbose"
  printS(msg) {
    validate(this.state.SUPER) ? this.print(msg) : ;
  }

  //Print "Master", as in absolutely-verbose
  printM(msg) {
    validate(this.state.MASTER) ? this.print(msg) : ;
  }
 
  //Function defining print functionality itself
  print(msg) {
    console.log(msg);
  }

  //Minor, but this could be renamed to "isValid"
  validate(state) {
    return state <= this.setting; //Return true if the state is within constraints, else false
  }
 
}

module.exports = Logger;
