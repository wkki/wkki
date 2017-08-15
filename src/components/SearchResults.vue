<template>
  <div class="results">
    <h1>results</h1>
    {{searchResults}}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchResults: this.$store.getters.searchResults
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
