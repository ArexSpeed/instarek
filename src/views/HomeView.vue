<script setup>
import { ref, onMounted } from 'vue';
import Layout from '@/components/Layout.vue';
import Post from '@/components/Post.vue';
import StoriesSlider from '@/components/StoriesSlider.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';

const posts = ref([]);
const loading = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  const { data: postsData } = await supabase.from("posts").select('*, owner_id(*)') // retrieve with owner data as object
  // const { data: postsData } = await supabase.from("posts").select() - > retrieve just posts data (id, url, caption, owner_id)
  posts.value = postsData;
  loading.value = false;
  console.log(postsData);
}

onMounted(() => {
  fetchPosts();
})
</script>

<template>
  <Layout>
    <TopNav />

    <StoriesSlider />
    <div v-if="!loading">
      <Post :posts="posts" />
    </div>

  </Layout>
</template>
