<script setup>
import Layout from '@/components/Layout.vue';
import Post from '@/components/Post.vue';
import StoriesSlider from '@/components/StoriesSlider.vue';
import TopNav from '@/components/TopNav.vue';

</script>

<template>
  <main>
    <Layout>
      <TopNav />

      <StoriesSlider />
      <Post />
    </Layout>

  </main>
</template>
