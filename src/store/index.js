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
    apiKey: process.env.TRIXI_TRELLO_API_KEY,
    oauthToken: localStore.get('oauthToken'),
    activeList: false
  },
  getters: {
    apiKey(state){
      return state.apiKey
    },
    oauthtoken(state){
      return state.oauthToken
    },
    activeList(state){
      return state.activeList
    }
  },
  actions: {
    setActiveList(context, listId){
      context.commit('activeList', listId);
    },
    logIn(context, oauthToken){
      localStore.set('oauthToken', oauthToken);
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
    },
    activeList(state, listId){
      state.activeList = listId
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
