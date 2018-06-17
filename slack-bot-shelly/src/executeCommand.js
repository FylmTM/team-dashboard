const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function executeCommand(text) {
  const { stdout } = await exec(`node src/program.js ${text}`);
  return stdout;
}

module.exports = executeCommand;
