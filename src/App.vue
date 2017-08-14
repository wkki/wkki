<template>
  <div id="app">
    <div class="columns">
      <div class="column">
        <h1 class="title">{{ boardName }}</h1>
      </div>
      <div class="column">
        <SearchField></SearchField>
      </div>
    </div>
    <div class="columns">

      <div class="column is-one-third">
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
      }
    },

    mounted() {
      this.$store.dispatch('init');
    }
  }

</script>

<style lang="css">
  @import '../node_modules/bulma/css/bulma.css';
</style>
