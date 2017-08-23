export default class List {
  constructor(list) {
    this.cards = list
  }

  reset(list) {
    console.log(list)

    for (let i = this.cards.length; i > 0; i--) {
      this.cards.pop();
    }

    list.forEach(card => {
      this.cards.push(card)
    })
  }
}
