<template>
  <div id="app">
    <div v-if="needsLogin">
      <PrivateBoardLogin></PrivateBoardLogin>
    </div>

    <div v-else>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title"><a href="">{{ boardName }}</a></h1>
          </div>
        </div>
        <div class="level-right">
          <div v-if="isLoggedIn">
            <div class="level-item">
              <SearchField></SearchField>
              <p class="control">
                <button class="button" @click="logOut">logout</button>
              </p>
            </div>
          </div>
          <LoginButton v-else></LoginButton>
        </div>
      </nav>

      <div class="columns">

        <div class="column is-one-quarter">
          <Lists></Lists>
        </div>
        <div class="column">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import Lists from './components/Lists.vue'
  import Card from './components/Card.vue'
  import SearchField from './components/SearchField.vue'
  import PrivateBoardLogin from './components/PrivateBoardLogin.vue'
  import LoginButton from './components/LoginButton.vue'

  export default {
    name: 'app',

    components: {
      Lists,
      Card,
      SearchField,
      PrivateBoardLogin,
      LoginButton
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
    methods: {
      logOut(){
        this.$store.dispatch('logOut')
      }
    }
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
