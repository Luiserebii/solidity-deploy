const path = require('path');
console.log("================")
console.log(path.resolve('./'), path.resolve('../'))
const defaultConfig = {
  root: path.resolve('../contracts'),
  
  flatten: {
    writeLocation: path.resolve('../flattened')
  }
};

module.exports = defaultConfig;

