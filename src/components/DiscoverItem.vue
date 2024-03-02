<script setup>
import { ref } from 'vue';
import discovers from "@/data/discover.json";
import { RouterLink } from "vue-router";
const { type } = defineProps(['type'])
const getRandomBooleanValue = Math.random() > 0.7;
const profileId = ref(Math.floor(Math.random() * 10));
const pictureId = ref(Math.floor(Math.random() * 6));

</script>

<template>
    <RouterLink :to="`/discover/${discovers[profileId].id}`" class="relative text-lg text-white">
        <img :src="discovers[profileId].pictures[pictureId]" alt="explore post image" class="object-cover" :class="{
            'h-full w-full': type === 'profile',
            'h-28 w-[7.15rem]': type === 'small',
            'h-[14.05rem] w-full': type === 'large',
        }" />

        <Component v-if="type !== 'large' && getRandomBooleanValue" class="absolute drop-shadow-md top-2 right-2" />


    </RouterLink>
</template>