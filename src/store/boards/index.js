import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Board {
  constructor(id, board, lists) {
    this.id = id;
    this.board = board;
    this.lists = lists;
    this.isEditable = false;
  }
}

export default {
  namespaced: true,
  state: {
    boards: {},
    current: false
  },
  getters: {
    boards(state){
      return state.boards
    },
    current(state, getters, rootState, rootGetters){
      if (state.current && state.boards[state.current]) {
        let currentBoard = state.boards[state.current];
        if (rootGetters['members/myBoards']) {
          let isOneOfMyBoards = rootGetters['members/myBoards'].find((board) => (board.id === currentBoard.id));
          if (isOneOfMyBoards){
            currentBoard.isEditable = true
          }
        }
        return currentBoard
      } else {
        return false
      }
    }
  },
  actions: {
    fetch(context, boardId){
      console.log('fetching board', boardId);

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
        .then((board) => {
          context.commit('addBoard', board);
          return board;
        })
        .then((board) => {

        });
    },
    get(context, id){
      if (id && !context.getters.boards[id]) {
        context.dispatch('fetch', id)
      } else {
        console.log('using board', id, 'from store')
      }
    },
    setCurrent(context, id){
      context.dispatch('get', id);
      context.commit('current', id);
    },
    addList(context, {name, boardId}){
      let listUrl = [BASE_URL, 'lists'].join('/');
      let params = Object.assign({
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {
          name: name,
          idBoard: boardId,
        });

      Vue.http.post(listUrl, params)
        .then(() => {
          context.dispatch('fetch', boardId)
        })
    }
  },
  mutations: {
    addBoard(state, board){
      state.boards = Object.assign({}, state.boards, {[board.id]: board})
    },
    current(state, id){
      state.current = id
    }
  }

}
