import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

import Settings from '../components/Settings.vue'
import Card from '../components/Wiki/Lists/List/Cards/Card/Card.vue'
import Board from '../components/Wiki/Board.vue'
import MyBoards from '../components/MyBoards.vue'

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'wiki',
      component: MyBoards,
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
      component: MyBoards
    },
    {
      path: '/boards/:boardId',
      name: 'board',
      props: true,
      component: Board
    },
    {
      path: '/card/:cardId',
      name: 'card',
      props: true,
      component: Card
    },
    /*{
      path: '/search',
      name: 'search',
      component: SearchResults
    },*/
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/token=:token',
      name: 'login',
      component: Board,
      beforeEnter(to, from, next) {
        store.dispatch('logIn', to.params.token)
        next({name: 'boards'})
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn && !store.getters['members/members']['me']) {
    store.dispatch('members/get', 'me');
  }
  next();
})

export default router
