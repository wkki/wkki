<template>
  <div id="app">
    <div class="columns">
      <div class="column">
        <h1 class="title">{{ boardName }}</h1>
      </div>
      <div class="column">
        <SearchField></SearchField>
        <!--<a v-bind:href="authUrl" target="_blank">login</a>-->
      </div>
    </div>
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
        return "https://trello.com/1/authorize?expiration=never&callback_method=fragment&name=trellowiki&key=" + this.$store.getters.apiKey + "&return_url=" + window.location.origin
      }
    }
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
