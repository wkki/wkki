<template>
  <div>
    <nav class="navbar">

      <div class="navbar-brand">
        <a class="navbar-item" href="http://wkki.github.io">
          <h3 class="title is-3">wkki</h3>
        </a>
        <div class="navbar-item is-hidden-desktop">
          <div class="navbar-item" v-if="$store.getters['boards/current']">
            <h6 class="title is-5">{{ $store.getters['boards/current']['board']['name'] }}</h6>
          </div>
        </div>
        <div :class="navbarBurgerClass" data-target="nav-menu" @click="toggle()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-menu" :class="navbarMenuClass">
        <div class="navbar-start">
        </div>

        <div class="navbar-item is-hidden-touch" v-if="$store.getters['boards/current']">
          <h6 class="title is-5">{{ $store.getters['boards/current']['board']['name'] }}</h6>
        </div>

        <div v-if="$store.getters.isLoggedIn" class="navbar-end">
          <div class="navbar-item">
            <a @click="$router.push({name:'boards'})">my boards</a>
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
  </div>

</template>

<script>
  import LoginButton from './NavBarComponents/LoginButton.vue'
  import LogoutButton from './NavBarComponents/LogoutButton.vue'

  export default {
    data() {
      return {
        toggled: false
      }
    },
    computed: {
      navbarBurgerClass(){
        if (this.toggled) {
          return "navbar-burger is-active"
        } else {
          return "navbar-burger"
        }
      },
      navbarMenuClass(){
        if (this.toggled) {
          return "navbar-menu is-active"
        } else {
          return "navbar-menu"
        }
      }
    },
    methods: {
      toggle(){
        this.toggled = !this.toggled
      },
    },
    components: {
      LoginButton,
      LogoutButton
    }
  }

</script>
