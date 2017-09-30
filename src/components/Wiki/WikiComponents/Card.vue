<template>
  <div class="item" v-if="$store.getters.showCard">

    <template v-if="card">
      <BreadCrumbs v-bind:card="card"></BreadCrumbs>
      <div class="columns">

        <div class="column">

          <div class="columns is-multiline">
            <div class="column">

              <div class="media-content">
                <div class="content">

                  <div v-html="convert(card.desc)"></div>

                </div>
              </div>
            </div>

            <div class="column" v-if="card.attachments.length > 0">

              <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">

                  <article class="tile is-child box" v-for="attachment in card.attachments">
                    <p>{{ attachment['name'] }}</p>
                    <figure v-if="attachment['previews'].length > 0" class="image is-4by3">

                      <a :href="attachment['url']"><img style="object-fit: contain;"
                                                        :src="attachment['previews'][2]['url']"></a>
                    </figure>

                    <a v-else="" :href="attachment['url']">download</a>
                  </article>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="edit" class="column">
          <EditItem></EditItem>
        </div>

      </div>
      <div class="level">
        <a v-bind:href="card.url">go to Card</a><br>
        <button v-if="isEditable" @click="toggleEdit()" class="button">edit Card</button>
      </div>

      last activity: {{ card.dateLastActivity }}
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
      card() {
        if (this.$store.getters['cards/current']) {
          return this.$store.getters['cards/current']['card']
        } else {
          console.log('no card yet...')
          return false
        }
      },
      isEditable() {
        if (this.$store.getters['boards/current']) {
          let id = this.$store.getters['boards/current']['board']['id'];
          return this.$store.getters['boards/isEditable'](id);
        } else {
          return false
        }
      },
      edit() {
        if (this.$store.getters['cards/current'] && this.isEditable) {
          return this.$store.getters['cards/current']['edit']
        } else {
          return false
        }
      }
    },
    methods: {
      convert(markdownText) {
        return conv.makeHtml(markdownText) || '[no text]';
      },
      toggleEdit() {
        if (this.$store.getters['cards/current'] && this.$store.getters['cards/current']['card']) {
          let card = this.$store.getters['cards/current'];
          card.edit = !(card.edit);
          this.$store.dispatch('cards/alter', card);
        }
      }
    },
    mounted() {
      if (this.$route.params.cardId) {
        let cardId = this.$route.params.cardId;
        this.$store.dispatch('cards/setCurrent', cardId);
        this.$store.dispatch('setShowCard', true)
      }
    },
  }
</script>
