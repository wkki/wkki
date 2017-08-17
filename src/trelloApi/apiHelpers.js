import Vue from 'vue'

import Card from '../store/Card'
import List from '../store/List'

let BASE_URL = 'https://trello.com/1';

let fetchLists = (boardId) => {
  let url = [BASE_URL, 'boards', boardId, 'lists'].join('/');
  return Vue.http.get(url)
    .then(response => {
      console.log('got response');
      return response.body
    }, response => {
      // error
      console.log(this.response)
    });
};

let fetchList = (listId) => {
  return Vue.http.get(
    [BASE_URL, 'lists', listId, 'cards'].join('/'),
    {params: {fields: 'id,name'}}
  )
    .then(response => {
      if (response.status !== 200) {
        return []
      } else {
        return response.body
      }
    })
};

let fetchCard = (id) => {
  return Vue.http.get([BASE_URL, 'cards', id].join('/'))
    .then(response => {
      return response.body
    }, response => {
      // error
      console.log(this.response)
    });
};

let fetchBoard = (boardId) => {
  return Vue.http.get([BASE_URL, 'boards', boardId].join('/'))
    .then(response => {
      return response.body
    }, response => {
      // error
      console.log(this.response)
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


let init = (boardId) => {
  let lists = {};
  return fetchLists(boardId)
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
  saveCard
}
