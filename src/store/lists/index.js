import http from '../http';

function filterByBoardId(list) {
  return list['idBoard'] = this
}

export default {
  namespaced: true,
  state: {
    lists: {},
  },
  getters: {
    lists(state) {
      return state.lists
    }
  },
  actions: {
    fetch(context, id) {
      return http.fetchList(id)
        .then((response) => {
          context.commit('addList', response.data);
        })
    },
    get(context, id) {
      if (id && !context.getters.lists[id]) {
        context.commit('addList', {id, loading: true});
        return http.fetchList(id)
          .then((list) => {
            context.commit('addList', list);
          })
      }
    },
    createList(context, {name, boardId}) {
      http.addList(name, boardId)
        .then((resp) => {
          context.dispatch('fetch', resp.data.id)
        })
    }
  },
  mutations: {
    addList(state, list) {
      state.lists = Object.assign({}, state.lists, {[list.id]: list})
    },
    addLists(state, lists) {
      lists.forEach(list => {
        state.lists = Object.assign({}, state.lists, {[list.id]: list})
      })
    }
  }
}
