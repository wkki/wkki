<template>
  <div class="menu">
    <div class="columns">
      <div class="column">
        <aside class="menu">
          <p class="menu-label">
            categories
          </p>
          <ul class="menu-list">
            <li v-for="(value, key) in lists"><a @click="fetchList(key)">{{ value['name'] }}</a></li>
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
    computed: {
      lists(){
        return this.$store.getters.lists
      }
    },
    methods: {
      fetchList(listId){
        this.$router.push({name: 'list', params: {listId: listId}});
      }
    },
  }
</script>
