import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Card {
  constructor(id, card) {
    this.id = id;
    this.card = card;
    this.edit = false;
  }
}

let fetch = (id, apiKey, oauthToken) => {
  let url = [BASE_URL, 'cards', id].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {
      attachments: true
    });

  return Vue.http.get(url, {params})
    .then(response => {
      console.log(response.status)
      return new Card(id, response.body);
    }, response => {
      console.log(response.status)
      let m = new Card(id, response.body);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get card', id);
  if (id && !context.getters.cards[id]) {
    return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
      .then((card) => {
        context.commit('addCard', card);
        console.log('fetching list with id ', card['card'].idList)
        context.dispatch('lists/get', card['card'].idList, {root: true});
        return card
      })
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.cards[id])
    })
  }
};

export default {
  namespaced: true,
  state: {
    cards: {},
    current: false
  },
  getters: {
    cards(state) {
      return state.cards
    },
    current(state) {
      if (state.current && state.cards[state.current]) {
        return state.cards[state.current]
      } else {
        console.log('no current card');
        return false
      }
    }
  },
  actions: {
    fetch(context, id) {
      return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
        .then((card) => {
          context.commit('addCard', card);
        })
    },
    get(context, id) {
      get(context, id)
    },
    setCurrent(context, id) {
      get(context, id)
        .then((card) => {
          if (id) {
            let listId = card.card.idList;
            context.dispatch('lists/setCurrent', listId, {root: true});
          }
          context.commit('current', id);
          console.log('set current card to', id);
        })
    },
    alter(context, card) {
      context.commit('addCard', card);
    },
    commit(context, card) {
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
    addCard(state, card) {
      state.cards = Object.assign({}, state.cards, {[card.id]: card})
    },
    current(state, id) {
      state.current = id
    }
  }

}
