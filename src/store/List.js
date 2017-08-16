export default class List {
  constructor(list) {
    this.cards = list
  }

  reset(list) {
    console.log(list)
    this.cards.length = 0;
    list.forEach(card => {
        this.cards.push(card)
      })
  }
}
