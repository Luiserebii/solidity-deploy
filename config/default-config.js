const path = require('path');
const defaultConfig = {
  root: path.resolve('../contracts'),
  
  flatten: {
    writeLocation: path.resolve('../flattened')
  }

  deployment: {
    confirmations: 2
  }
};

module.exports = defaultConfig;

