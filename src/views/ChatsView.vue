<script setup>
import { onMounted, ref } from 'vue';
import ChatList from '@/components/ChatList.vue';
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { db } from '@/firebase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
const chatsRef = ref([]);

async function getUserChats(userId) {
    const chats = [];
    const chatRef = collection(db, "instachats");
    const q = query(
        chatRef
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        chats.push({
            id: doc.id,
            users: doc.data().users,
        });
    });
    console.log("chats", chats);
    chatsRef.value = chats;
}

onMounted(() => {
    getUserChats();
})
</script>

<template>
    <Layout>
        <TopNav title="Chats" />
        <ChatList :chats="chatsRef" />
    </Layout>
</template>
