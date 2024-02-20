import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import AddPostView from '@/views/AddPostView.vue'
import VideoView from '@/views/VideoView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfilePostsView from '@/views/ProfilePostsView.vue'
import ChatsView from '@/views/ChatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/discover',
      name: 'discover',
      component: DiscoverView
    },
    {
      path: '/addpost',
      name: 'addpost',
      component: AddPostView
    },
    {
      path: '/video',
      name: 'video',
      component: VideoView
    },
    {
      path: '/profile',
      children: [
        { path: '', name: 'profile', component: ProfileView },
        { path: 'posts', component: ProfilePostsView }
      ]
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatsView
    }
  ]
})

export default router
