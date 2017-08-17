<template>
  <div class="results">
    <h2 class="title is-2">results for {{ searchResults.options.terms }}</h2>
    <ul>
      <li v-for="card in searchResults.cards">

        <a @click="fetchList(card.idList)">{{ list(card.idList).name }}</a> - <a @click="getItem(card.id)">{{card.name}}</a></li>
    </ul>
  </div>


</template>

<script>
  export default {
    computed: {
      searchResults(){
        return this.$store.getters.searchResults
      }

    },
    methods: {
      list(listId){
        return this.$store.getters.lists[listId]
      },
      getItem(cardId){
        this.$router.push({name: 'card', params: {cardId: cardId}});
      },
      fetchList(listId){
        this.$router.push({name: 'list', params: {listId: listId}});
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(this.$route.query)
        this.$store.dispatch('search', this.$route.query)
      }
    },
    mounted(){
      console.log(this.$route.query.query)
      this.$store.dispatch('search', this.$route.query.query)
    }
  }
</script>
