<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '@/components/Layout.vue';
import Post from '@/components/Post.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';

const posts = ref(null);
const route = useRoute();
const { userId } = route.params;
const loading = ref(false)

const fetchUserPosts = async () => {
    loading.value = true;
    const { data: postsData } = await supabase.from("posts").select('*, owner_id(*)').eq('owner_id', userId)
    posts.value = postsData;
    loading.value = false;
}

onMounted(() => {
    fetchUserPosts();
})
</script>

<template>
    <Layout>
        <TopNav />
        <div v-if="!loading">
            <Post :posts="posts" />
        </div>
        <div v-else>
            Loading...
        </div>
    </Layout>
</template>
