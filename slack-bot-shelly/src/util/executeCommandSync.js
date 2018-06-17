const execSync = require('child_process').execSync;

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    try {
      resolve(execSync(command));
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = executeCommand;
