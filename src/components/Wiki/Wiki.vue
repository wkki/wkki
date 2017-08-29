<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <Board></Board>
    </div>
    <List></List>
    <div class="column">
      <Card></Card>
      <SearchResults></SearchResults>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import Board from './WikiComponents/Board.vue'
  import List from './WikiComponents/List.vue'
  import Card from './WikiComponents/Card.vue'
  import SearchResults from './WikiComponents/SearchResults.vue'

  export default {
    name: 'board',
    components: {
      Board,
      Card,
      List,
      SearchResults
    }
  }


</script>
