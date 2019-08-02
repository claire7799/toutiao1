import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    }]
  }]
})

export default router
