import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import helpers from '../trelloApi/apiHelpers'
import List from './List'
import Card from './Card'
import Board from './Board'

let localStorePrefix = window.location.host;
let localStore = {
  get(key){
    console.log('prefix', localStorePrefix)
    return window.localStorage.getItem(localStorePrefix + key)
  },
  set(key, value){
    console.log('prefix', localStorePrefix)
    window.localStorage.setItem(localStorePrefix + key, value)
  }
};


const store = new Vuex.Store({
  state: {
    boardId: trello_board_id,
    apiKey: trello_api_key,

    board: new Board({}),
    lists: {},
    activeCard: new Card({}),
    mainCard: new Card({}),
    activeList: new List([]),
    searchResults: {},
    oauthToken: localStore.get('oauthToken')
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
    },
    mainCard(state){
      return state.mainCard
    },
    isLoggedIn(state){
      return !!state.oauthToken
    },
    oauthToken(state){
      return state.oauthToken
    }

  },
  actions: {
    init(context){
      // todo: this is super ugly.
      context.dispatch('fetchBoard');
      return helpers.init(context.getters.boardId)
        .then(lists => {
          context.commit('setLists', lists);

          for (var listId in lists) {
            // if we have index list, search for "main" card and set as mainCard in store
            if (lists[listId].name === "index") {
              console.log('found index')

              return helpers.fetchList(listId)
                .then(list => {
                  let findMain = (card) => {
                    return card.name === 'main'
                  };

                  let mainCard = list.find(findMain);
                  if (mainCard) {
                    return helpers.fetchCard(mainCard.id)
                      .then(card => {
                        context.commit('setMainCard', card)
                        return true
                      })
                  }
                });
            }
          }
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
      helpers.search(query, context.getters.boardId, context.getters.oauthToken, context.getters.apiKey)
        .then(res => {
          context.commit('setSearchResults', res)
        })
    },
    logIn(context, oauthToken){
      localStore.set('oauthToken', oauthToken);
      context.commit('logIn', oauthToken)
    },
    logOut(context){
      localStore.set('oauthToken', undefined);
      context.commit('logIn', undefined)
    },
    addCategory(context, name){
      helpers.addCategory(name, context.getters.boardId, context.getters.oauthToken, context.getters.apiKey)
        .then(() => {
          context.dispatch('init')
        })
    },
    addCard(context, {cardName, listId}){
      helpers.addCard(cardName, listId, context.getters.oauthToken, context.getters.apiKey)
        .then(() => {
          context.dispatch('fetchList', listId)
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
    },
    setMainCard(state, card){
      state.mainCard.reset(card)
    },
    logIn(state, oauthToken){
      state.oauthToken = oauthToken
    }
  },
  modules: {}
});

export default store
