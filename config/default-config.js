const path = require('path');

const defaultConfig = {
  root: path.resolve(__dirname, '../../contracts'),
  
  flatten: {
    writeLocation: path.resolve(__dirname, "../../flattened")
  }
};

module.exports = defaultConfig;

