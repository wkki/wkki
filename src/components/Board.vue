<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <Lists></Lists>
    </div>
    <List></List>
    <div class="column">
      <Card></Card>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import Lists from './BoardComponents/Lists.vue'
  import List from './BoardComponents/List.vue'
  import Card from './BoardComponents/Card.vue'

  export default {
    name: 'board',
    components: {
      Lists,
      Card,
      List
    }
  }


</script>
