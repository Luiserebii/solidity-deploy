
const inquirer = require('inquirer');

class LogUtil {


  async promptExistence(name, x) {
    console.log("Prompting existence...")
    if(!x) {
      let answers = await inquirer.prompt([{ type: 'input', name: 'continue', message: 'Value ' + name + ' was not passed a value or has not been set. Continue?' }])
      if(answers['continue'] == "y" || answers['continue'] == "Y" || answers['continue'].toLowerCase() == "yes") {
        answers = await inquirer.prompt([{ type: 'input', name: 'value', message: 'Enter the value to be used: ' }]);
        console.log("Using value: " + answers['value'] + "...");
        return answers['value'];
      } else {
        process.exit(0);
      }
    }
  }


}

module.exports = LogUtil;
