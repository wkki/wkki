import Vue from 'vue'

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
  return Vue.http.get([BASE_URL, 'lists', listId, 'cards?fields=id,name,url'].join('/'))
    .then(response => {
      if (response.status !== 200) {
        return []
      } else {
        return response.body.map(card => {
          return {
            id: card['id'],
            name: card['name']
          }
        })
      }
    })
}

let fetchCards = (listIds) => {
  let requests = [];

  listIds.forEach(listId => {
    requests.push(fetchList(listId))
  });

  return Promise.all(requests)
    .then(listCards => {
      let lists_cards = [];
      listCards.forEach((cards, index) => {
        lists_cards.push(cards)
      });
      return lists_cards
      //context.commit('setCategories', response.body)
    }, response => {
      // error
      console.log('ERROR', this.response)
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

let fetchBoardName = (boardId) => {
  return Vue.http.get([BASE_URL, 'boards', boardId].join('/'))
    .then(response => {
      return response.body.name
    }, response => {
      // error
      console.log(this.response)
    });
};


let init = (boardId) => {
  /**
   * builds something like:
   * {
   *  some_listId: {
   *        name: "listname"
   *        cards: {
   *              some_cardId: {
   *                  name: "some_name"
   *                }
   *          }
   *      }
   *  listid: {...}
   * }
   *
   * @type {Array}
   */
  let listIds = [];
  let listNames = [];
  let boardName;

  return fetchBoardName(boardId)
    .then((name) => {
      boardName = name;
      return fetchLists(boardId)
    })
    .then((lists) => {
        lists.forEach(cat => {
          listIds.push(cat['id']);
          listNames.push(cat['name']);
        });
      }
    ).then(() => {
      let lists = {};
      listIds.forEach((listId, index) => {
        lists[listId] = {
          name: listNames[index],
        };
      });
      return lists
    })
};


export default {
  init,
  fetchCard,
  fetchBoardName,
  fetchList
}
