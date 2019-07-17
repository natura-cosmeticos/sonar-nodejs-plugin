const ora = require('ora');

module.exports = async function printSteps(message, command, silent = false, indent = 2) {
  if (silent) {
    const commandExecutionSilent = await command();

    return commandExecutionSilent;
  }

  const spinner = ora(message).start();

  spinner.indent = indent;

  const commandExecution = await command();

  spinner.succeed();

  return commandExecution;
};
