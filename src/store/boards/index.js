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

let fetch = (id, apiKey, oauthToken) => {
  let boardUrl = [BASE_URL, 'boards', id].join('/');
  let listsUrl = [BASE_URL, 'boards', id, 'lists'].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {});
  return Promise.all([
    Vue.http.get(boardUrl, {params}),
    Vue.http.get(listsUrl, {params})
  ])
    .then(([boardResponse, listsResponse]) => {
      console.log('fetch board', boardResponse.status, listsResponse.status);
      return new Board(id, boardResponse.body, listsResponse.body);
    }, ([boardResponse, listsResponse]) => {
      let m = new Board(id, boardResponse.body, listsResponse.body);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get board', id);
  if (id && !context.getters.boards[id]) {
    return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
      .then((board) => {
        context.commit('addBoard', board);
        if (board.board.idOrganization) {
          context.dispatch('organizations/get', board.board.idOrganization, {root: true});
        }
      })
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.boards[id])
    })
  }
};

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
          if (isOneOfMyBoards) {
            currentBoard.isEditable = true
          }
        }
        return currentBoard
      } else {
        console.log('no current board');
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
        .then((board) => {
          console.log('set current board to', id);
          context.commit('current', id);
        })
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
