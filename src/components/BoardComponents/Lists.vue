<template>
  <div class="menu">
    <div class="columns">
      <div class="column">
        <aside class="menu">
          <p class="menu-label">
            Lists
          </p>
          <ul class="menu-list">
            <li v-for="(value, key) in lists"><a @click="fetchList(value['id'])">{{ value['name'] }}</a></li>
            <li>
              <div v-if="showInput" class="control">
                <input class="input " type="text" placeholder="new category" v-model="newCategory"
                       @keyup.enter="submitCategory">
              </div>
            </li>
            <li><a v-if="$store.getters.isLoggedIn" @click="triggerShowInput()">+</a></li>
          </ul>
        </aside>
      </div>
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
        newCategory: '',
      }
    },
    computed: {
      activeList(){
        return this.$store.getters.activeList
      },
      lists(){
        if (this.$store.getters['boards/boards'][this.boardId]) {
          return this.$store.getters['boards/boards'][this.boardId]['lists']
        } else {
          return [{name: 'loading...'}]
        }
      },
    },
    watch: {
      '$route' (to, from) {
        if (to.params.boardId) {
          this.boardId = to.params.boardId;
          this.$store.dispatch('boards/fetch', this.boardId)
        }
      }
    },
    mounted(){
      this.$store.dispatch('boards/fetch', this.boardId)
    },
    methods: {
      fetchList(listId){
        this.$store.dispatch('lists/fetch', listId);
        this.$store.dispatch('setActiveList', listId);
      },
      triggerShowInput(){
        this.showInput = true
      },
      submitCategory(){
        this.$store.dispatch('addCategory', this.newCategory);
        this.showInput = false;
        this.newCategory = '';
      }
    },
  }
</script>
