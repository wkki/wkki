<template>
  <div class="column">
    <aside class="menu">
      <p class="menu-label">
        items
      </p>
      <ul class="menu-list">
        <li v-for="card in cards"><a @click="getItem(card.id)">{{card.name}}</a></li>
        <p v-if="showInput" class="control">
          <input class="input " type="text" placeholder="new card" v-model="newCard"
                 @keyup.enter="submitCard">
        </p>

        <li><a v-if="$store.getters.isLoggedIn" @click="triggerShowInput()">+</a></li>
      </ul>
    </aside>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        cards: this.$store.getters.activeList.cards,
        newCard: "",
        showInput: false
      }
    },
    methods: {
      getItem(cardId){
        this.$router.push({name: 'card', params: {cardId: cardId}});
      },
      triggerShowInput(){
        this.showInput = true
      },
      submitCard(){
        this.$store.dispatch('addCard', {cardName: this.newCard, listId: this.$route.params.listId});
        this.showInput = false
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
