import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Board {
  constructor(boardId, board, lists) {
    this.id = boardId;
    this.board = board;
    this.lists = lists;
  }
}

export default {
  namespaced: true,
  state: {
    boards: {}
  },
  getters: {
    boards(state){
      return state.boards
    }
  },
  actions: {
    fetch(context, boardId){
      console.log('fetching board', boardId)

      let boardUrl = [BASE_URL, 'boards', boardId].join('/');
      let listsUrl = [BASE_URL, 'boards', boardId, 'lists'].join('/');
      let params = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {});

      return Promise.all([
        Vue.http.get(listsUrl, {params}),
        Vue.http.get(boardUrl, {params})
      ])
        .then(([listResponse, boardResponse]) => {
          console.log('fetch board', listResponse.status, boardResponse.status);
          return new Board(boardId, boardResponse.body, listResponse.body);
        }, ([listResponse, boardResponse]) => {
          let m = new Board(boardId, boardResponse.body, listResponse.body);
          m.error = true;
          return m;
        })
        .then((board) => context.commit('addBoard', board));
    },
  },
  mutations: {
    addBoard(state, board){
      state.boards = Object.assign({}, state.boards, {[board.id]: board})
    }
  }

}
