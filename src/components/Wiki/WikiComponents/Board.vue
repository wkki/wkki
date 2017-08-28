<template>
  <div class="menu">
    <div class="columns">
      <div class="column">
        <aside class="menu">
          <ul class="menu-list">
            <li v-for="(value, key) in board.lists"><a @click="fetchList(value['id'])">{{ value['name'] }}</a></li>
            <li>
              <div v-if="showInput" class="control">
                <input class="input " type="text" placeholder="new list" v-model="newList"
                       @keyup.enter="addList">
              </div>
            </li>
            <li><a v-if="isEditable" @click="toggleShowInput()">+</a></li>
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
        newList: '',
      }
    },
    computed: {
      activeList(){
        return this.$store.getters['lists/current']
      },
      board(){
        if (this.$store.getters['boards/current']) {
          return this.$store.getters['boards/current']
        } else {
          return [{name: 'loading...'}]
        }
      },
      isEditable(){
        return this.$store.getters['boards/current']['isEditable']
      },
    },
    methods: {
      fetchList(listId){
        this.$store.dispatch('lists/setCurrent', listId);
        this.$store.dispatch('setShowList', true)
      },
      toggleShowInput(){
        this.showInput = !this.showInput;
      },
      addList(){
        this.$store.dispatch('boards/addList', {
          name: this.newList,
          boardId: this.$store.getters['boards/current']['board']['id']
        });
        this.showInput = false;
        this.newList = '';
      }
    },
    mounted(){
      if (this.$route.params.boardId) {
        this.$store.dispatch('boards/setCurrent',this.$route.params.boardId);
        this.$store.dispatch('setShowList', false);
        this.$store.dispatch('cards/setCurrent', false);
      }
    }
  }
</script>
