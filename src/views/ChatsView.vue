<script setup>
import ChatList from '@/components/ChatList.vue';
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
</script>

<template>
    <Layout>
        <TopNav title="Chats" />
        <ChatList />
    </Layout>
</template>
