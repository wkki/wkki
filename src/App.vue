<template>
  <div id="app">
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
        <a v-else v-bind:href="authUrl" target="_blank">login</a>
      </div>
    </nav>

    <div class="columns">

      <div class="column is-one-quarter">
        <Navigation></Navigation>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import Navigation from './components/Menu.vue'
  import Item from './components/Item.vue'
  import SearchField from './components/SearchField.vue'

  export default {
    name: 'app',

    components: {
      Navigation,
      Item,
      SearchField
    },

    computed: {
      boardName() {
        return this.$store.getters.boardName
      },
      authUrl(){
        return "https://trello.com/1/authorize?expiration=never&scope=read,write&callback_method=fragment&name=trellowiki&key=" + this.$store.getters.apiKey + "&return_url=" + window.location.origin + window.location.pathname
      },
      isLoggedIn(){
        return this.$store.getters.isLoggedIn
      }
    },
    methods:{
        logOut(){
            this.$store.dispatch('logOut')
        }
    }
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
