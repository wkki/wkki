import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

import Item from '@/components/Item'
import CategoryOverview from '@/components/CategoryOverview'
import SearchResults from '@/components/SearchResults'
import Settings from '@/components/Settings'


export default new Router({
  routes: [
    {
      path: '/',
      name: 'item',
      component: Item
    },
    {
      path: '/card/:cardId',
      name: 'card',
      component: Item
    },
    {
      path: '/list/:listId',
      name: 'list',
      component: CategoryOverview
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
