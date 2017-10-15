<template>
  <div id="list" class="columns">
    <div class="column">

      <div class="container">
        <div class="field is-grouped">
          <button class="button" @click="show=!show">
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


        <template v-if="show || filterStr">
          <div class="box">
            <Cards :listId="list['id']" :filterStr="filterStr"></Cards>
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
        showAddCard: false
      }
    },
    props: ['list', 'filterStr', 'show'],
    components: {
      Cards,
      AddCard
    },
    computed: {
      showButtonClass() {
        if (this.show) {
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
