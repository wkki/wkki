import Vue from 'vue'

const BASE_URL = 'https://trello.com/1';

class Organization {
  constructor(id, organization, boards) {
    this.id = id;
    this.organization = organization;
    this.boards = boards;
  }
}

let fetch = (id, apiKey, oauthToken) => {
  let organizationrUrl = [BASE_URL, 'organizations', id].join('/');
  let boardsUrl = [BASE_URL, 'organizations', id, 'boards'].join('/');
  let params = Object.assign(
    {
      key: apiKey,
      token: oauthToken
    },
    {});
  return Promise.all([
    Vue.http.get(organizationrUrl, {params}),
    Vue.http.get(boardsUrl, {params})
  ])
    .then(([organizationResponse, boardResponse]) => {
      console.log('fetch organization', organizationResponse.status, boardResponse.status);
      return new Organization(id, organizationResponse.body, boardResponse.body);
    }, ([organizationResponse, boardResponse]) => {
      let m = new Organization(id, organizationResponse.body, boardResponse.body);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  if (id && !context.getters.organizations[id]) {
    return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
      .then((board) => {
        context.commit('addOrganization', board);
        return board
      })
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.organizations[id])
    })
  }
};

export default {
  namespaced: true,
  state: {
    organizations: {},
    current: false
  },
  getters: {
    organizations(state) {
      return state.organizations
    },
    current(state) {
      if (state.current && state.organizations[state.current]) {
        return state.organizations[state.current]
      } else {
        return false
      }
    }
  },
  actions: {
    fetch(context, id) {
      return fetch(id, context.rootGetters.apiKey, context.rootGetters.oauthToken)
        .then((board) => {
          context.commit('addOrganization', board);
        })
    },
    get(context, id) {
      get(context, id)
    },
    setCurrent(context, id) {
      context.dispatch('get', id);
      context.commit('current', id);
    }
  },
  mutations: {
    addOrganization(state, organization) {
      state.organizations = Object.assign({}, state.organizations, {[organization.id]: organization})
    },
    current(state, id) {
      state.current = id
    }
  }

}
