import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Item from '@/components/Item'
import CategoryOverview from '@/components/CategoryOverview'
import SearchResults from '@/components/SearchResults'
import Login from '@/components/Login'


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
      path: '/token=:token',
      name: 'login',
      component: Login
    }
  ]
})
