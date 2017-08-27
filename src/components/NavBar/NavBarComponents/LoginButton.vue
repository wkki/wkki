<template>
  <div>
    <a v-bind:href="authUrl" target="_blank"
       class=" navbar-item button is-info is-outlined">login with trello</a>
  </div>
</template>

<script>
  export default {
    computed: {
      authUrl(){
        return "https://trello.com/1/authorize?expiration=never&scope=read,write&callback_method=fragment&name=wkki&key=" + this.$store.getters.apiKey + "&return_url=" + window.location.origin
      }
    }
  }
</script>
