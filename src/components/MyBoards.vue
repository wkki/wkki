<template>
  <div v-if="$store.getters.isLoggedIn">

    <div :class="dropdownClass" @click="toggle()">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>your boards</span>
          <span class="icon is-small">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-for="board in myBoards" @click="showBoard(board.id)" class="dropdown-item">
            {{ board.name }}
          </a>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'search',
    data() {
      return {
        selected: 0,
        dropdownClass: 'dropdown',
      }
    },

    computed: {
      myBoards(){
        if (this.$store.getters['members/members']['me']) {
          this.selected = this.$store.getters['members/members']['me']['boards'][0]['id'];
          return this.$store.getters['members/members']['me']['boards']
        } else {
          this.$store.dispatch('members/get', 'me');
        }
      }
    },
    methods: {
      showBoard(id){
        this.$store.dispatch('boards/setCurrent', id);
        this.$store.dispatch('boards/get', id);
      },
      toggle(){
        if (this.dropdownClass === 'dropdown') {
          this.dropdownClass = 'dropdown is-active';
        } else {
          this.dropdownClass = 'dropdown';
        }
      }
    }
  }
</script>
