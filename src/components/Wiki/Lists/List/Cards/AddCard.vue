<template>
  <div v-if="canCreateCard">
    <div class="field has-addons">
      <div class="control">
        <input class="input" @keyup.enter="addCard" type="text" placeholder="new Card" v-model="newCard">
      </div>

      <div class="control">
        <button class="button" :disabled="!newCard" @click="addCard()">create</button>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'AddCard',
    props: ['listId'],
    data() {
      return {
        newCard: ''
      }
    },
    computed: {
      list() {
        return this.$store.getters['lists/lists'][this.listId]
      },
      canCreateCard() {
        return this.$store.getters['members/isMyBoard'](this.list['idBoard'])
      }
    },
    methods: {
      addCard() {
        this.$store.dispatch('cards/createCard', {
          name: this.newCard,
          listId: this.listId
        });
        this.newCard = '';
      }
    }
  }
</script>
