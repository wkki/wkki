import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

import SearchResults from '../components/BoardComponents/SearchResults.vue'
import Settings from '../components/Settings.vue'
import Board from '../components/Board.vue'

export default new Router({
  routes: [
    {
      path: '/board/:boardId',
      name: 'board',
      component: Board,
      children: [
        {
          path: 'card/:cardId',
          name: 'card'
        }
      ]
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
      beforeEnter(to, from, next){
        if (to.params.token) {
          console.log('sign in...');
          store.dispatch('logIn', to.params.token)
        }
        next({
          path: '/',
          query: {redirect: to.fullPath}
        })
      }
    }
  ]
})
