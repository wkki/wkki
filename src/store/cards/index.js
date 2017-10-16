import http from '../http';


export default {
  namespaced: true,
  state: {
    cards: {},
    cardActions: {}
  },
  getters: {
    cards(state) {
      return state.cards
    },
    get(state) {
      return (id) => {
        if (!state.cards[id]) {
          return {loading: true}
        }
        return state.cards[id]
      }
    },
    getActions(state) {
      return (id) => {
        if (!state.cardActions[id]) {
          return {loading: true}
        }
        return state.cardActions[id]
      }
    },
  },
  actions: {
    fetch(context, id) {
      http.fetchCard(id).then((cardResponse) => {
        context.commit('addCard', cardResponse.data)
      })
    },
    get(context, id) {
      console.log('get card', id);
      if (id && !context.getters.cards[id]) {
        context.commit('addCard', {id, loading: true});
        return http.fetchCard(id)
          .then((card) => {
            console.log('got card', card)
            context.commit('addCard', card.data);
            console.log('dispatching boards/get', card.data.idBoard)
            context.dispatch('boards/get', card.data.idBoard, {root: true})
          })
      }
    },
    fetchActions(context, id) {
      http.fetchCardActions(id)
        .then((response) => {
          context.commit('addCardActions', {id, data: response.data})
        })
    },
    getActions(context, id) {
      if (id && !context.getters.getActions[id]) {
        context.commit('addCardActions', {id, loading: true});
        http.fetchCardActions(id)
          .then((response) => {
            console.log(response)
            context.commit('addCardActions',  {id, data: response.data})
          })
      }
    },
    commit(context, card) {
      http.updateCard(card)
        .then(() => {
          context.commit('addCard', card);
        })
    },
    createCard(context, {name, listId}) {
      http.addCard(name, listId)
        .then((resp) => {
          context.dispatch('fetch', resp.data.id)
        })
    }
  },
  mutations: {
    addCard(state, card) {
      state.cards = Object.assign({}, state.cards, {[card.id]: card})
    },
    addCards(state, cards) {
      cards.forEach(card => {
        state.cards = Object.assign({}, state.cards, {[card.id]: card})
      })
    },
    addCardActions(state, cardActions) {
      state.cardActions = Object.assign({}, state.cardActions, {[cardActions.id]: cardActions})
    }
  }
}
