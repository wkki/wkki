import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Card {
  constructor(id, card) {
    this.id = id;
    this.card = card;
    this.edit = false;
  }
}

export default {
  namespaced: true,
  state: {
    cards: {},
    current: false
  },
  getters: {
    cards(state){
      return state.cards
    },
    current(state){
      if (state.current && state.cards[state.current]) {
        return state.cards[state.current]
      } else {
        return false
      }
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
        .then((card) => {
          context.commit('addCard', card);
          return card
        })
        // init rest in case of getting to card from url
        .then((card) => {

          console.log(card.card);
          let boardId = card.card.idBoard;
          let listId = card.card.idList;

          context.dispatch('boards/setCurrent', boardId, {root: true});
          context.dispatch('lists/setCurrent', listId, {root: true});
        })
    },
    get(context, id){
      if (id && !context.getters.cards[id]) {
        context.dispatch('fetch', id)
      } else {
        console.log('using card', id, 'from store')
      }
    },
    setCurrent(context, id){
      context.dispatch('get', id);
      context.commit('current', id);
    },
    alter(context, card){
      context.commit('addCard', card);
    },
    commit(context, card){
      let urlCard = [BASE_URL, 'cards', card.card.id].join('/');
      let urlComment = [BASE_URL, 'cards', card.card.id, 'actions', 'comments'].join('/');

      let paramsCard = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {desc: card.card.desc});
      let paramsComment = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {text: card.card.desc});

      return Promise.all([
        Vue.http.put(urlCard, paramsCard),
        Vue.http.post(urlComment, paramsComment)
      ])
    },
  },
  mutations: {
    addCard(state, card){
      state.cards = Object.assign({}, state.cards, {[card.id]: card})
    },
    current(state, id){
      state.current = id
    }
  }

}
