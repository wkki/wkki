export default class Board {
  constructor(board) {
    console.log(board);
    this.reset(board)
  }

  reset(board) {
    console.log(board);
    this.name = board.name;
    this.shortUrl = board.shortUrl;
    this.url = board.url;
    if (board.prefs) {
      this.permissionLevel = board.prefs.permissionLevel
    }
  }
}


