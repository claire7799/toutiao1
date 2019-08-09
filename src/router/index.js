import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Img from '@/views/image'
import Publish from '@/views/publish'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/image',
      name: 'image',
      component: Img
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    }
    ]
  }, {
    path: '*',
    name: '404',
    component: NotFound
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!store.getUser().token) return next('/login')
  next()
})
export default router
