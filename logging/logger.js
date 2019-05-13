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


/**
 * Basic logger class that allows for selectively printing certain messages
 * to the console, depending on the level of desired verbosity.
 * 
 * The states, in order of verbosity, are:
 *   NONE, NORMAL, SUPER, MASTER
 * (MIN, as in minimal [potentialy between NONE and MIN])
 *
 * Meant to be held as an object by classes to hold state of logging, and process logic, such as deciding whether or not to print/log something or not. All a utilizing class would need to do would be to hold a Logger object, and call .print(), allowing the rest to do its job.
 *
 */
class Logger {

  //const state = {} enum equivalent
  /**
   * Logger.state.ENUM - "NONE": 0, "MIN": 1, "NORMAL": 2, "SUPER": 3, "MASTER": 4
   */
  static get state() {
    return {
      NONE: 0,
      MIN: 1, 
      NORMAL: 2,
      SUPER: 3,
      MASTER: 4
    }
  };
  
  /**
   * Initialize a Logger object.
   * @param {Logger.state.ENUM} _setting - Internal state which the logger is set at. 
   */
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
 

  
  /**
   * Function defining print functionality itself.
   *
   * 
   * @param {*|Logger.state.ENUM} arg1 - IF only one argument has been passed, it is assumed that this is something to be printed. In every other case, this argument is a Logger.state.ENUM which represents which "level" of logging the statement is appropriate for (i.e., print(Logger.state.MASTER, mnemonic))
   * @param {...*} arg2 - Print every additional argument, for syntactic sugar.
   * @return {boolean} success
   */
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

  /**
   * Prints multiple arguments, iterating over them one at a time.
   * 
   * @return {boolean} success
   */
  pureprintMulti() {
    for(let i = 0; i < arguments.length; i++) {
      this.pureprint(arguments[i]);
    }
    return true;
  }

  /**
   * Pure print function. Defines the absolute base functionality for printing. Essentially just an alias for console.log() at the moment.
   * @param {*} msg - Prints argument to the console.
   */
  pureprint(msg) {
    console.log(msg);
  }

  /**
   * Simply a convenient alias for "\n".
   */
  endl() {
    console.log("\n");
  }

  /**
   * A simple function which determines whether or not the passed state "passes", taking the Logger's state value into account. If the state is lower than or the same as the current Logger state (where higher would mean "more verbose/permissive") then true is returned, otherwise, false.
   * @return {boolean} valid
   */
  //Minor, but this could be renamed to "isValid"
  validate(state) {
    return state <= this.setting; //Return true if the state is within constraints, else false
  }
 
}

module.exports = Logger;
