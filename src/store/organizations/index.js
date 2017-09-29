import HTTP from '../http';
let {http, } = HTTP;

class Organization {
  constructor(id, organization, boards) {
    this.id = id;
    this.organization = organization;
    this.boards = boards;
  }
}

let fetch = (id) => {
  let organizationrUrl = ['organizations', id].join('/');
  let boardsUrl = ['organizations', id, 'boards'].join('/');

  return Promise.all([
    http.get(organizationrUrl),
    http.get(boardsUrl)
  ])
    .then(([organizationResponse, boardResponse]) => {
      console.log('fetch organization', organizationResponse.status, boardResponse.status);
      return new Organization(id, organizationResponse.data, boardResponse.data);
    }, ([organizationResponse, boardResponse]) => {
      let m = new Organization(id, organizationResponse.data, boardResponse.data);
      m.error = true;
      return m;
    })
};

let get = (context, id) => {
  if (id && !context.getters.organizations[id]) {
    return fetch(id)
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
      return fetch(id)
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
