const config = require('../config');
const log = require('../util/log');
const errorExit = require('../util/errorExit');
const executeCommandSync = require('../util/executeCommandSync');

module.exports = (appName, askedEnv) => {
  const app = config.apps.find(app => app.name === appName);
  if (app == null) {
    log(`App ${appName} not found.`);
    errorExit();
    return;
  }

  const foundEnv = app.environments.find(env => env.name === askedEnv);
  if (foundEnv == null) {
    log(`Environment ${askedEnv} is not configured for ${appName}.`);
    errorExit();
    return;
  }

  executeCommandSync(`helm status "${foundEnv.helmRelease}"`)
    .then(stdout => log(stdout.toString()))
    .catch(error => {
      log(error.stdout.toString() + error.stderr.toString());
      errorExit();
    });
};
