<template>
  <div id="list" class="columns">
    <div class="column">

      <div class="field is-grouped">

        <h4 class="title is-4">{{ list['name'] }} ({{ list['cards'].length }})</h4>

        <button class="button" @click="show=!show">
          <i :class="showButtonClass" aria-hidden="true"></i>
        </button>
        <button class="button" v-if="$store.getters['members/isMyBoard'](this.list['idBoard'])" @click="showAddCard=!showAddCard">
          <i :class="addButtonClass" aria-hidden="true"></i>
        </button>

        <div v-if="showAddCard">
          <AddCard :listId="list['id']"></AddCard>
        </div>
      </div>


      <template v-if="show || filterStr">
        <Cards :listId="list['id']" :filterStr="filterStr"></Cards>
      </template>
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
        show: false,
        showAddCard: false
      }
    },
    props: ['list', 'filterStr'],
    components: {
      Cards,
      AddCard
    },
    computed: {
      showButtonClass() {
        if (this.show) {
          return "fa fa-angle-up"
        } else return "fa fa-angle-down"
      },
      addButtonClass() {
        if (this.showAddCard) {
          return "fa fa-minus"
        } else return "fa fa-plus"
      }
    }
  }
</script>
