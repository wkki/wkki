<template>
  <div>
    <div class="level-item">
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
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'search',
    data(){
      return {
        username: "",
        selected: 0,
        selectedDummy: {name: 'no user selected', id: 0},
        selectedMe: 0,
        searching: false
      }
    },
    computed: {
      boards(){
        if (this.$store.getters['members/current']) {
          this.selected = this.$store.getters['members/current']['boards'][0]['id'];
          return this.$store.getters['members/current']['boards']
        } else {
          return [this.selectedDummy]
        }
      },
      myBoards(){
        if (this.$store.getters['members/members']['me']) {
          this.selectedMe = this.$store.getters['members/members']['me']['boards'][0]['id'];
          return this.$store.getters['members/members']['me']['boards']
        } else {
          this.$store.dispatch('members/get', 'me');
        }
      }
    },
    methods: {
      submit(){
        this.$store.dispatch('members/setCurrent', this.username);
        this.$store.dispatch('members/get', this.username);
      },
      update(){
        if (this.selected) {
          this.$store.dispatch('boards/setCurrent', this.selected);
          this.$store.dispatch('boards/get', this.selected);

        }
      }
    }
  }

</script>
