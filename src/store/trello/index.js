import List from './List'
import Card from './Card'
import Boards from './Boards'
import Members from './Members'

import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  namespaced: true,
  state: {
    currentMember: '',
    members: new Members(),
    cards: {},
    lists: {},
    boards: new Boards()
  },
  getters: {
    boards(state){
      return state.boards
    },
    members(state){
      return state.members
    }
  },
  actions: {
    fetchMember(context, username){
      context.getters.members.get(username)
    },
  },
  mutations: {

  }

}
