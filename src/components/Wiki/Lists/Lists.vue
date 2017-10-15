<template>
  <div id="lists">

    <div class="columns is-multiline">
      <div class="column"></div>

      <div class="column is-3 is-centered">

        <div class="field is-grouped">
          <div class="control">
            <input class="input" type="text" placeholder="filter" v-model="filterStr">
          </div>
          <div class="control">
            <button class="button" @click="openAllLists=!openAllLists">open all</button>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">

        <div class="columns" v-for="list in listsInBoard()" :key="list.id">
          <div class="column">

            <List :list="list" :filterStr="filterStr" :show="openAllLists"></List>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import List from './List/List.vue'
  import AddList from './AddList.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Lists',
    props: ['boardId'],
    components: {
      List,
      AddList
    },
    data() {
      return {
        showInput: false,
        openAllLists: false,
        filterStr: '',
      }
    },
    computed: {
      ...mapGetters({
        lists: 'lists/lists'
      })
    },
    methods: {
      listsInBoard() {
        let listsInBoard = [];
        Object.keys(this.lists).forEach(key => {
            if (this.lists[key]['idBoard'] === this.boardId) listsInBoard.push(this.lists[key])
          }
        );
        return listsInBoard
      }
    }
  }
</script>
