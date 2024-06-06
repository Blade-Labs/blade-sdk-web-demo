import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Init',
    component: () => import('@/views/Init.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/Account.vue')
  },
  {
    path: '/tokens',
    name: 'Tokens',
    component: () => import('@/views/Tokens.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('@/views/Contract.vue')
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: () => import('@/views/Exchange.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
