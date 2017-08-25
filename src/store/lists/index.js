import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class List {
  constructor(id, list, cards) {
    this.id = id;
    this.list = list;
    this.cards = cards;
  }
}

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
        return false
      }
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
          console.log('fetch list', cardsResponse.status, listResponse.status);
          return new List(listId, listResponse.body, cardsResponse.body);
        }, ([cardsResponse, listResponse]) => {
          let m = new List(listId, listResponse.body, cardsResponse.body);
          m.error = true;
          return m;
        })
        .then((list) => context.commit('addList', list));
    },
    get(context, id){
      if (id && !context.getters.lists[id]) {
        context.dispatch('fetch', id)
      } else {
        console.log('using list', id, 'from store')
      }
    },
    setCurrent(context, id){
      context.dispatch('get', id)
      context.commit('current', id);
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
