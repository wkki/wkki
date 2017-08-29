<template>
  <div class="results" v-if="$store.getters['showSearch']">
    <h2 class="title is-2">results for "{{ $store.getters['search/result'].options.terms[0]['text'] }}"</h2>
    <ul>
      <template v-if="$store.getters['search/result'].cards.length > 0">
        <li v-for="card in $store.getters['search/result'].cards">
          <div class="box">
            <a @click="fetchList(card.idList)">{{ listName(card.idList) }}</a> /
            <a @click="goToCard(card.id)">{{card.name}}</a>
          </div>
        </li>
      </template>
      <template v-else="">
        - nothing found -
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      fetchList(listId) {
        this.$store.dispatch('lists/setCurrent', listId);
        this.$store.dispatch('setShowList', true)
      },
      listName(id) {
        if (this.$store.getters['lists/lists'][id]) {
          return this.$store.getters['lists/lists'][id]['list']['name']
        } else {
          return 'loading...'
        }
      },
      goToCard(cardId) {
        this.$store.dispatch('setShowCard', true);
        this.$store.dispatch('cards/setCurrent', cardId);
        this.$router.push({name: 'card', params: {cardId}})
      }
    },
    mounted() {
      console.log(this.$route.query.query);
      this.$store.dispatch('search/search', this.$route.query.query)
    }
  }
</script>
