import HTTP from '../http';

let {http,} = HTTP;

class Member {
  constructor(username, member, boards) {
    this.username = username;
    this.member = member;
    this.boards = boards;
  }
}

let _fetch = (id) => {
  let memberUrl = ['members', id].join('/');
  let boardsUrl = ['members', id, 'boards?filter=open'].join('/');

  return Promise.all([
    http.get(memberUrl),
    http.get(boardsUrl)
  ])
    .then(([memberResponse, boardResponse]) => {
      console.log('fetch member', memberResponse.status, boardResponse.status);
      return new Member(id, memberResponse.data, boardResponse.data);
    })
};

let _get = (context, id) => {
  console.log('get member', id);
  if (id && !context.getters.members[id]) {
    return _fetch(id)
  } else {
    return new Promise((resolve) => {
      resolve(context.getters.members[id])
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
    isMyBoard(state) {
      return (id) => {
        if (state.members['me']) {
          return !!state.members['me'].member['idBoards']
            .find((boardId) => {
              return boardId === id;
            })
        } else {
          console.log('ismyboard: cant find me')
          return false
        }
      }
    },
    myBoards(state) {
      if (state.members['me']) {
        console.log('myboards', state.members['me']['boards'])
        return state.members['me']['boards']
      } else {
        console.log('cant find me')
      }
      return []
    }
  },
  actions: {
    fetch(context, id) {
      return _fetch(id)
    },
    get(context, id) {
      _get(context, id)
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
    addMembers(state, members) {
      members.forEach(member => {
        state.cards = Object.assign({}, state.members, {[member.id]: member})
      })
    },
    current(state, id) {
      state.current = id
    }
  }

}
