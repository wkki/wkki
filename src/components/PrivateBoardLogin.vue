<template>
  <div>
    <div class="columns">
      <div class="column">
        <section class="hero is-light">
          <div class="hero-body">
            <div class="content">
              <p>this looks like a private board!</p>
              <LoginButton></LoginButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginButton from './LoginButton.vue'

  export default {
    name: 'app',

    components: {
      LoginButton
    },
  }
</script>
