import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Item from '@/components/Item'
import CategoryOverview from '@/components/CategoryOverview'




export default new Router({
  //mode: 'history',
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
      path: '/search/:searchParams',
      name: 'search',
      component: null
    }

  ]
})
