<template>
  <div>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input class="input" type="text" v-model="username" @keyup.enter="submit" placeholder="username">
      </p>

      <span class="select">
        <select v-model="selected" @change="update()">
          <option v-for="board in boards" :value="board.id">{{ board.name }}</option>
        </select>
      </span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'search',
    data(){
      return {
        username: "",
        selected: false
      }
    },
    computed: {
      boards(){
        if (this.$store.getters['members/members'][this.username]) {
          return this.$store.getters['members/members'][this.username]['boards']
        } else {
          return [{name: 'no user selected'}]
        }
      }
    },
    methods: {
      submit(){
        this.$store.dispatch('members/fetch', this.username)
      },
      update(){
        console.log(this.selected)
        if(this.selected) {
          this.$router.push({name: 'board', params: {boardId: this.selected}})
        }
      }
    }
  }

</script>
