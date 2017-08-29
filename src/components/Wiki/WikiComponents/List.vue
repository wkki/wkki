<template>
  <div>
  <div class="column" v-if="showList">
    <aside class="menu">
      <p class="menu-label">
        Cards
      </p>

      <ul class="menu-list">
        <li v-for="card in list"><a @click="goToCard(card.id)">{{card.name}}</a></li>
        <li>
          <div v-if="showInput" class="control">
            <input class="input " type="text" placeholder="new card" v-model="newCard"
                   @keyup.enter="addCard">
          </div>
        </li>

        <li><a v-if="isEditable" @click="toggleShowInput()">+</a></li>
      </ul>

    </aside>
  </div>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'menu',
    data(){
      return {
        showInput: false,
        newCard: ''
      }
    },
    computed: {
      list(){
        if (this.$store.getters['lists/current']) {
          return this.$store.getters['lists/current']['cards']
        } else {
          return [{name: 'loading...'}]
        }
      },
      isEditable(){
          return this.$store.getters['boards/current']['isEditable']
      },
      showList(){
          return this.$store.getters.showList
      }
    },
    methods: {
      toggleShowInput(){
        this.showInput = !this.showInput;
      },
      addCard(){
        this.$store.dispatch('lists/addCard', {
          name: this.newCard,
          listId: this.$store.getters['lists/current']['list']['id']
        });
        this.showInput = false;
        this.newCard = '';
      },
      goToCard(cardId){
        this.$store.dispatch('setShowList', false);
        this.$store.dispatch('setShowCard', true);
        this.$store.dispatch('cards/setCurrent', cardId);
        this.$router.push({name: 'card', params: {boardId: this.$route.params.boardId, cardId}})
      }
    },
  }
</script>
