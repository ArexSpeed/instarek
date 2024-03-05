<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import { sourceUrl } from '@/supabase';

const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();
const { chatId } = route.params;
const userWithChat = ref({});

const fetchData = async () => {

    try {
        const chatRef = doc(db, 'instachats', chatId);
        const docSnap = await getDoc(chatRef);
        if (docSnap.exists()) {
            userWithChat.value = docSnap.data().users.find((c) => c.id !== loggedUser.value.id);
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error getting document: ', error);
    }
}

const goBack = () => {
    router.go(-1);
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="fixed top-0 z-50 flex flex-row items-center justify-start w-full gap-2 p-2 bg-white">
        <button class="flex items-center justify-center" @click="goBack">
            <svg class="w-6 h-6" data-slot="icon" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
            </svg>
        </button>
        <RouterLink :to="`/profile/${userWithChat.id}`" class="flex items-center gap-4 p-2">
            <img class="object-cover w-10 h-10 rounded-full" :src="`${sourceUrl}${userWithChat.imageUrl}`" alt="" />
            <div class="font-medium text-black">
                <span class="text-lg">
                    {{ userWithChat.username }}
                </span>
            </div>
        </RouterLink>
    </div>
</template>