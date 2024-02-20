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
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
    </RouterLink>
</template>