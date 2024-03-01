<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { RouterLink } from 'vue-router';
const { storyId, username } = defineProps(['storyId', 'username'])

</script>
<template>
    <RouterLink :to="`/stories/${storyId}`" class="flex flex-col items-center flex-shrink-0 cursor-pointer">
        <div class="rounded-full p-0.5 flex flex-col space-y-1 from-purple-600 bg-gradient-to-bl via-red-600 to-yellow-500"
            @click="handleStoryBoxClick">
            <img :src="`https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`"
                alt="profile image" class="object-cover rounded-full w-[64px] h-[64px]" loading="lazy" draggable="false" />
        </div>

        <span class="text-sm text-gray-800">
            {{ username }}
        </span>
    </RouterLink>
</template>