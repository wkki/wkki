<template>
  <div>
    <nav class="navbar">

      <div class="navbar-brand">
        <a class="navbar-item" href="http://wkki.github.io">
          <h3 class="title is-3">wkki</h3>
        </a>
        <div class="navbar-item is-hidden-desktop">
          <div class="navbar-item" v-if="!board['loading']">
            <h5 class="title is-5">{{ board['name'] }}</h5>
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

        <div class="navbar-item is-hidden-touch" v-if="!board['loading']">
          <h5 class="title is-5">{{ board['name'] }}</h5>
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
  import LoginButton from '../../LoginButton/LoginButton.vue'
  import LogoutButton from '../../LoginButton/LogoutButton.vue'

  export default {
    props: ['boardId'],
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
      },
      board() {
        let board = this.$store.getters['boards/get'](this.boardId);
        if (board['loading']) {
          this.$store.dispatch('boards/get', this.boardId);
        }
        return this.$store.getters['boards/get'](this.boardId)
      },
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
