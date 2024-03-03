<script setup>
import { ref, toRefs } from 'vue';
import { RouterLink } from 'vue-router';
import { sourceUrl } from '@/supabase';

defineEmits(['selectedPost'])
const props = defineProps(['postByUser']);
const { postByUser } = toRefs(props);

</script>

<template>
    <RouterLink :to="`/profile/posts/${postByUser.owner_id}`"
        class="relative flex items-center justify-center cursor-pointer" @click="$emit('selectedPost', postByUser)">

        <img class="z-0 object-cover mx-auto cursor-pointer aspect-square" :src="`${sourceUrl}${postByUser.url}`" alt="">
    </RouterLink>
</template>