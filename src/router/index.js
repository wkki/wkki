import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

import SearchResults from '../components/Wiki/WikiComponents/SearchResults.vue'
import Settings from '../components/Settings.vue'
import Wiki from '../components/Wiki/Wiki.vue'
import MyBoards from '../components/MyBoards.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wiki',
      component: Wiki,
      beforeEnter(to, from, next) {
        if (!store.getters.isLoggedIn) {
          next()
        }
        else {
          next({path: '/boards', replace: true})
        }
      }
    },
    {
      path: '/boards',
      name: 'boards',
      component: MyBoards
    },
    {
      path: '/boards/:boardId',
      name: 'board',
      component: Wiki
    },
    {
      path: '/card/:cardId',
      name: 'card',
      component: Wiki
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResults
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/token=:token',
      name: 'login',
      component: Wiki,
      beforeEnter(to, from, next) {
        store.dispatch('logIn', to.params.token)
        next({name: 'boards'})
      }
    }
  ]
})
