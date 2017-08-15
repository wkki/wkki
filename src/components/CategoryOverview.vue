<template>
  <div class="column">
    <aside class="menu">
      <p class="menu-label">
        items
      </p>
      <ul class="menu-list">
        <li v-for="card in cards"><a @click="getItem(card.id)">{{card.name}}</a></li>
      </ul>
    </aside>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        cards: this.$store.getters.activeList.cards
      }
    },
    methods: {
      getItem(cardId){
        this.$router.push({name: 'card', params: {cardId: cardId}});
      }
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('fetchList', to.params.listId)
      }
    },
    mounted(){
      this.$store.dispatch('fetchList', this.$route.params.listId)
    }
  }
</script>
