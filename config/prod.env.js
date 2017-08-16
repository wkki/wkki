var trelloConf = require('../trixi.conf.js');

module.exports = {
  NODE_ENV: '"production"',
  TRIXI_TRELLO_API_KEY: trelloConf.trelloApiKey,
  TRIXI_TRELLO_BOARD_ID: trelloConf.trelloBoardId,
}
