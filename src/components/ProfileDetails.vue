<script setup>
import { RouterLink } from 'vue-router';
const { image, userId, username, fullName, position, description, posts, followers, following } = defineProps(['image', 'userId', 'username', 'position', 'description', 'posts', 'followers', 'following'])
</script>

<template>
    <div class="flex justify-between gap-4 px-4 py-2">
        <img class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer" :src="image">

        <div class="flex text-[15px] items-center space-x-4 flex-grow justify-center">
            <div class="leading-tight text-center">
                <h3 class="font-medium">{{ posts }}</h3>
                <span>Posts</span>
            </div>

            <RouterLink :to="`/follows/${userId}`" class="leading-tight text-center cursor-pointer">
                <h3 class="font-medium">{{ followers }}</h3>
                <span>Followers</span>
            </RouterLink>

            <RouterLink :to="`/follows/${userId}`" class="leading-tight text-center cursor-pointer">
                <h3 class="font-medium">{{ following }}</h3>
                <span>Following</span>
            </RouterLink>
        </div>
    </div>
    <section class="px-4 py-1">
        <h1 class="font-semibold">
            {{ username }}

        </h1>

        <span class="text-sm text-black/50">Web Developer</span>

        <p class="text-sm">
            {{ description }}
        </p>
    </section>
</template>