<template>
  <div class="container">
    <h3 class="title is-3">Boards</h3>
    <div v-if="boardsByOrga">
      <div v-for="key in Object.keys(boardsByOrga).sort().reverse()">

        <div class="columns">
          <div class="column">
            <h4 class="title is-4">{{ organizations(key) }}</h4>
          </div>
        </div>

        <div class="columns is-multiline is-10">
          <div class="column is-4" v-for="board in boardsByOrga[key]">
            <button v-if="board['name'] === 'wiki'" class="button is-primary is-fullwidth"
                    @click="$router.push({name: 'board', params: { boardId: board['id'] } })">{{ board['name'] }}
            </button>
            <button v-else="" class="button is-primary is-fullwidth is-outlined"
                    @click="$router.push({name: 'board', params: { boardId: board['id'] } })">{{ board['name'] }}
            </button>
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
          let boardsByOrga = {};
          let boards = this.$store.getters['members/members']['me']['boards'];
          boards.forEach(board => {
            let orgaId = board['idOrganization'] || 'me';
            if (!boardsByOrga[orgaId]) {
              boardsByOrga[orgaId] = [];
            }
            boardsByOrga[orgaId].push(board)
          });
          return boardsByOrga
        } else {
          return this.$store.dispatch('members/get', 'me');
        }
      },
      organizations(){
        return (id) => {
          if (this.$store.getters['organizations/organizations'][id]) {
            return this.$store.getters['organizations/organizations'][id]['organization']['displayName']
          } else {
            return id
          }
        }

      },
    },
    methods: {
      organizationName(id){
        console.log('id!', this.$store.getters['organizations/organizations'])
        if (this.$store.getters['organizations/organizations'][id]) {
          return this.$store.getters['organizations/organizations'][id]['name']
        } else {
          return id
        }
      }
    }
    /*methods: {
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
     }*/
  }
</script>
