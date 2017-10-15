<template>
  <div id="cards" class="menu">
    <div class="columns is-multiline">

      <div class="column" v-for="firstChar in Object.keys(listSorted).sort()">

        <template v-if="filter(listSorted[firstChar]).length > 0">
          <table class="table">
            <thead>
            <tr>
              <th>{{firstChar}}</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="card in filter(listSorted[firstChar])">
              <td>
                <a @click="goToCard(card.original.id)" v-html="card.string"></a>
              </td>
            </tr>
            </tbody>
          </table>
        </template>

      </div>

    </div>

  </div>
</template>

<script>
  /**
   * show cards in a list
   */
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import fuzzy from 'fuzzy'


  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  export default {
    name: 'cards',
    props: ['listId', 'filterStr'],

    data() {
      return {
        showInput: false,
        newList: '',
        searchStr: '',
      }
    },
    computed: {
      ...mapGetters({
        cards: 'cards/cards'
      }),
      listSorted() {
        return this.sortCards(this.cardsInList(this.listId))
      }
    },
    methods: {
      sortCards(cards) {
        let cardsByFirstChar = {};
        cards.forEach(card => {
          let char = card['name'][0].toLowerCase();
          if (!cardsByFirstChar[char]) {
            cardsByFirstChar[char] = [];
          }
          cardsByFirstChar[char].push(card);
        });
        return cardsByFirstChar
      },
      cardsInList() {
        let cardsInList = [];
        Object.keys(this.cards).forEach(key => {
            if (this.cards[key]['idList'] === this.listId) cardsInList.push(this.cards[key])
          }
        );
        return cardsInList
      },
      toggleShowInput() {
        this.showInput = !this.showInput;
      },
      goToCard(id) {
        this.$router.push({name: 'card', params: {cardId: id}})
      },
      filter(arrayToFilter) {
        let options = {
          pre: "<b>",
          post: "</b>",
          extract: function (card) {
            return escapeHtml(card.name);
          }
        };
        return fuzzy.filter(this.filterStr, arrayToFilter, options);
      }
    }
  }
</script>
