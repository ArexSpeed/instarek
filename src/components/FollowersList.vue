<script setup>
import { sourceUrl } from '@/supabase';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const { follower } = defineProps(['follower'])
const isFollowing = ref(false);

</script>
<template>
    <div class="flex flex-row items-center justify-between">
        <RouterLink to="/profile" class="flex flex-row items-center gap-2">
            <img class="object-cover w-10 h-10 rounded-full cursor-pointer"
                :src="`${sourceUrl}${follower?.follower_id.imageUrl}`">
            <span class="font-semibold">{{ follower.follower_id.username }}</span>
        </RouterLink>

        <button v-if="!isFollowing" @click="followUser" class="p-1 px-4 bg-blue-400 rounded-lg hover:bg-blue-300">
            Follow
        </button>
        <button v-else @click="unfollowUser" class="p-1 px-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            Followed
        </button>

    </div>
</template>