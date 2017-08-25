import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router);

import SearchResults from '../components/WikiComponents/SearchResults.vue'
import Settings from '../components/Settings.vue'
import Wiki from '../components/Wiki.vue'


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'wiki',
      component: Wiki,
      beforeEnter(to, from, next){
        console.log('before enter')
        let regexToken = /[&#]?token=([0-9a-f]{64})/;
        let regexedLocation = regexToken.exec(location.hash);
        if(regexedLocation && regexedLocation.length > 1) {
          let [_, token] = regexedLocation;
          console.log('token', token);
          if (token) {
            console.log('sign in...');
            store.dispatch('logIn', token)
          }
        }
        next()
      }
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
    }
  ]
})
