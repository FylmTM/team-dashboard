const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCommand(command) {
  const { stdout } = await exec(command);
  return stdout;
}

module.exports = executeCommand;
