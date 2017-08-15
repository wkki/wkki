<template>
  <div class="item" v-if="activeCard.name">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'list', params: {listId: activeCard.idList}}">{{ activeCardsList.name }}
          </router-link>
        </li>
        <li class="is-active"><a href="#">{{ activeCard.name }}</a></li>
      </ul>
    </nav>
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h3 class="title is-2">
            {{activeCard.name}}
          </h3>
          <h2></h2>
        </div>
        <pre>{{activeCard.desc}}</pre>
      </div>
    </section>
    <a v-bind:href="activeCard.url">to Card</a><br>
    latest activity: {{ activeCard.dateLastActivity }}
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'item',
    computed: {
      activeCard() {
        return this.$store.getters.activeCard
      },
      activeCardsList(){
        let listId = this.$store.getters.activeCard.idList;
        return this.$store.getters.lists[listId]
      }
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('fetchCard', to.params.cardId)
      }
    },
    mounted(){
      this.$store.dispatch('fetchCard', this.$route.params.cardId)
    },
  }
</script>
