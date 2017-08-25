import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Member {
  constructor(username, user, boards) {
    this.username = username;
    this.user = user;
    this.boards = boards;
  }
}

export default {
  namespaced: true,
  state: {
    members: {},
    current: false
  },
  getters: {
    members(state){
      return state.members
    },
    current(state){
      if (state.current && state.members[state.current]) {
        return state.members[state.current]
      } else {
        return false
      }
    },
    myBoards(state){
      if(state.members['me']) {
        return state.members['me']['boards']
      }
      return []
    }
  },
  actions: {
    fetch(context, username){
      console.log('fetching member', username)

      let memberUrl = [BASE_URL, 'members', username].join('/');
      let boardsUrl = [BASE_URL, 'members', username, 'boards'].join('/');

      let params = Object.assign(
        {
          key: context.rootGetters.apiKey,
          token: context.rootGetters.oauthToken
        },
        {});

      return Promise.all([
        Vue.http.get(memberUrl, {params}),
        Vue.http.get(boardsUrl, {params})
      ])
        .then(([memberResponse, boardsResponse]) => {
          console.log('fetchMember', memberResponse.status, boardsResponse.status);
          return new Member(username, memberResponse.body, boardsResponse.body);
        }, ([memberResponse, boardsResponse]) => {
          let m = Member(username, memberResponse.body, boardsResponse.body);
          m.error = true;
          return m;
        })
        .then((member) => context.commit('addMember', member));
    },
    get(context, id){
      if (!context.getters.members[id]) {
        context.dispatch('fetch', id)
      } else {
        console.log('using member', id, 'from store')
      }
    },
    setCurrent(context, id){
      context.dispatch('get', id)
      context.commit('current', id);
    }
  },
  mutations: {
    addMember(state, member){
      state.members = Object.assign({}, state.members, {[member.username]: member})
    },
    current(state, id){
      state.current = id
    }
  }

}
