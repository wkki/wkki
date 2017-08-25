<template>
  <div>
    <a v-if="!$store.getters.isLoggedIn" v-bind:href="authUrl" target="_blank" class="button is-info is-outlined">login with trello</a>
    <p v-else class="control">
      <button class="button" @click="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i>
</button>
    </p>
  </div>
</template>

<script>
  export default {
    computed: {
      authUrl(){
        return "https://trello.com/1/authorize?expiration=never&scope=read,write&callback_method=fragment&name=wkki&key=" + this.$store.getters.apiKey + "&return_url=" + window.location.origin
      }
    },
    methods: {
      logOut(){
        this.$store.dispatch('logOut')
      }
    }
  }
</script>
