<script setup>
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router';

const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)

</script>
<template>
    <RouterLink :to="`${loggedUser ? '/addstories' : '/'}`" class="flex flex-col items-center flex-shrink-0 cursor-pointer">
        <div class="rounded-full p-0.5 flex flex-col space-y-1 relative" @click="handleStoryBoxClick">
            <img :src="`https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`"
                alt="profile image" class="object-cover rounded-full w-[64px] h-[64px]" loading="lazy" draggable="false" />
            <div
                class="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-blue-400 rounded-full">
                +
            </div>
        </div>

        <span class="text-sm text-gray-800">
            Your story
        </span>
    </RouterLink>
</template>