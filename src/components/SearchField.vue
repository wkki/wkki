<template>
    <div class="control">
<p class="control">
              <input class="input " type="text" placeholder="Search" v-model="searchString" @keyup.enter="submit">
            </p>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'search',
    data(){
      return {
        searchString: ""
      }
    },
    methods: {
      submit(){
        this.$router.push({path: '/search', query: {query: this.searchString}})
      }
    }
  }

</script>
