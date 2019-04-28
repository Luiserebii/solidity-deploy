/*=============
 *  Logger.js
 *=============
 *
 * Basic logger class that allows for selectively printing certain messages
 * to the console, depending on the level of desired verbosity.
 * 
 * The states, in order of verbosity, are:
 *   NONE, NORMAL, SUPER, MASTER
 * (MIN, as in minimal [potentialy between NONE and MIN])
 *
 */

class Logger {

  const state = {
    NONE: 0,
    MIN: 1, 
    NORMAL: 2,
    SUPER: 3,
    MASTER: 4
  };

  constructor(_setting = this.state.NORMAL) {
    this.setting = _setting;
  }

  //Print "Normal", as in "verbose"
  printNormal(msg) {
    validate(this.state.NORMAL) ? this.print(msg) : ;
  }

  //Print "Normal", as in "verbose"
  printMinimal(msg) {
    validate(this.state.MIN) ? this.print(msg) : ;
  }

  //Print "Super", as in "super-verbose"
  printSuper(msg) {
    validate(this.state.SUPER) ? this.print(msg) : ;
  }

  //Print "Master", as in absolutely-verbose
  printMaster(msg) {
    validate(this.state.MASTER) ? this.print(msg) : ;
  }
 
  //Function defining print functionality itself
  print(arg1, arg2) {
    arguments.length === 1 
      ? this.pureprint(arg1);
      : {

          this.validate(arg1) ? this.pureprint(arg2) : return false; 
          
        }
      ;
    return true;
  }

  pureprint(msg) {
    console.log(msg);
  }

  endl() {
    console.log("\n");
  }

  //Minor, but this could be renamed to "isValid"
  validate(state) {
    return state <= this.setting; //Return true if the state is within constraints, else false
  }
 
}

module.exports = Logger;
