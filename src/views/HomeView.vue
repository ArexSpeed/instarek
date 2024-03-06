<script setup>
import { ref, onMounted } from 'vue';
import Layout from '@/components/Layout.vue';
import Post from '@/components/Post.vue';
import StoriesSlider from '@/components/StoriesSlider.vue';
import AddStories from '@/components/AddStories.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';

const posts = ref([]);
const stories = ref([]);
const loading = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  const { data: postsData } = await supabase.from("posts").select('*, owner_id(*)').order('created_at', { ascending: false }); // retrieve with owner data as object
  // const { data: postsData } = await supabase.from("posts").select() - > retrieve just posts data (id, url, caption, owner_id)
  posts.value = postsData;
  loading.value = false;
  console.log(postsData);
}

const fetchStories = async () => {
  loading.value = true;
  const { data: storiesData } = await supabase.from("stories").select('*, owner_id(*)')
  stories.value = storiesData;
  loading.value = false;
}

onMounted(() => {
  fetchPosts();
  fetchStories();
})
</script>

<template>
  <Layout>
    <TopNav />
    <section class="flex py-4 pl-4 overflow-x-scroll border-b border-gray-100 gap-x-4 no-scrollbar">
      <AddStories />
      <StoriesSlider v-for="story in stories" :key="story.id" :storyId="story.id" :username="story.owner_id.username" />
    </section>

    <div v-if="!loading">
      <Post :posts="posts" />
    </div>

  </Layout>
</template>
