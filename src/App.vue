<template>
  <div id="app">
    <nav class="level">

      <div class="level-left">
        <MyBoards></MyBoards>
        <LoginButton></LoginButton>
      </div>

      <div class="level-right">
        <div class="level-item">

        </div>

        <div class="level-item">
          <BoardBrowser></BoardBrowser>
        </div>
      </div>

    </nav>

    <div class="columns">
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import LoginButton from './components/LoginButton.vue'
  import BoardBrowser from './components/BoardBrowser.vue'
  import MyBoards from './components/MyBoards.vue'


  export default {
    name: 'app',

    components: {
      LoginButton,
      BoardBrowser,
      MyBoards
    },

    computed: {
      boardName() {
        return this.$store.getters.boardName
      },
      isLoggedIn(){
        return this.$store.getters.isLoggedIn
      },
      needsLogin(){
        return (this.$store.getters.boardIsPrivate && !this.$store.getters.isLoggedIn)
      },
    },
    methods: {}
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
