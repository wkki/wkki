// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store/index';


Vue.config.productionTip = false;


// todo: https://stackoverflow.com/questions/42579601/how-to-access-async-store-data-in-vue-router-for-usage-in-beforeenter-hook


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
