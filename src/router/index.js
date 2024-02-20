import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import AddPostView from '@/views/AddPostView.vue'
import VideoView from '@/views/VideoView.vue'
import ProfileView from '@/views/ProfileView.vue'
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
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatsView
    }
  ]
})

export default router
