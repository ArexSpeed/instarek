<script setup>
import { onMounted, ref } from 'vue';
import { useUsersStore } from '@/stores/users';

import ChatList from '@/components/ChatList.vue';
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { db } from '@/firebase';
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const chatsRef = ref([]);
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)

async function getUserChats() {
    const chats = [];
    const chatRef = collection(db, "instachats");

    const querySnapshot = await getDocs(chatRef);
    querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.users.some(user => user.id === loggedUser.value.id)) {
            chats.push({
                ...data,
                id: doc.id
            });
        }
    })
    chatsRef.value = chats;
}

onMounted(() => {
    if (!userStore.user) {
        return router.push('/login');
    }
    getUserChats();
})
</script>

<template>
    <Layout v-if="userStore.user">
        <TopNav title="Chats" />
        <ChatList :chats="chatsRef" />
    </Layout>
</template>
