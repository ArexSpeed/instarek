<script setup>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

const { posts } = defineProps(['posts']);

</script>

<template>
    <div class="px-4 max-w-[600px] mx-auto mt-10" v-for="picture in posts.pictures" :key="picture">
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
                <div class="flex items-center">
                    <img class="rounded-full w-9 h-9" :src="`${posts.pictures[0]}`">
                    <div class="ml-4 font-extrabold">{{ posts.name }}</div>
                </div>
            </div>

            <DotsHorizontal class="cursor-pointer" :size="27" />
        </div>

        <div class="flex items-center w-full h-auto bg-black rounded-lg">
            <img class="w-full mx-auto" :src="`${picture}`" alt="" />
        </div>

    </div>

    <div class="pb-20"></div>
</template>