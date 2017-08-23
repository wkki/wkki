import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class List {
  constructor(listId, list, cards) {
    this.id = listId;
    this.list = list;
    this.cards = cards;
  }
}

export default {
  namespaced: true,
  state: {
    lists: {}
  },
  getters: {
    lists(state){
      return state.lists
    }
  },
  actions: {
    fetch(context, listId){
      console.log('fetching list', listId);

      let listUrl = [BASE_URL, 'lists', listId].join('/');
      let cardsUrl = [BASE_URL, 'lists', listId, 'cards'].join('/');
      let params = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {});

      return Promise.all([
        Vue.http.get(cardsUrl, {params}),
        Vue.http.get(listUrl, {params})
      ])
        .then(([cardsResponse, listResponse]) => {
          console.log('fetch list', cardsResponse.status, listResponse.status)
          return new List(listId, listResponse.body, cardsResponse.body);
        }, ([cardsResponse, listResponse]) => {
          console.log('fetch list', cardsResponse.status, listResponse.status)
          let m = new List(listId, listResponse.body, cardsResponse.body);
          m.error = true;
          return m;
        })
        .then((list) => context.commit('addList', list));
    },
  },
  mutations: {
    addList(state, list){
      state.lists = Object.assign({}, state.lists, {[list.id]: list})
    }
  }

}
