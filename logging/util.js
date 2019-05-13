
const inquirer = require('inquirer');

/**
 * Logging utility class, primarily for tasks that fall outside the scope of Logger, especially in receiving and interacting with user input.
 */
class LogUtil {


  /**
   * A convenient function to use with any functions that may not always necessarily receive their arguments (e.g. bash shell calling a node script through stages, if things break and the next function dependent on the previous one has an undefined variable, simply prompt the user for it and keep running).
   *
   * If the variable has not been given a value (*more strictly, if falsy*), let the user know, request a new value, and continue, unless told to otherwise. 
   * 
   * 
   */
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
