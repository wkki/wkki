<template>
  <div class="menu">
    <div class="columns">
      <div class="column">

        <div class="field">
          <div class="control">
            <div v-if="$store.getters['isLoggedIn'] && $store.getters['boards/current']">
              <input class="input" type="text" placeholder="search in board" v-model="searchStr"
                     @keyup.enter="search()">
            </div>
          </div>
        </div>

          <p class="field" v-for="key in Object.keys(board.lists).sort()">
            <a class="button is-fullwidth is-dark is-outlined" @click="fetchList(board.lists[key]['id'])">
              {{ board.lists[key]['name'] }}
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
        searchStr: ''
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
    },
    methods: {
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
