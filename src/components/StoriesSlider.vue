<script setup>
import { ref, onMounted, toRefs } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

let wWidth = ref(window.innerWidth)
let currentSlide = ref(0)

// const props = defineProps({ posts, allUsers })
// const { posts, allUsers } = toRefs(props)

onMounted(() => {
    window.addEventListener('resize', () => {
        wWidth.value = window.innerWidth
    })
})

</script>
<template>
    <div class="mx-auto lg:pl-0 md:pl-[80px] pl-0">
        <Carousel v-model="currentSlide" class="max-w-[700px] mx-auto" :items-to-show="wWidth >= 768 ? 8 : 6"
            :items-to-scroll="4" :wrap-around="true" :transition="500" snapAlign="start">
            <Slide v-for="slide in 10" :key="slide">
                <a href="/" class="relative px-2 mx-auto mt-4 text-center cursor-pointer">
                    <div
                        class="absolute z-[-1] -top-[5px] left-[4px] rounded-full rotate-45 w-[64px] h-[64px] contrast-[1.3]  bg-gradient-to-t from-yellow-300 to-purple-500 via-red-500">
                        <div class="rounded-full ml-[3px] mt-[3px] w-[58px] h-[58px] bg-white" />
                    </div>
                    <img class="rounded-full w-[56px] h-[56px] -mt-[1px]" src="">
                    <div class="text-xs mt-2 w-[60px] truncate text-ellipsis overflow-hidden">Slide</div>
                </a>
            </Slide>
        </Carousel>
    </div>
</template>