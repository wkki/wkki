<template>
  <a v-bind:href="authUrl" target="_blank" class="button is-info is-outlined">login with trello</a>
</template>

<script>
  export default {
    computed: {
      authUrl(){
        return "https://trello.com/1/authorize?expiration=never&scope=read,write&callback_method=fragment&name=trellowiki&key=" + this.$store.getters.apiKey + "&return_url=" + window.location.origin + window.location.pathname
      }
    }
  }
</script>
