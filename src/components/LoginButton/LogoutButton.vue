<template>
  <button class="button" @click="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
</template>

<script>
  export default {
    methods: {
      logOut(){
        this.$store.dispatch('logOut')
      }
    }
  }
</script>
