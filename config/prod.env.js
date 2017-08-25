var trelloConf = require('../wkki.conf.js');

module.exports = {
  NODE_ENV: '"production"',
  WKKI_TRELLO_API_KEY: JSON.stringify(trelloConf.trelloApiKey),
  VERSION: JSON.stringify(require('../package.json').version)
}
