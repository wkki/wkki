<template>
  <nav class="navbar">

    <div class="navbar-brand">
      <a class="navbar-item" href="http://wkki.github.io">
        <h3 class="title is-3">wkki</h3>
      </a>
      <div class="navbar-burger" data-target="nav-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="nav-menu" class="navbar-menu">
      <div class="navbar-start">
      </div>

      <div v-if="$store.getters.isLoggedIn" class="navbar-end">
        <div class="navbar-item">
          my boards
        </div>
        <div class="navbar-item">
          <LogoutButton></LogoutButton>
        </div>
      </div>
      <div v-else class="navbar-end">
        <div class="navbar-item">
          <LoginButton></LoginButton>
        </div>
      </div>
    </div>

  </nav>

</template>

<script>
  import LoginButton from './NavBarComponents/LoginButton.vue'
  import LogoutButton from './NavBarComponents/LogoutButton.vue'

  export default {
    components: {
      LoginButton,
      LogoutButton
    }
  }

</script>
