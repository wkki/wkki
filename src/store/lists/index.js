import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class List {
  constructor(id, list, cards) {
    this.id = id;
    this.list = list;
    this.cards = cards;
  }
}

let fetch = (id, apiKey, oauthToken) => {
  console.log('fetching list with ', id, apiKey, oauthToken)
  let listUrl = [BASE_URL, 'lists', id].join('/');
  let cardsUrl = [BASE_URL, 'lists', id, 'cards'].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {});
  return Promise.all([
    Vue.http.get(cardsUrl, {params}),
    Vue.http.get(listUrl, {params})
  ])
    .then(([cardsResponse, listResponse]) => {
      console.log('fetch list', cardsResponse.status, listResponse.status);
      return new List(id, listResponse.body, cardsResponse.body);
    }, ([cardsResponse, listResponse]) => {
      let m = new List(id, listResponse.body, cardsResponse.body);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get list', id);
  if (id && !context.getters.lists[id]) {
    return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
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
    lists(state){
      return state.lists
    },
    current(state){
      if (state.current && state.lists[state.current]) {
        return state.lists[state.current]
      } else {
        console.log('no current list');
        return false
      }
    }
  },
  actions: {
    get(context, id){
      get(context, id)
    },
    setCurrent(context, id){
      get(context, id)
        .then((list) => {
          console.log('set current list to', id);
          context.commit('current', id);
          let boardId = list.list.idBoard;
          context.dispatch('boards/setCurrent', boardId, {root: true});
        })
    },
    addCard(context, {name, listId}){
      let cardUrl = [BASE_URL, 'cards'].join('/');
      let params = Object.assign({
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {
          name: name,
          idList: listId,
        });

      Vue.http.post(cardUrl, params)
        .then(() => {
          context.dispatch('fetch', listId)
        })
    }
  },
  mutations: {
    addList(state, list){
      state.lists = Object.assign({}, state.lists, {[list.id]: list})
    },
    current(state, id){
      state.current = id
    }
  }

}
