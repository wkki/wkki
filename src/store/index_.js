import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import router from '../router'

import helpers from '../trelloApi/apiHelpers'


let localStorePrefix = window.location.host;
let localStore = {
  get(key){
    console.log('prefix', localStorePrefix);
    return window.localStorage.getItem(localStorePrefix + key)
  },
  set(key, value){
    console.log('prefix', localStorePrefix);
    window.localStorage.setItem(localStorePrefix + key, value)
  },
  rm(key){
    window.localStorage.removeItem(localStorePrefix + key);
  }
};

const store = new Vuex.Store({
  state: {
    boardId: process.env.TRIXI_TRELLO_BOARD_ID,
    apiKey: process.env.TRIXI_TRELLO_API_KEY,

    oauthToken: localStore.get('oauthToken'),

  },

  actions: {
    init(context){
      // todo: this is super ugly.
      return context.dispatch('fetchBoard')
        .then(() => helpers.init(context.getters.boardId, context.getters.oauthToken, context.getters.apiKey))
        .then(lists => {
          context.commit('setLists', lists);

          for (var listId in lists) {
            // if we have index list, search for "main" card and set as mainCard in store
            if (lists[listId].name === "index") {
              console.log('found index')

              return helpers.fetchList(listId, context.getters.oauthToken, context.getters.apiKey)
                .then(list => {
                  let findMain = (card) => {
                    return card.name === 'main'
                  };

                  let mainCard = list.find(findMain);
                  if (mainCard) {
                    return helpers.fetchCard(mainCard.id, context.getters.oauthToken, context.getters.apiKey)
                      .then(card => {
                        context.commit('setMainCard', card)
                        return true
                      })
                  }
                });
            }
          }
        }).catch((e) => {
          console.log(e)
        })
    },
    fetchBoard(context){
      return helpers.fetchBoard(context.getters.boardId, context.getters.oauthToken, context.getters.apiKey)
        .then(board => {
          if (board) {
            context.commit('setBoard', board)
          } else {
            context.commit('boardIsPrivate', true)
          }
        })
    },
    fetchBoards(context, member){
      helpers.fetchBoards(member, context.getters.oauthToken, context.getters.apiKey)
        .then(res => {
          context.commit('setBoards', res)
        })
    },
    fetchCard(context, cardId) {
      context.commit('setActiveCard', {});
      helpers.fetchCard(cardId, context.getters.oauthToken, context.getters.apiKey)
        .then((card) => {
          context.commit('setActiveCard', card)
        })
    },
    fetchList(context, listId){
      context.commit('setActiveList', []);
      helpers.fetchList(listId, context.getters.oauthToken, context.getters.apiKey)
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
      context.commit('logIn', oauthToken);
      context.dispatch('init')
    },
    logOut(context){
      localStore.rm('oauthToken');
      context.commit('logIn', undefined)
      context.dispatch('init')
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
    },
    setActiveCardsDesc(context, text){
      let card = context.getters.activeCard;
      card.desc = text;
      context.commit('setActiveCard', card)
    },
    saveCard(context, card){
      helpers.saveCard(card, context.getters.oauthToken, context.getters.apiKey)
    }
  },
  mutations: {
    setBoards(state, boards){
      state.boards.length = 0;
      boards.forEach(board => {
        state.boards.push(board)
      })
    },
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
    },
    boardIsPrivate(state, isPrivate){
      state.boardIsPrivate = isPrivate
    }
  },
  modules: {}
});

export default store
