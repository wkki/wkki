import Vue from 'vue'
import http from '../http';


export default {
  namespaced: true,
  state: {
    cards: {}
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
    },
    archiveCard(context, card) {
      console.log("store: archive card", card)
      http.archiveCard(card)
        .then(() => {
          context.commit('deleteCardFromState', card)
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
    deleteCardFromState(state, card){
      Vue.delete(state.cards, card.id)
    }
  }
}
