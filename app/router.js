import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
  },
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home/Home.vue'),
  },
  {
    path: '/pfp',
    name: 'punk',
    component: () => import('./views/Punk/Punk.vue'),
  },
  {
    path: '/mvp',
    name: 'mvp',
    component: () => import('./views/MVP/MVP.vue'),
  },
  {
    path: '/pza-market',
    name: 'token',
    component: () => import('./views/Shop/Shop.vue'),
  },
  {
    path: '/oven',
    name: 'oven',
    component: () => import('./views/Admin/Admin.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('./views/PrivacyPolicy/Privacy.vue'),
  },
  {
    path: '/pza-dash',
    name: 'pza-dash',
    component: () => import('./views/PzaDash/PzaDash.vue'),
  },
  {
    path: '/pza-dash-rules',
    name: 'pza-dash-rules',
    component: () => import('./views/PzaDash/CompetitionRules.vue'),
  },
  {
    path: '*',
    component: () => import('./views/Home/Home.vue'),
  },
  ]
})

export default router