<template>
  <div class="menu">
    <div class="columns">
      <div class="column">
        <aside class="menu">
          <p class="menu-label">
            Lists
          </p>
          <ul class="menu-list">
            <li v-for="(value, key) in lists"><a @click="fetchList(key)">{{ value['name'] }}</a></li>
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
        newCategory: ''
      }
    },
    computed: {
      lists(){
        return this.$store.getters.lists
      }
    },
    methods: {
      fetchList(listId){
        this.$router.push({name: 'list', params: {listId: listId}});
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
