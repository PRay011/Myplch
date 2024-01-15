import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/managerIndex',
      name: 'managerIndex',
      component: () => import('../views/managerIndex.vue')
    },
    {
      path: '/myplch',
      name: 'myplch',
      component: () => import('../views/myplch.vue')
    }
  ]
})

export default router
