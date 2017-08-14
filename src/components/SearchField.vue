<template>
  <div class="field">
    <div class="control">
      <input class="input" type="text" placeholder="Search" v-model="searchString" @keyup.enter="submit">
    </div>
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
          this.$router.push('/search/' + this.searchString)
        }
    }
  }

</script>
