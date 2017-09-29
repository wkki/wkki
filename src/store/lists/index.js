import HTTP from '../http';
let {http, } = HTTP;

class List {
  constructor(id, list, cards) {
    this.id = id;
    this.list = list;
    this.cards = cards;
  }
}

let fetch = (id) => {
  console.log('fetching list with ', id);
  let listUrl = ['lists', id].join('/');
  let cardsUrl = ['lists', id, 'cards'].join('/');
  return Promise.all([
    http.get(cardsUrl),
    http.get(listUrl)
  ])
    .then(([cardsResponse, listResponse]) => {
      console.log('fetch list', cardsResponse.status, listResponse.status);
      return new List(id, listResponse.data, cardsResponse.data);
    }, ([cardsResponse, listResponse]) => {
      let m = new List(id, listResponse.data, cardsResponse.data);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get list', id);
  if (id && !context.getters.lists[id]) {
    return fetch(id)
      .then((list) => {
        context.commit('addList', list);
        return list
      })
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.lists[id])
    })
  }
};

export default {
  namespaced: true,
  state: {
    lists: {},
    current: false
  },
  getters: {
    lists(state) {
      return state.lists
    },
    current(state) {
      if (state.current && state.lists[state.current]) {
        return state.lists[state.current]
      } else {
        console.log('no current list');
        return false
      }
    }
  },
  actions: {
    fetch(context, id) {
      return fetch(id)
        .then((list) => {
          context.commit('addList', list);
          return list
        })
    },
    get(context, id) {
      get(context, id)
    },
    setCurrent(context, id) {
      get(context, id)
        .then((list) => {
          console.log('set current list to', id);
          context.commit('current', id);
          let boardId = list.list.idBoard;
          context.dispatch('boards/setCurrent', boardId, {root: true});
        })
    },
    addCard(context, {name, listId}) {
      let cardUrl = ['cards'].join('/');
      let params =
        {
          name: name,
          idList: listId,
        };
      http.post(cardUrl, params)
        .then(() => {
          context.dispatch('fetch', listId)
        })
    }
  },
  mutations: {
    addList(state, list) {
      state.lists = Object.assign({}, state.lists, {[list.id]: list})
    },
    current(state, id) {
      state.current = id
    }
  }

}
