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
        return "https://trello.com/1/authorize?name=wkki.github.io&expiration=never&scope=read,write&callback_method=fragment&key=" + process.env.WKKI_TRELLO_API_KEY + "&return_url=" + window.location.origin
      }
    }
  }
</script>
