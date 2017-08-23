import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Member{
  constructor(username, boards){
    this.username = username;
    this.boards = boards;
  }
}

export default {
  namespaced: true,
  state: {
    members: {}
  },
  getters: {
    members(state){
      return state.members
    }
  },
  actions: {
    fetch(context, username){
      let url = [BASE_URL, 'members', username, 'boards'].join('/');
      let params = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {fields: 'all'});

      return Vue.http.get(url, {params})
        .then(response => {
          console.log(response.status)
          return new Member(username, response.body);
        }, response => {
          console.log(response.status)
          let m = new Member(username, response.body);
          m.error = true;
          return m;
        })
        .then((member) => context.commit('addMember', member));
    },
  },
  mutations: {
    addMember(state, member){
      state.members = Object.assign({}, state.members, {[member.username]: member})
    }
  }

}
