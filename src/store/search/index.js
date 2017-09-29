import HTTP from '../http';

let {http,} = HTTP;


let search = (query, boardId) => {
  let boardUrl = ['search',].join('/');
  query += ' is:open';
  let params = {
    query: query,
    idBoards: boardId
  }
  return http.get(boardUrl, {params})
    .then((searchResponse) => {
      console.log('search res', searchResponse.status);
      return searchResponse.data
    }, (searchResponse) => {
      console.log('search res', searchResponse.status);
      return searchResponse.data
    })
};

export default {
  namespaced: true,
  state: {
    result: {}
  },
  getters: {
    result(state) {
      return state.result
    }
  },
  actions: {
    search(context, {query, boardId}) {
      return search(query, boardId)
        .then((result) => {
          context.commit('setResult', result);
          result.cards.forEach((card) => {
            context.dispatch('cards/get', card.id, {root: true})
          })
        })
    }
  },
  mutations: {
    setResult(state, result) {
      state.result = Object.assign({}, result)
    }
  }
}
