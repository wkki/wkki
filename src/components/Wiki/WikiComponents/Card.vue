<template>
  <div class="item" v-if="!$store.getters.showList">
    <template v-if="card">
      <BreadCrumbs v-bind:card="card"></BreadCrumbs>
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
        <a v-bind:href="card.url">go to Card</a><br>
        <button v-if="isEditable" @click="toggleEdit()" class="button">edit Card</button>
      </div>

      latest activity: {{ card.dateLastActivity }}
    </template>
    <template v-else="">
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import showdown from 'showdown'

  import EditItem from './CardComponents/EditItem.vue'
  import BreadCrumbs from './CardComponents/BreadCrumbs.vue'

  const conv = new showdown.Converter({});

  export default {
    name: 'item',
    components: {
      EditItem,
      BreadCrumbs
    },
    computed: {
      card(){
        if (this.$store.getters['cards/current']) {
          return this.$store.getters['cards/current']['card']
        } else {
            console.log('no card yet...')
          return false
        }
      },
      isEditable(){
        return this.$store.getters['boards/current']['isEditable']
      },
      edit(){
        if (this.$store.getters['cards/current'] && this.isEditable) {
          return this.$store.getters['cards/current']['edit']
        } else {
          return false
        }
      }
    },
    methods: {
      convert(markdownText){
        return conv.makeHtml(markdownText) || '[no text]';
      },
      toggleEdit(){
        if (this.$store.getters['cards/current'] && this.$store.getters['cards/current']['card']) {
          let card = this.$store.getters['cards/current'];
          card.edit = !(card.edit);
          this.$store.dispatch('cards/alter', card);
        }
      }
    },
    mounted(){
      if (this.$route.params.cardId) {
        let cardId = this.$route.params.cardId;
        this.$store.dispatch('cards/setCurrent', cardId);
      }
    },
  }
</script>
