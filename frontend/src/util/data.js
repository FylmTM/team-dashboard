if (process.env.REACT_APP_MOCK === 'true') {
  module.exports = require('./dataMock'); // eslint-disable-line global-require
} else {
  module.exports = require('./dataReal'); // eslint-disable-line global-require
}
