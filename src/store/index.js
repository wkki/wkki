import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import helpers from './apiHelpers'


const store = new Vuex.Store({
  state: {
    boardId: "598bc730bc7759647ab96c09",
    boardName: "...",
    lists: {},
    activeCard: {},
    activeList: []
  },
  getters: {
    boardId(state){
      return state.boardId
    },
    activeCard(state){
      return state.activeCard
    },
    boardName(state){
      return state.boardName
    },
    lists(state){
      return state.lists
    },
    activeList(state){
      return state.activeList
    }
  },
  actions: {
    init(context){
      context.dispatch('fetchBoardName');
      helpers.init(context.getters.boardId)
        .then(lists => {
          console.log(lists);
          context.commit('setLists', lists)
        })
    },
    fetchBoardName(context){
      helpers.fetchBoardName(context.getters.boardId)
        .then(boardName => {
          context.commit('setBoardName', boardName)
        })
    },
    fetchCard(context, cardId) {
      context.commit('setActiveCard', {});
      helpers.fetchCard(cardId)
        .then((card) => {
          context.commit('setActiveCard', card)
        })
    },
    fetchList(context, listId){
      context.commit('setActiveList', []);
      helpers.fetchList(listId)
        .then((list) => {
          context.commit('setActiveList', list)
        })
    }
  },
  mutations: {
    setBoardName(state, name){
      state.boardName = name;
    },
    setActiveCard(state, card){
      state.activeCard = Object.assign({}, state.activeCard, card)
    },
    setLists(state, lists){
      state.lists = Object.assign({}, state.lists, lists)
    },
    setActiveList(state, list){
      state.activeList.length = 0;
      list.forEach(card => {
        state.activeList.push(card)
      })
    }
  },
  modules: {}
});

export default store
