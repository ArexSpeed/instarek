<script setup>
import TopNav from '@/components/TopNav.vue';
import DiscoverPost from '@/components/DiscoverPost.vue';
import { useRoute } from 'vue-router';
import discovers from "@/data/discover.json";

const route = useRoute();
const { id } = route.params;
const profilePosts = discovers.find(d => d.id === id);

</script>

<template>
    <Layout>
        <TopNav title="Discover" />

        <div>
            <DiscoverPost :posts="profilePosts" />
        </div>

    </Layout>
</template>