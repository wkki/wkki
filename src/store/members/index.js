import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Member {
  constructor(username, member, boards) {
    this.username = username;
    this.member = member;
    this.boards = boards;
  }
}

let fetch = (id, apiKey, oauthToken) => {
  let memberUrl = [BASE_URL, 'members', id].join('/');
  let boardsUrl = [BASE_URL, 'members', id, 'boards?filter=open'].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {});
  return Promise.all([
    Vue.http.get(memberUrl, {params}),
    Vue.http.get(boardsUrl, {params})
  ])
    .then(([memberResponse, boardResponse]) => {
      console.log('fetch member', memberResponse.status, boardResponse.status);
      return new Member(id, memberResponse.body, boardResponse.body);
    }, ([memberResponse, boardResponse]) => {
      let m = new Member(id, memberResponse.body, boardResponse.body);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  console.log('get member', id);
  if (id && !context.getters.members[id]) {
    return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.lists[id])
    })
  }
};

export default {
  namespaced: true,
  state: {
    members: {},
    current: false
  },
  getters: {
    members(state) {
      return state.members
    },
    current(state) {
      if (state.current && state.members[state.current]) {
        return state.members[state.current]
      } else {
        console.log('no current member');
        return false
      }
    },
    myBoards(state) {
      if (state.members['me']) {
        return state.members['me']['boards']
      }
      return []
    }
  },
  actions: {
    fetch(context, id) {
      return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
    },
    get(context, id) {
      get(context, id)
        .then((member) => {
          context.commit('addMember', member);
          if (member.member.idOrganizations) {
            member.member.idOrganizations.forEach((id) => {
              context.dispatch('organizations/get', id, {root: true});
            })
          }
        })
    },
    setCurrent(context, id) {
      context.dispatch('get', id);
      context.commit('current', id);
    }
  },
  mutations: {
    addMember(state, member) {
      state.members = Object.assign({}, state.members, {[member.username]: member})
    },
    current(state, id) {
      state.current = id
    }
  }

}
