<script setup>
import BottomNav from './BottomNav.vue';
</script>
<template>
    <main class="w-full min-h-screen pb-24 overflow-x-hidden text-black h-fulll bg-white">
        <slot></slot>
        <BottomNav />
    </main>
</template>