<template>
  <div class="item" v-if="!$store.getters.activeList">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a @click="setActiveList(card.idList)">{{ listName(card.idList) }}</a>
        </li>
        <li class="is-active"><a href="#">{{ card.name }}</a></li>
      </ul>
    </nav>

    <div class="columns">
      <div class="column">
        <section class="hero is-light">
          <div class="hero-body">
            <div class="content">
              <div v-html="convert(card.desc)"></div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="edit" class="column">
        <EditItem></EditItem>
      </div>
    </div>

    <div class="level">
      <a v-bind:href="activeCard.url">go to Card</a><br>
      <button v-if="$store.getters.isLoggedIn" @click="toggleEdit()" class="button">edit Card</button>
    </div>
    latest activity: {{ card.dateLastActivity }}
  </div>
</template>

<script>
  import Vue from 'vue'
  import showdown from 'showdown'

  import EditItem from './EditItem.vue'

  const conv = new showdown.Converter({});

  export default {
    name: 'item',
    components: {
      EditItem
    },
    data(){
      return {
        edit: false,
        activeCard: this.$route.params.cardId
      }
    },
    computed: {
      card(){
        if (this.$store.getters['cards/cards'][this.activeCard]) {
          return this.$store.getters['cards/cards'][this.activeCard]['card']
        } else {
          return [{name: 'loading...'}]
        }
      }
    },
    methods: {
      convert(markdownText){
        return conv.makeHtml(markdownText) || '[no text]';
      },
      toggleEdit(){
        this.edit = !this.edit
      },
      setActiveList(listId){
          this.$store.dispatch('setActiveList', listId);
      },
      listName(listId){
          return this.$store.getters['lists/lists'][listId]['list']['name']
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.params.cardId) {
          this.activeCard = to.params.cardId;
          this.$store.dispatch('cards/fetch', this.activeCard)
        }
      }
    },
    mounted(){
      if (this.$route.params.cardId) {
        this.$store.dispatch('cards/fetch', this.$route.params.cardId)
      }
    },
  }
</script>
