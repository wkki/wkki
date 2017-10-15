<template>
  <div>
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
        <EditItem :card="card"></EditItem>
      </div>

    </div>
    <div class="level">
      <a v-bind:href="card.url">go to Card</a><br>
      <button v-if="isEditable" @click="edit=!edit" class="button">edit Card</button>
    </div>
    last activity: {{ card.dateLastActivity }}
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
    data() {
      return {
        edit: false
      }
    },
    props: ['cardId'],
    components: {
      EditItem,
      BreadCrumbs
    },
    computed: {
      card() {
        let card = this.$store.getters['cards/get'](this.cardId);
        if (card['loading']) {
          this.$store.dispatch('cards/get', this.cardId);
        }
        return this.$store.getters['cards/get'](this.cardId)
      },
      isEditable() {
        if (this.card) {
          let id = this.card['idBoard'];
          return this.$store.getters['members/isMyBoard'](this.card.idBoard)
        } else {
          return false
        }
      }
    },
    methods: {
      convert(markdownText) {
        return conv.makeHtml(markdownText) || '[no text]';
      }
    }
  }
</script>
