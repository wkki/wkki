import Vue from 'vue'
import Vuex from 'vuex'

import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

import members from './members'
import boards from './boards'
import lists from './lists'
import cards from './cards'
import organizations from './organizations'
import search from './search'

let localStorePrefix = window.location.host;
let localStore = {
  get(key) {
    console.log('prefix', localStorePrefix);
    return window.localStorage.getItem(localStorePrefix + key)
  },
  set(key, value) {
    console.log('prefix', localStorePrefix);
    window.localStorage.setItem(localStorePrefix + key, value)
  },
  rm(key) {
    window.localStorage.removeItem(localStorePrefix + key);
  }
};

const store = new Vuex.Store({
  state: {
    apiKey: process.env.WKKI_TRELLO_API_KEY,
    oauthToken: localStore.get('oauthToken'),
    showList: false,
    showCard: false,
    showSearch: false,
    showBoardSettings: false
  },
  getters: {
    apiKey(state) {
      return state.apiKey
    },
    oauthToken(state) {
      return state.oauthToken
    },
    showList(state) {
      return state.showList
    },
    showCard(state) {
      return state.showCard
    },
    showSearch(state) {
      return state.showSearch
    },
    showBoardSettings(state) {
      return state.showBoardSettings
    },
    isLoggedIn(state) {
      return !!state.oauthToken
    }
  },
  actions: {
    logIn(context, oauthToken) {
      localStore.set('oauthToken', oauthToken);
      context.commit('logIn', oauthToken);
    },
    logOut(context) {
      localStore.rm('oauthToken');
      context.commit('logIn', undefined);
    },
    setShowList(context) {
      context.commit('showList', true);
      context.commit('showCard', false);
      context.commit('showSearch', false);
      context.commit('showBoardSettings', false);
    },
    setShowCard(context) {
      context.commit('showList', false);
      context.commit('showCard', true);
      context.commit('showSearch', false);
      context.commit('showBoardSettings', false);
    },
    setShowSearch(context) {
      context.commit('showList', false);
      context.commit('showCard', false);
      context.commit('showSearch', true);
      context.commit('showBoardSettings', false);
    },
    setShowBoardSettings(context, flipTo) {
      context.commit('showList', false);
      context.commit('showCard', false);
      context.commit('showSearch', false);
      context.commit('showBoardSettings', true);
    }
  },
  mutations: {
    logIn(state, oauthToken) {
      state.oauthToken = oauthToken
    },
    showList(state, flipTo) {
      state.showList = flipTo
    },
    showCard(state, flipTo) {
      state.showCard = flipTo
    },
    showSearch(state, flipTo) {
      state.showSearch = flipTo
    },
    showBoardSettings(state, flipTo){
      state.showBoardSettings = flipTo
    }
  },
  modules: {
    members,
    boards,
    lists,
    cards,
    organizations,
    search
  }
});

export default store
