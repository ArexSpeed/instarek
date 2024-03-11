import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import DiscoverProfileView from '@/views/DiscoverProfileView.vue'
import AddPostView from '@/views/AddPostView.vue'
import EditPostView from '@/views/EditPostView.vue'
import AddStoriesView from '@/views/AddStoriesView.vue'
import VideoView from '@/views/VideoView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ProfilePostsView from '@/views/ProfilePostsView.vue'
import ProfileUserView from '@/views/ProfileUserView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import FollowsView from '@/views/FollowsView.vue'
import ChatsView from '@/views/ChatsView.vue'
import ChatMessagesView from '@/views/ChatMessagesView.vue'
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
      children: [
        { path: '', name: 'discover', component: DiscoverView },
        { path: ':id', component: DiscoverProfileView }
      ]
    },
    {
      path: '/addpost',
      name: 'addpost',
      component: AddPostView
    },
    {
      path: '/editpost/:postId',
      name: 'editpost',
      component: EditPostView
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
        { path: 'posts/:userId', component: ProfilePostsView },
        { path: ':userId', component: ProfileUserView },
        { path: 'edit', component: EditProfileView }
      ]
    },
    {
      path: '/follows/:userId',
      name: 'follows',
      component: FollowsView
    },
    {
      path: '/chats',
      children: [
        { path: '', name: 'chats', component: ChatsView },
        { path: ':chatId', component: ChatMessagesView }
      ]
    },
    {
      path: '/stories/:id',
      name: 'stories',
      component: StoriesView
    }
  ]
})

export default router
