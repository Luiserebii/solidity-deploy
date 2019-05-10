const path = require('path');
const defaultConfig = {
  root: path.resolve('../contracts'),
  
  flatten: {
    writeLocation: path.resolve('../flattened')
  }
};

module.exports = defaultConfig;

