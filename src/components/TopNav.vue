<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users';
const { title } = defineProps({
    title: {
        type: String,
        default: 'Instarek' // Set the default value here
    }
});

const userStore = useUsersStore();
const router = useRouter();
const path = router.currentRoute.value.path;
console.log(path);

const goBack = () => {
    router.go(-1);
}

const onLogout = () => {
    userStore.handleLogout();
    router.push('/login')
}
</script>

<template>
    <div id="TopNavHome" class="block w-full p-4">
        <div class="flex items-center justify-between w-full h-full">
            <div class="flex flex-row gap-2">
                <button v-if="path !== '/'" class="flex items-center justify-center" @click="goBack">
                    <svg class="w-6 h-6" data-slot="icon" fill="none" stroke-width="2" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                    </svg>
                </button>
                <h1 class="text-2xl font-bold ">
                    {{ title }}
                </h1>
            </div>

            <div class="flex flex-row items-center gap-3">
                <svg v-if="path !== '/profile'" class="w-6 h-6" data-slot="icon" fill="none" stroke-width="1.5"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
                    </path>
                </svg>
                <button v-else class="bg-transparent outline-none" @click="onLogout">
                    <svg class="w-6 h-6" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9">
                        </path>
                    </svg>
                </button>
                <RouterLink to="/chats">
                    <svg aria-label="Chats" class="w-6 h-6" fill="none" height="24" role="img" viewBox="0 0 24 24"
                        width="24">
                        <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218"
                            y1="3" y2="10.083"></line>
                        <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                            stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                    </svg>
                </RouterLink>
            </div>
        </div>
    </div>
</template>