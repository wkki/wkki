<template>
  <div class="container">
    <h3 class="title is-3">Boards</h3>
    <div v-if="boardsByOrga">
      <div v-for="key in Object.keys(boardsByOrga).sort().reverse()">

        <div class="columns">
          <div class="column">
            <h4 class="title is-4">{{key}}</h4>
          </div>
        </div>

        <div class="columns is-multiline is-10">
          <div class="column is-4" v-for="board in boardsByOrga[key]">
            <div v-if="board['name'] === 'wiki'" class="button is-primary is-fullwidth">
              <p>{{ board['name'] }}</p>
            </div>
            <div v-else="" class="button is-outlined is-primary is-fullwidth">
              <p>{{ board['name'] }}</p>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div v-else>
      <h4 class="title is-4">loading...</h4>
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
        tileWidth: 3
      }
    },

    computed: {

      boardsByOrga(){
        if (this.$store.getters['members/members']['me']) {
          console.log('have the boards')
          let boardsByOrga = {};
          let boards = this.$store.getters['members/members']['me']['boards'];
          boards.forEach(board => {
            let orga = board['idOrganization'] || 'me';
            if (!boardsByOrga[orga]) {
              boardsByOrga[orga] = [];
            }
            boardsByOrga[orga].push(board)
          });
          return boardsByOrga
        } else {
          console.log('dispatching...')
          this.$store.dispatch('members/get', 'me');
          return false
        }
      },
      organizations(){
        return Object.keys(this.boardsByOrga)
      },
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
