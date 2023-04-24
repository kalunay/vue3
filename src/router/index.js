import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from '@/pages/Main'
import Posts from '@/pages/Posts'
import PostIdPage from '@/components/PostIdPage'
import PostWithStore from '@/pages/PostWithStore'
import PostWithApi from '@/pages/PostWithApi'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/store',
    name: 'postsStore',
    component: PostWithStore
  },
  {
    path: '/api',
    name: 'apiPost',
    component: PostWithApi
  },
  {
    path: '/posts/:id',
    name: 'postsIdPage',
    component: PostIdPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
