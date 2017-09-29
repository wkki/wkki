import Vue from 'vue'
import HTTP from '../http';
let {http, } = HTTP;

class Board {
  constructor(id, board, lists) {
    this.id = id;
    this.board = board;
    this.lists = lists;
    this.isInitialized = false;
  }
}

let fetch = (id) => {
  let boardUrl = ['boards', id].join('/');
  let listsUrl = ['boards', id, 'lists'].join('/');

  return Promise.all([
    http.get(boardUrl),
    http.get(listsUrl)
  ])
    .then(([boardResponse, listsResponse]) => {
      console.log('fetch board', boardResponse, listsResponse);
      return new Board(id, boardResponse.data, listsResponse.data);
    }, ([boardResponse, listsResponse]) => {
      let m = new Board(id, boardResponse.data, listsResponse.data);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get board', id);
  if (id && !context.getters.boards[id]) {
    return fetch(id)
      .then((board) => {
        context.commit('addBoard', board);
        if (board.board.idOrganization) {
          context.dispatch('organizations/get', board.board.idOrganization, {root: true});
          board.lists.forEach((list) => {
            context.dispatch('lists/get', list.idList, {root: true});
          })
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
    boards(state) {
      return state.boards
    },
    current(state, getters, rootState, rootGetters) {
      if (state.current && state.boards[state.current]) {
        return state.boards[state.current]
      } else {
        console.log('no current board');
        return false
      }
    },
    isEditable(state, getters, rootState, rootGetters) {
      return (id) => {
        if (state.current && state.boards[state.current]) {
          if (rootGetters['members/myBoards']) {
            let isOneOfMyBoards = rootGetters['members/myBoards'].find((board) => (board.id === id));
            console.log('isOneOfMyBoards', !!isOneOfMyBoards, id)
            return !!isOneOfMyBoards;
          }
        }
      }
    }
  },
  actions: {
    fetch(context, id) {
      return fetch(id)
        .then((board) => {
          context.commit('addBoard', board);
        })
    },
    get(context, id) {
      get(context, id)
    },
    setCurrent(context, id) {
      get(context, id)
        .then((board) => {
          console.log('set current board to', id);
          context.commit('current', id);
          if (context.rootGetters.oauthToken && !context.rootGetters['members/me']) {
            context.dispatch('members/get', 'me', {root: true})
          }
        })
    },
    addList(context, {name, boardId}) {
      let listUrl = ['lists'].join('/');
      let params = {
        name: name,
        idBoard: boardId,
      };

      http.post(listUrl, params)
        .then(() => {
          context.dispatch('fetch', boardId)
        })
    }
  },
  mutations: {
    addBoard(state, board) {
      state.boards = Object.assign({}, state.boards, {[board.id]: board})
    },
    current(state, id) {
      state.current = id
    }
  }

}
