var trelloConf = require('../trixi.conf.js');

module.exports = {
  NODE_ENV: '"production"',
  TRIXI_TRELLO_API_KEY: JSON.stringify(trelloConf.trelloApiKey),
  TRIXI_TRELLO_BOARD_ID: JSON.stringify(trelloConf.trelloBoardId),
  VERSION: JSON.stringify(require('../package.json').version)
}
