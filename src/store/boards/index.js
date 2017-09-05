import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Board {
  constructor(id, board, lists, members) {
    this.id = id;
    this.board = board;
    this.lists = lists;
    this.members = members
  }
}

let fetch = (id, apiKey, oauthToken) => {
  let boardUrl = [BASE_URL, 'boards', id].join('/');
  let listsUrl = [BASE_URL, 'boards', id, 'lists'].join('/');
  let membersUrl = [BASE_URL, 'boards', id, 'members'].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {});
  let memberParams = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {
      fields: 'all'
    });
  return Promise.all([
    Vue.http.get(boardUrl, {params}),
    Vue.http.get(listsUrl, {params}),
    Vue.http.get(membersUrl, {params: memberParams})
  ])
    .then(([boardResponse, listsResponse, membersResponse]) => {
      console.log('fetch board', boardResponse.status, listsResponse.status, membersResponse);
      return new Board(id, boardResponse.body, listsResponse.body, membersResponse.body);
    }, ([boardResponse, listsResponse, membersResponse]) => {
    console.log('fetch board', boardResponse.status, listsResponse.status, membersResponse);
      let m = new Board(id, boardResponse.body, listsResponse.body, membersResponse.body);
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
          board.lists.forEach((listId) => {
            context.dispatch('lists/get', listId, {root: true});
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
      return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
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
    addBoard(state, board) {
      state.boards = Object.assign({}, state.boards, {[board.id]: board})
    },
    current(state, id) {
      state.current = id
    }
  }

}
