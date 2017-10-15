import Vue from 'vue'
import HTTP from '../http';

let {initBoard, addList} = HTTP;

export default {
  namespaced: true,
  state: {
    boards: {}
  },
  getters: {
    boards(state) {
      return state.boards
    },
    get(state) {
      return (id) => {
        if (!state.boards[id]) {
          return {loading: true}
        }
        return state.boards[id]
      }
    }
  },
  actions: {
    init(context, id) {
      return initBoard(id)
        .then(([boardResponse, listsResponse, cardsResponse, membersResponse, labelsResponse]) => {

            context.commit('addBoard', boardResponse.data);
            context.commit('cards/addCards', cardsResponse.data, {root: true});
            context.commit('lists/addLists', listsResponse.data, {root: true});
            context.commit('members/addMembers', membersResponse.data, {root: true});
            context.commit('labels/addLabels', labelsResponse.data, {root: true});

          }).catch((e) => {
            context.commit('addBoard', {
              id,
              status: e.response.status,
              msg: e.response.data
            });

          })
    },
    get(context, id) {
      if (id && !context.getters.boards[id]) {
        console.log('init board', id)
        context.commit('addBoard', {id, loading: true});
        return initBoard(id)
          .then(([boardResponse, listsResponse, cardsResponse, membersResponse, labelsResponse]) => {

            context.commit('addBoard', boardResponse.data);
            context.commit('cards/addCards', cardsResponse.data, {root: true});
            context.commit('lists/addLists', listsResponse.data, {root: true});
            context.commit('members/addMembers', membersResponse.data, {root: true});
            context.commit('labels/addLabels', labelsResponse.data, {root: true});

          }).catch((e) => {
            context.commit('addBoard', {
              id,
              status: e.response.status,
              msg: e.response.data
            });

          })
      } else {
        console.log('id', id, 'undefined or fetching of board already triggered')
      }
    }
  },
  mutations: {
    addBoard(state, board) {
      let newBoard = {
        [board.id]: board,
        [board.shortLink]: board
      };
      state.boards = Object.assign({}, state.boards, newBoard)
    }
  }
}
