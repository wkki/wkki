<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'

  import NavBar from './components/Wiki/NavBar/NavBar.vue'

  export default {
    name: 'app',

    components: {
      NavBar,
    },

    computed: {
      boardName() {
        return this.$store.getters.boardName
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      needsLogin() {
        return (this.$store.getters.boardIsPrivate && !this.$store.getters.isLoggedIn)
      },
    },
    methods: {}
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
