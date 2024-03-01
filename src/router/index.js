import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import AddPostView from '@/views/AddPostView.vue'
import AddStoriesView from '@/views/AddStoriesView.vue'
import VideoView from '@/views/VideoView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfilePostsView from '@/views/ProfilePostsView.vue'
import ProfileUserView from '@/views/ProfileUserView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import ChatsView from '@/views/ChatsView.vue'
import StoriesView from '@/views/StoriesView.vue'

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
      path: '/addstories',
      name: 'addstories',
      component: AddStoriesView
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
        { path: 'posts', component: ProfilePostsView },
        { path: ':userId', component: ProfileUserView },
        { path: 'edit', component: EditProfileView }
      ]
    },
    {
      path: '/chats',
      name: 'chats',
      component: ChatsView
    },
    {
      path: '/stories/:id',
      name: 'stories',
      component: StoriesView
    }
  ]
})

export default router
