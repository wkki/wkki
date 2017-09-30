import Vue from 'vue'
import Vuex from 'vuex'

import HTTP from './http';
let {http, setToken} = HTTP;

Vue.use(Vuex);

import members from './members'
import boards from './boards'
import lists from './lists'
import cards from './cards'
import organizations from './organizations'
import search from './search'

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

setToken(localStore.get('oauthToken'));

const store = new Vuex.Store({
  state: {
    oauthToken: localStore.get('oauthToken'),
    showList: false,
    showCard: false,
    showSearch: false,
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
    showCard(state){
      return state.showCard
    },
    showSearch(state){
      return state.showSearch
    },
    isLoggedIn(state){
      return !!state.oauthToken
    }
  },
  actions: {
    logIn(context, oauthToken){
      console.log('login http', http)
      localStore.set('oauthToken', oauthToken);
      setToken(oauthToken, context.getters['apiKey']);
      context.commit('logIn', oauthToken);
    },
    logOut(context){
      localStore.rm('oauthToken');
      context.commit('logIn', undefined);
    },
    setShowList(context, flipTo){
      context.commit('showList', flipTo);
      context.commit('showCard', !flipTo);
      context.commit('showSearch', !flipTo);
    },
    setShowCard(context, flipTo){
      context.commit('showList', !flipTo);
      context.commit('showCard', flipTo);
      context.commit('showSearch', !flipTo);
    },
    setShowSearch(context, flipTo){
      context.commit('showList', !flipTo);
      context.commit('showCard', !flipTo);
      context.commit('showSearch', flipTo);
    }
  },
  mutations: {
    logIn(state, oauthToken){
      state.oauthToken = oauthToken
    },
    showList(state, flipTo){
      state.showList = flipTo
    },
    showCard(state, flipTo){
      state.showCard = flipTo
    },
    showSearch(state, flipTo){
      state.showSearch = flipTo
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
