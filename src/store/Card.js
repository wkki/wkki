export default class Card {
  constructor(card) {
    this.reset(card)
  }

  reset(card) {
    this.desc = card.desc;
    this.shortUrl = card.shortUrl;
    this.url = card.url;
    this.id = card.id;
    this.idBoard = card.idBoard;
    this.idList = card.idList;
    this.name = card.name;
  }
}
