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
    arguments.length === 1 
      ? this.pureprint(arg1)
      : //lol these {} don't do anything

          this.validate(arg1) 
            ? arguments.length === 2
              ? this.pureprint(arg2)
              : this.pureprintMulti(Array.from(arguments).slice(1)) 
            : false; 
          
       
      ;
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
