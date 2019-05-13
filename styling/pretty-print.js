
/**
 * A class consisting of print styling functions (returns a string, which is then, presumably passed to a print function):
 *
 * for headlines (adding ==== below as well)
 * for mini-headlines (adding ---- below as well)
 */
class PrettyPrint {
 
  /**
   * Add an "> " prefix to the argument and return.
   * @param {*} str
   */ 
  arrow(str) {
    return "> " + str;
  }
  
  /**
   * Add a headline to the argument and return. The headline is as long as the argument in characters. 
   * @param {*} str
   * @param {string} symbol - Symbol to repeat as a headline
   */
  headline(str, symbol) {
    let output = "";
    output += str;
    output += "\n" + symbol.repeat(str.length);
    return output;
  }

  /**
   * Add a main headline to the argument and return, all consisting of "="s.
   * @param {*} str
   */
  mainheadline(str) {
    return this.headline(str, "=");
  }

  /**
   * Add a main headline to the argument and return, all consisting of "-"s.
   * @param {*} str
   */
  miniheadline(str) {
    return this.headline(str, "-");
  }
  
  
}

module.exports = PrettyPrint;
