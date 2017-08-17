<template>
  <div class="item" v-if="Object.keys(activeCard).length !== 0">
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
        <div class="content">
          <div v-html="convert(activeCard.desc)"></div>
        </div>
      </div>
    </section>

    <a v-bind:href="activeCard.url">to Card</a><br>

    latest activity: {{ activeCard.dateLastActivity }}
  </div>
</template>

<script>
  import Vue from 'vue'
  import showdown from 'showdown'
  const classMap = {
    h1: 'title is-1',
    h2: 'title is-2',
    h3: 'title is-3',
    h4: 'title is-4',
    h5: 'title is-5',
    h6: 'title is-6',
    h7: 'title is-7',
    h8: 'title is-8',
    h9: 'title is-9',
  }

  const bindings = Object.keys(classMap)
    .map(key => ({
      type: 'output',
      regex: new RegExp(`<${key}>`, 'g'),
      replace: `<${key} class="${classMap[key]}">`
    }));

  const conv = new showdown.Converter({
    extensions: [...bindings],
    noHeaderId: true // important to add this, else regex match doesn't work
  });

  export default {
    name: 'item',
    computed: {
      activeCard() {
        if (this.$route.params.cardId) {
          return this.$store.getters.activeCard
        } else {
          return this.$store.getters.mainCard
        }
      },
      activeCardsList(){
        let listId = this.activeCard.idList;
        return this.$store.getters.lists[listId]
      }
    },
    methods: {
      convert(markdownText){
        return conv.makeHtml(markdownText);
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.params.cardId) {
          this.$store.dispatch('fetchCard', to.params.cardId)
        }
      }
    },
    mounted(){
      if (this.$route.params.cardId) {
        this.$store.dispatch('fetchCard', this.$route.params.cardId)
      }
    },
  }
</script>
