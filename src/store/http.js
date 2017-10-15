import axios from 'axios';

let baseURL = 'https://trello.com/1';

let http = axios.create({
  baseURL: baseURL,
  params: {
    key: process.env.WKKI_TRELLO_API_KEY
  }
});

const PARAMS = {
  card: {
    attachments: true
  },
  board: {
    fields: 'all'
  },
  list: {
    cards: 'open',
    card_fields: 'id'
  },
  lists: {
    cards: 'open',
    card_fields: 'id',
    filter: 'open'
  }
}

let setToken = (oauthToken) => {
  console.log('updating axios');
  http.defaults.params.token = oauthToken
};

let fetchCard = (id) => {
  let url = ['cards', id].join('/');
  return http.get(url, {params: PARAMS.card})
};

let initBoard = (id) => {
  let boardUrl = ['boards', id].join('/');
  let listsUrl = ['boards', id, 'lists'].join('/');
  let cardsUrl = ['boards', id, 'cards', 'open'].join('/');
  let membersUrl = ['boards', id, 'members'].join('/');
  let labelsUrl = ['boards', id, 'labels'].join('/');

  return Promise.all([
    http.get(boardUrl, {params: PARAMS.board}),
    http.get(listsUrl, {params: PARAMS.lists}),
    http.get(cardsUrl, {params: PARAMS.card}),
    http.get(membersUrl),
    http.get(labelsUrl)
  ])
};

let fetchList = (id) => {
  let listUrl = ['lists', id].join('/');
  return http.get(listUrl, {params: PARAMS.list})
};

let addList = (name, boardId) => {
  let listUrl = ['lists'].join('/');
  let params = {
    name,
    idBoard: boardId,
  };
  return http.post(listUrl, params)
};

let addCard = (name, listId) => {
  let cardUrl = ['cards'].join('/');
  let params =
    {
      name: name,
      idList: listId,
    };
  console.log('creating card with ', params)
  return http.post(cardUrl, params)
};


export default {
  setToken,
  fetchCard,
  initBoard,
  addList,
  addCard,
  http,
  fetchList
}
