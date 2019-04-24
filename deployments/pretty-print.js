class PrettyPrint {
  
  arrow(str) {
    return "> " + str;
  }
  

  headline(str, symbol) {
    let output = "";
    output += str;
    output += "\n" + symbol.repeat(str.length);
    return output;
  }

  mainheadline(str) {
    return this.headline(str, "=");
  }

  miniheadline(str) {
    return this.headline(str, "-");
  }
  
  
}

module.exports = PrettyPrint;
