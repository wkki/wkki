<template>
  <div>
   actions: {{ cardActions }}
    <div v-for="action in cardActions['data']">
      -- {{ action['data']['old'] }}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['cardId'],
    computed: {
      cardActions() {
        let card = this.$store.getters['cards/getActions'](this.cardId);
        console.log(card)
        if (card['loading']) {
          this.$store.dispatch('cards/getActions', this.cardId);
        }
        return this.$store.getters['cards/getActions'](this.cardId)
      }
    }
  }
</script>
