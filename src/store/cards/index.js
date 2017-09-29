import HTTP from '../http';
let {http, } = HTTP;

class Card {
  constructor(id, card) {
    this.id = id;
    this.card = card;
    this.edit = false;
  }
}

let fetch = (id) => {
  let url = ['cards', id].join('/');
  let params =
    {
      attachments: true
    };

  return http.get(url, {params})
    .then(response => {
      console.log(response.status)
      return new Card(id, response.data);
    }, response => {
      console.log(response.status)
      let m = new Card(id, response.data);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get card', id);
  if (id && !context.getters.cards[id]) {
    return fetch(id)
      .then((card) => {
        context.commit('addCard', card);
        console.log('fetching list with id ', card['card'].idList);
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
      return fetch(id)
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
      let urlCard = ['cards', card.card.id].join('/');
      let urlComment = ['cards', card.card.id, 'actions', 'comments'].join('/');

      let paramsCard = {desc: card.card.desc};
      let paramsComment = {text: card.card.desc};

      return Promise.all([
        http.put(urlCard, paramsCard),
        http.post(urlComment, paramsComment)
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
