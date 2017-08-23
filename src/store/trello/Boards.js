import Vue from 'vue'
import Wrapper from './Wrapper'

class Board{
  constructor(){
    this.board = {};
    this.error = false;
  }
}

export default class Boards extends Wrapper {
  fetch(boardId) {
    let url = [this.BASE_URL, 'boards', boardId, 'lists'].join('/');

    return Vue.http.get(url, {
      params: this.params
    })
      .then(response => {
        this.wrapped[id] = new Board(response.body);
      }, response => {
        // todo: error handling
        this.wrapped[id] = new Board(response.body);
        this.wrapped[id].error = true
      });
  }
}


