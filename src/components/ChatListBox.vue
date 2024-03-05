<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { sourceUrl } from '@/supabase';

const { chat } = defineProps(['chat']);

const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore);
const userWithChat = ref(null);

userWithChat.value = chat.users.find((user) => user.id !== loggedUser.value.id)

</script>

<template>
    <RouterLink :to="`/chats/${chat?.id}`" className="flex items-center gap-4 p-2 border-b border-gray-200">
        <img className="object-cover w-10 h-10 rounded-full" :src="`${sourceUrl}${userWithChat.imageUrl}`" alt="" />
        <div className="font-medium text-black">
            <div>
                {{ userWithChat.username }}
            </div>
            <div className="text-sm text-gray-500">{{ chat.lastMessage ? chat.lastMessage : "" }}</div>
        </div>
    </RouterLink>
</template>