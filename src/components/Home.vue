<template>
  <section class="hero is-medium is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          wkki
        </h1>
        <h2 class="subtitle">
          use your trello boards as wikis!
        </h2>
        <div class="columns">
          <div class="column"></div>
            <div class="column is-3">
              <LoginButton></LoginButton>
            </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  </section>

</template>


<script>
  import LoginButton from './LoginButton/LoginButton.vue'

  export default {
    components: {
      LoginButton
    }
  }
</script>
