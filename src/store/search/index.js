import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';


let search = (query, boardId, apiKey, oauthToken) => {
  let boardUrl = [BASE_URL, 'search',].join('/');
  query += ' is:open';
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {
      query: query,
      idBoards: boardId
    });
  return Vue.http.get(boardUrl, {params})
    .then((searchResponse) => {
      console.log('search res', searchResponse.status);
      return searchResponse.body
    }, (searchResponse) => {
      console.log('search res', searchResponse.status);
      return searchResponse.body
    })
};

export default {
  namespaced: true,
  state: {
    result: {}
  },
  getters: {
    result(state){
      return state.result
    }
  },
  actions: {
    search(context, {query, boardId}) {
      return search(query, boardId, context.rootGetters.apiKey, context.rootGetters.oauthToken)
        .then((result) => {
          context.commit('setResult', result);
          result.cards.forEach((card) =>{
            context.dispatch('cards/get', card.id, {root: true})
          })
        })
    }
  },
  mutations: {
    setResult(state, result){
      state.result = Object.assign({}, result)
    }
  }
}
