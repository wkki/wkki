<template>
  <div class="menu">

    <template v-if="board['loading']">
      <h1>a spinner! wheee!</h1>
    </template>

    <template v-else-if="board['status']">
      <h1 class="title is-4">{{board.status }}</h1>
      <div>{{board.msg}}</div>
    </template>

    <template v-else="">
      <Lists :boardId="board['id']"></Lists>
    </template>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Lists from './Lists/Lists.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'menu',
    props: ['boardId'],
    components: {
      Lists
    },
    computed: {
      board() {
        let board = this.$store.getters['boards/get'](this.boardId);
        if (board['loading']) {
          this.$store.dispatch('boards/get', this.boardId);
        }
        return this.$store.getters['boards/get'](this.boardId)
      }
    },
  }
</script>
