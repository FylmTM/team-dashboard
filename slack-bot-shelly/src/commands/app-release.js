const config = require('../config');
const log = require('../util/log');
const errorExit = require('../util/errorExit');
const executeCommandSync = require('../util/executeCommandSync');

const allEnvironments = '--all--';

module.exports = (appName, options) => {
  const askedEnv = options.env || allEnvironments;

  const app = config.apps.find(app => app.name === appName);
  if (app == null) {
    log(`App ${appName} not found.`);
    errorExit();
    return;
  }

  let environments = app.environments;
  if (askedEnv !== allEnvironments) {
    const foundEnv = environments.find(env => env.name === askedEnv);
    if (foundEnv == null) {
      log(`Environment ${askedEnv} is not configured for ${appName}.`);
      errorExit();
      return;
    }

    environments = environments.filter(env => env.name === askedEnv);
  }

  const releaseFilter = environments
    .map(env => env.helmRelease)
    .map(helmRelease => `(^${helmRelease}$)`)
    .join('|');

  executeCommandSync(`helm list --all "${releaseFilter}"`)
    .then(stdout => log(stdout.toString()))
    .catch(error => {
      log(error.stdout.toString() + error.stderr.toString());
      errorExit();
    });
};
