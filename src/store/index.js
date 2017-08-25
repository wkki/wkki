import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import members from './members'
import boards from './boards'
import lists from './lists'
import cards from './cards'

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
    apiKey: process.env.WKKI_TRELLO_API_KEY,
    oauthToken: localStore.get('oauthToken'),
    showList: false,
    currentBoard: false,
    currentCard: false
  },
  getters: {
    apiKey(state){
      return state.apiKey
    },
    oauthToken(state){
      return state.oauthToken
    },
    showList(state){
      return state.showList
    },
    isLoggedIn(state){
      return !!state.oauthToken
    }
  },
  actions: {
    logIn(context, oauthToken){
      localStore.set('oauthToken', oauthToken);
      context.commit('logIn', oauthToken);
    },
    logOut(context){
      localStore.rm('oauthToken');
      context.commit('logIn', undefined);
    },
    setShowList(context, flipTo){
      context.commit('showList', flipTo)
    }
  },
  mutations: {
    logIn(state, oauthToken){
      state.oauthToken = oauthToken
    },
    showList(state, flipTo){
      state.showList = flipTo
    }
  },
  modules: {
    members,
    boards,
    lists,
    cards
  }
});

export default store
