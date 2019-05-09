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
 *
 * Inspiration for this class:  
 *   // An interesting solution to the spamming of if(verbose) might be to create a
 *   // seperate class containing the whole verbose logic, initialize it by passing
 *   // in the verbose variable (which would be a bool (I don't think enum is possible))
 *   //                    NOTE: enum may be possible; simply have different functions
 *   //                    which highlight what kind of printing it is, such as
 *   //                    printSuper(msg) which would only display if internal enum
 *   //                    allows it 
 *   // and running a function, like
 *   // "print(msg)" which would handle the logic internally based on the value passed
 *   // on initialization
 *
 */

class Logger {

  //const state = {} enum equivalent
  static get state() {
    return {
      NONE: 0,
      MIN: 1, 
      NORMAL: 2,
      SUPER: 3,
      MASTER: 4
    }
  };
  
                         //Have to name it explicitly
  constructor(_setting = Logger.state.NORMAL) {
    this.setting = _setting;
  }

  //Print "Normal", as in "verbose"
  printNormal(msg) {
    if(validate(Logger.state.NORMAL)) this.print(msg);
  }

  //Print "Normal", as in "verbose"
  printMinimal(msg) {
    if(validate(Logger.state.MIN)) this.print(msg);
  }

  //Print "Super", as in "super-verbose"
  printSuper(msg) {
    if(validate(Logger.state.SUPER)) this.print(msg);
  }

  //Print "Master", as in absolutely-verbose
  printMaster(msg) {
    if(validate(Logger.state.MASTER)) this.print(msg);
  }
 
  //Function defining print functionality itself
  print(arg1, arg2) {

    if(arguments.length === 1) {

      this.pureprint(arg1)

    } else if(this.validate(arg1)){

      if(arguments.length === 2){
        this.pureprint(arg2)
      } else {
        this.pureprintMulti(...Array.from(arguments).slice(1)) 
      }
     
    }
    return true;
  }

  pureprintMulti() {
    for(let i = 0; i < arguments.length; i++) {
      this.pureprint(arguments[i]);
    }
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