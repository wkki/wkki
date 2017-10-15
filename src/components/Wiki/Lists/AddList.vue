<template>
  <div v-if="canCreateList">
    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" placeholder="new List" v-model="newList">
      </div>
      <div class="control">
        <button class="button" :disabled="!newList" @click="addList()">create</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddList',
    props: ['boardId'],
    data() {
      return {
        newList: ''
      }
    },
    computed: {
      canCreateList() {
        return this.$store.getters['members/isMyBoard'](this.boardId)
      }
    },
    methods: {
      addList() {
        this.$store.dispatch('lists/createList', {
          name: this.newList,
          boardId: this.boardId
        });
        this.newList = '';
      }
    }
  }
</script>
