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

console.log('trying to set token', localStore.get('oauthToken'))
setToken(localStore.get('oauthToken'));

const store = new Vuex.Store({
  state: {
    oauthToken: localStore.get('oauthToken'),
  },
  getters: {
    apiKey(state){
      return state.apiKey
    },
    oauthToken(state){
      return state.oauthToken
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
    }
  },
  mutations: {
    logIn(state, oauthToken){
      state.oauthToken = oauthToken
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
