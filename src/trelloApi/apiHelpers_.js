
import Card from '../store/boards/Card'
import List from '../store/boards/List'



let fetchLists = (boardId, oauthToken, apiKey) => {
  let url = [BASE_URL, 'boards', boardId, 'lists'].join('/');
  return Vue.http.get(url, {
    params: {
      key: apiKey,
      token: oauthToken
    }
  })
    .then(response => {
      console.log('got response');
      return response.body
    }, response => {
      // error
      console.log(this.response)
    });
};

let fetchList = (listId, oauthToken, apiKey) => {
  return Vue.http.get(
    [BASE_URL, 'lists', listId, 'cards'].join('/'),
    {
      params: {
        fields: 'id,name',
        key: apiKey,
        token: oauthToken
      }
    }
  )
    .then(response => {
      if (response.status !== 200) {
        return []
      } else {
        return response.body
      }
    })
};

let fetchCard = (id, oauthToken, apiKey) => {
  return Vue.http.get([BASE_URL, 'cards', id].join('/'), {
    params: {
      key: apiKey,
      token: oauthToken
    }
  })
    .then(response => {
      return response.body
    }, response => {
      // error
      console.log(this.response)
    });
};

let fetchBoard = (boardId, oauthToken, apiKey) => {
  return Vue.http.get([BASE_URL, 'boards', boardId].join('/'), {
    params: {
      key: apiKey,
      token: oauthToken
    }
  })
    .then(response => {
      return response.body
    }, response => {
      // error
      console.log(this.response)
      return false
    });
};

let addCategory = (name, boardId, oauthToken, apiKey) => {
  return Vue.http.post(
    [BASE_URL, 'lists'].join('/'),
    {},
    {
      params: {
        name: name,
        idBoard: boardId,
        key: apiKey,
        token: oauthToken
      }
    }
  )
};

let saveCard = (card, oauthToken, apiKey) => {
  return Promise.all([
    Vue.http.put(
      [BASE_URL, 'cards', card.id].join('/'),
      {},
      {
        params: {
          desc: card.desc,
          key: apiKey,
          token: oauthToken
        }
      }
    ),
    Vue.http.post(
      [BASE_URL, 'cards', card.id, 'actions', 'comments'].join('/'),
      {},
      {
        params: {
          text: card.desc,
          key: apiKey,
          token: oauthToken
        }
      }
    ),
  ])
};

let addCard = (name, listId, oauthToken, apiKey) => {
  return Vue.http.post(
    [BASE_URL, 'cards'].join('/'),
    {},
    {
      params: {
        name: name,
        idList: listId,
        key: apiKey,
        token: oauthToken
      }
    }
  )
}

let search = (terms, boardId, oauthToken, apiKey) => {
  // https://api.trello.com/1/search?query=
  return Vue.http.get(
    [BASE_URL, 'search'].join('/'),
    {
      params: {
        query: terms,
        idBoards: boardId,
        key: apiKey,
        token: oauthToken
      }
    }
  )
    .then(res => {
      return res.body
    })
};

let fetchBoards = (member, oauthToken, apiKey) => {
  return Vue.http.get(
    [BASE_URL, 'members', member, 'boards'].join('/'),
    {
      params: {
        key: apiKey,
        token: oauthToken,
        filter: 'open'
      }
    })
    .then(res => {
      console.log('boards', res.body)
      return res.body
    })
};


let init = (boardId, oauthToken, apiKey) => {
  let lists = {};
  return fetchLists(boardId, oauthToken, apiKey)
    .then((_lists) => {
        _lists.forEach(list => {
          lists[[list['id']]] = {name: list['name']}
        });
        return lists
      }
    )
};


export default {
  init,
  fetchCard,
  fetchBoard,
  fetchList,
  search,
  addCategory,
  addCard,
  saveCard,
  fetchBoards
}
