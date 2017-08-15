export default class List {
  constructor(list) {
    console.log(list);
    this.cards = list
  }

  reset(list) {
    this.cards.length = 0;
    list.forEach(card => {
        this.cards.push(card)
      })
  }
}
