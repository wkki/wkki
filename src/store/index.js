import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import helpers from '../trelloApi/apiHelpers'
import List from './List'
import Card from './Card'
import Board from './Board'

const store = new Vuex.Store({
  state: {
    boardId: "598bc730bc7759647ab96c09",
    apiKey: '256fb33e0fa1570e3528e737f00996db',
    board: new Board({}),
    lists: {},
    activeCard: new Card({}),
    activeList: new List([]),
    searchResults: {}
  },
  getters: {
    boardId(state){
      return state.boardId
    },
    activeCard(state){
      return state.activeCard
    },
    boardName(state){
      return state.board.name
    },
    lists(state){
      return state.lists
    },
    activeList(state){
      return state.activeList
    },
    searchResults(state){
      return state.searchResults
    },
    apiKey(state){
      return state.apiKey
    }

  },
  actions: {
    init(context){
      context.dispatch('fetchBoard');
      helpers.init(context.getters.boardId)
        .then(lists => {
          console.log(lists);
          context.commit('setLists', lists)
        })
    },
    fetchBoard(context){
      helpers.fetchBoard(context.getters.boardId)
        .then(board => {
          context.commit('setBoard', board)
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
    },
    search(context, query) {
      context.commit('setSearchResults', {});
      helpers.search(query)
        .then(res => {
          context.commit('setSearchResults', res)
        })
    }
  },
  mutations: {
    setBoard(state, board){
      state.board.reset(board);
    },
    setActiveCard(state, card){
      state.activeCard.reset(card)
    },
    setLists(state, lists){
      state.lists = Object.assign({}, state.lists, lists)
    },
    setActiveList(state, list){
      state.activeList.reset(list)
    },
    setSearchResults(state, results){
      state.searchResults = Object.assign({}, state.searchResults, results)
    }
  },
  modules: {}
});

export default store
