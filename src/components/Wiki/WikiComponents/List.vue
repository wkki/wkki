<template>
  <div>
    <div class="column" v-if="showList && listSorted">
      <div class="columns is-multiline">

        <div class="column" v-for="firstChar in Object.keys(listSorted).sort()">

          <h4 class="title is-4">{{firstChar}}</h4>
          <table class="table">
            <tbody>
            <tr v-for="card in listSorted[firstChar]">
              <td><a @click="goToCard(card.id)">{{card.name}}</a></td>
            </tr>
            </tbody>
          </table>

          <div v-if="showInput" class="control">
            <input class="input " type="text" placeholder="new card" v-model="newCard"
                   @keyup.enter="addCard">
          </div>

        </div>

      </div>
      <a class="button" v-if="isEditable" @click="toggleShowInput()">add card</a>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'menu',
    data() {
      return {
        showInput: false,
        newCard: ''
      }
    },
    computed: {
      list() {
        if (this.$store.getters['lists/current']) {
          return this.$store.getters['lists/current']['cards']
        } else {
          return [{name: 'loading...'}]
        }
      },
      listSorted() {
        if (this.$store.getters['lists/current']) {
          let cardsByFirstChar = {};
          this.$store.getters['lists/current']['cards'].forEach(card => {
            let char = card['name'][0].toLowerCase();
            if (!cardsByFirstChar[char]) {
              cardsByFirstChar[char] = [];
            }
            cardsByFirstChar[char].push(card);
          });
          return cardsByFirstChar
        } else {
          return false
        }
      },
      isEditable() {
        let id = this.$store.getters['boards/current']['board']['id'];
        return this.$store.getters['boards/isEditable'](id);
      },
      showList() {
        return this.$store.getters.showList
      }
    },
    methods: {
      toggleShowInput() {
        this.showInput = !this.showInput;
      },
      addCard() {
        this.$store.dispatch('lists/addCard', {
          name: this.newCard,
          listId: this.$store.getters['lists/current']['list']['id']
        });
        this.showInput = false;
        this.newCard = '';
      },
      goToCard(cardId) {
        this.$store.dispatch('setShowList', false);
        this.$store.dispatch('setShowCard', true);
        this.$store.dispatch('cards/setCurrent', cardId);
        this.$router.push({name: 'card', params: {boardId: this.$route.params.boardId, cardId}})
      }
    },
  }
</script>
