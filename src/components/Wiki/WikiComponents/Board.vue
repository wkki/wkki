<template>
  <div class="menu">
    <div class="columns">
      <div class="column">

        <div class="field">
          <div class="control">
            <div v-if="$store.getters['boards/current']">
              <input class="input" type="text" placeholder="search in board" v-model="searchStr"
                     @keyup.enter="search()">
            </div>
          </div>
        </div>

        <h5 class="title is-5">{{ currentTreePath.join('/') }}</h5>

        <a class="button is-fullwidth is-dark is-outlined" v-if="currentTreePath.length !== 0" @click="goBack()">..</a>

        <p class="field" v-for="key in Object.keys(currentTree).sort()">
          <a class="button is-fullwidth is-dark is-outlined" @click="addToTreePath(key)">
            {{ key }}
          </a>
        </p>

        <div v-if="showInput" class="control">
          <input class="input " type="text" placeholder="new list" v-model="newList"
                 @keyup.enter="addList">
        </div>
        <a v-if="isEditable" @click="toggleShowInput()">
          <button class="button is-fullwidth">+</button>
        </a>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'menu',
    data() {
      return {
        showInput: false,
        newList: '',
        searchStr: '',
        currentTreePath: []
      }
    },
    computed: {
      activeList() {
        return this.$store.getters['lists/current']
      },
      board() {
        if (this.$store.getters['boards/current']) {
          return this.$store.getters['boards/current']
        } else {
          return [{name: 'loading...'}]
        }
      },
      isEditable() {
        if (this.$store.getters['boards/current']) {
          let id = this.$store.getters['boards/current']['board']['id'];
          return this.$store.getters['boards/isEditable'](id);
        }
      },
      currentTreeNode(){
        let currentNode = this.boardAsTree();
        this.currentTreePath.forEach(key => {
          currentNode = currentNode[key]
        });
        return currentNode
      },

      currentTree() {
        if (!this.boardAsTree()) {
          return {}
        } else if (Object.keys(this.currentTreePath).length === 0) {
          return this.boardAsTree();
        } else {
          return this.currentTreeNode;
        }
      }
    },
    methods: {

      boardAsTree() {
        // todo: could be in store...?
        if (this.$store.getters['boards/current']) {
          let tree = {};
          let lists = this.$store.getters['boards/current']['lists'];
          lists.forEach(list => {
            let path = list['name'].split('/');
            let treeState = tree;
            path.forEach(element => {
              if (!treeState[element]) {
                treeState[element] = {};
              }
              treeState = treeState[element]
            });
          });
          return tree
        }
      },

      addToTreePath(key){
        this.currentTreePath.push(key)
      },

      goBack(){
        this.currentTreePath.pop()
      },

      listSorted() {
        if (this.$store.getters['lists/current']) {
          let cardsByFirstChar = {};
          this.$store.getters['lists/current']['cards'].forEach(card => {
            let char = card['name'][0].toLowerCase();
            if (!cardsByFirstChar[char]) {
              cardsByFirstChar[char] = [];
            }
            cardsByFirstChar[char].push(card);
          });
          return cardsByFirstChar
        } else {
          return false
        }
      },
      fetchList(listId) {
        this.$store.dispatch('lists/setCurrent', listId);
        this.$store.dispatch('setShowList', true)
      },
      toggleShowInput() {
        this.showInput = !this.showInput;
      },
      addList() {
        this.$store.dispatch('boards/addList', {
          name: this.newList,
          boardId: this.$store.getters['boards/current']['board']['id']
        });
        this.showInput = false;
        this.newList = '';
      },
      search() {
        console.log(this.searchStr);
        this.$store.dispatch('search/search', {
          query: this.searchStr,
          boardId: this.$store.getters['boards/current']['board']['id']
        })
        this.$store.dispatch('setShowSearch', true);
      }
    },
    mounted() {
      if (this.$route.params.boardId) {
        this.$store.dispatch('boards/setCurrent', this.$route.params.boardId);
        this.$store.dispatch('cards/setCurrent', false);
      }
    }
  }
</script>
