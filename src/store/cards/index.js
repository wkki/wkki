import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Card{
  constructor(cardId, card){
    this.id = cardId;
    this.card = card;
  }
}

export default {
  namespaced: true,
  state: {
    cards: {}
  },
  getters: {
    cards(state){
      return state.cards
    }
  },
  actions: {
    fetch(context, cardId){
      console.log('fetching card', cardId)
      let url = [BASE_URL, 'cards', cardId].join('/');
      let params = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {});

      return Vue.http.get(url, {params})
        .then(response => {
          console.log(response.status)
          return new Card(cardId, response.body);
        }, response => {
          console.log(response.status)
          let m = new Card(cardId, response.body);
          m.error = true;
          return m;
        })
        .then((card) => context.commit('addCard', card));
    },
  },
  mutations: {
    addCard(state, card){
      state.cards = Object.assign({}, state.cards, {[card.id]: card})
    }
  }

}
