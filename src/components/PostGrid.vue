<script setup>
import { ref, toRefs } from 'vue';
import { RouterLink } from 'vue-router';

import Heart from 'vue-material-design-icons/Heart.vue';
import Comment from 'vue-material-design-icons/Comment.vue';

defineEmits(['selectedPost'])
const props = defineProps(['postByUser']);
const { postByUser } = toRefs(props);

</script>

<template>
    <RouterLink to="/profile/posts" class="relative flex items-center justify-center cursor-pointer"
        @click="$emit('selectedPost', postByUser)">

        <img class="z-0 object-cover mx-auto cursor-pointer aspect-square"
            :src="`https://bwglppilzhoxmasmvsra.supabase.co/storage/v1/object/public/images/${postByUser.url}`" alt="">
    </RouterLink>
</template>