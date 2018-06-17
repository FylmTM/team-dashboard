const config = require('../config');
const log = require('../util/log');

module.exports = () => {
  let apps = config.apps.map(app => `- ${app.name}`).join('\n');
  log(`Configured apps:\n${apps}`);
};
