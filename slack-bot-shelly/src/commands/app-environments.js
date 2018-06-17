const config = require('../config');
const log = require('../util/log');
const errorExit = require('../util/errorExit');

module.exports = appName => {
  const app = config.apps.find(app => app.name === appName);

  if (app == null) {
    log(`App ${appName} not found.`);
    errorExit();
    return;
  }

  const environments = app.environments.map(env => `- ${env.name}`).join('\n');
  log(`Available environments:\n${environments}`);
};
