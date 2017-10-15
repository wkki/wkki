<template>
  <div id="list" class="columns">
    <div class="column">

      <div class="container">
        <div class="field is-grouped">
          <button class="button" @click="showCards=!showCards">
            {{ list['name'] }} ({{ list['cards'].length }}) <i :class="showButtonClass" aria-hidden="true"></i>
          </button>

          <button class="button" v-if="$store.getters['members/isMyBoard'](this.list['idBoard'])"
                  @click="showAddCard=!showAddCard">
            <i :class="addButtonClass" aria-hidden="true"></i>
          </button>

          <div v-if="showAddCard">
            <AddCard :listId="list['id']"></AddCard>
          </div>

        </div>

        <template v-if="showCards || filterStr || show">
          <div class="box">
            internal:{{ showCards }} external: {{show}}
            <Cards :listId="list['id']" :filterStr="filterStr" @flipOpen="setState(showCards)"></Cards>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Cards from './Cards/Cards.vue'
  import {mapGetters} from 'vuex'
  import AddCard from './Cards/AddCard.vue'

  export default {
    name: 'List',
    data() {
      return {
        showAddCard: false,
        showCards: false
      }
    },
    props: ['list', 'filterStr', 'show'],
    components: {
      Cards,
      AddCard
    },
    watch: {
      'show': function(val) {
        if(val) {
          this.showCards = false;
        }
      }
    },
    computed: {
      showButtonClass() {
        if (this.showCards) {
          return "fa fa-chevron-up"
        } else return "fa fa-chevron-down"
      },
      addButtonClass() {
        if (this.showAddCard) {
          return "fa fa-minus"
        } else return "fa fa-plus"
      }
    }
  }
</script>
