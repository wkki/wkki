<template>
  <div>
    <NavBar :boardId="card['idBoard']"></NavBar>
    <section>
      <div class="container">

        <BreadCrumbs v-bind:card="card"></BreadCrumbs>

        <div class="columns">

          <div class="column">
            <CardContent :card="card"></CardContent>
          </div>

          <template v-if="edit">
            <EditItem class="column" :card="card"></EditItem>
          </template>
        </div>

        <div class="level">
          <a v-bind:href="card.url">go to Card</a><br>
          <button v-if="isEditable" @click="edit=!edit" class="button">edit Card</button>
        </div>
        last activity: {{ card.dateLastActivity }}
        <CardHistory :cardId="cardId"></CardHistory>
      </div>
    </section>
  </div>

</template>

<script>
  import Vue from 'vue'

  import EditItem from './CardComponents/EditItem.vue'
  import BreadCrumbs from './CardComponents/BreadCrumbs.vue'
  import CardContent from './CardComponents/CardContent.vue'
  import CardHistory from './CardHistory.vue'
  import NavBar from '../../../../NavBar/NavBar.vue'

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
      BreadCrumbs,
      CardContent,
      CardHistory,
      NavBar
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
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }
</style>
