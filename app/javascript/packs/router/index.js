import Vue from 'vue/dist/vue.esm'
import Router from 'vue-router'
Vue.use(Router)

import HomeIndex from '../components/home/index.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex
    }
  ]
})
