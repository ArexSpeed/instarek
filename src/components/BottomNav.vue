<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const path = router.currentRoute.value.path;
</script>
<template>
    <div class="fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200">
        <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            <RouterLink to="/" type="button"
                class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50"
                :class="path === '/' && 'border-t border-orange-300 text-orange-300'">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
            </RouterLink>
            <RouterLink to="/discover" type="button"
                class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50"
                :class="path === '/discover' && 'border-t border-orange-300 text-orange-300'">
                <svg class="w-5 h-5" data-slot="icon" fill="none" stroke-width="2.5" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                </svg>
            </RouterLink>
            <RouterLink to="/addpost" type="button"
                class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50"
                :class="path === '/addpost' && 'border-t border-orange-300 text-orange-300'">
                <svg class="w-5 h-5" data-slot="icon" fill="none" stroke-width="2.5" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
            </RouterLink>
            <RouterLink to="/chats" type="button"
                class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50"
                :class="path === '/chats' && 'border-t border-orange-300 text-orange-300'">
                <svg aria-label="Chats" class="w-5 h-5" fill="currentColor" height="24" role="img" viewBox="0 0 24 24"
                    width="24">
                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218"
                        y1="3" y2="10.083"></line>
                    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                        stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                </svg>
            </RouterLink>
            <RouterLink to="/profile" type="button"
                class="inline-flex flex-col items-center justify-center px-5 text-gray-600 hover:bg-gray-50"
                :class="path === '/profile' && 'border-t border-orange-300 text-orange-300'">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
            </RouterLink>

        </div>
    </div>
</template>