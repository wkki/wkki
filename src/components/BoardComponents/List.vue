<template>
  <div>
  <div class="column" v-if="activeList">
    <aside class="menu">
      <p class="menu-label">
        Cards
      </p>

      <ul class="menu-list">
        <li v-for="card in list"><a @click="goToCard(card.id)">{{card.name}}</a></li>
        <li>
          <div v-if="showInput" class="control">
            <input class="input " type="text" placeholder="new card" v-model="newCard"
                   @keyup.enter="submitCard">
          </div>
        </li>

        <li><a v-if="$store.getters.isLoggedIn" @click="triggerShowInput()">+</a></li>
      </ul>

    </aside>
  </div>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'menu',
    data(){
      return {
        showInput: false,
        newCategory: ''
      }
    },
    computed: {
      activeList(){
        return this.$store.getters.activeList
      },
      list(){
        if (this.$store.getters['lists/lists'][this.activeList]) {
          return this.$store.getters['lists/lists'][this.activeList]['cards']
        } else {
          return [{name: 'loading...'}]
        }
      }
    },
    methods: {
      triggerShowInput(){
        this.showInput = true
      },
      submitCategory(){
        this.$store.dispatch('addCategory', this.newCategory);
        this.showInput = false;
        this.newCategory = '';
      },
      goToCard(cardId){
        this.$store.dispatch('setActiveList', false);
        this.$router.push({name: 'card', params: {boardId: this.$route.params.boardId, cardId}})
      }
    },
  }
</script>
