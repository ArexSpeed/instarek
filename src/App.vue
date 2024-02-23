<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useUsersStore } from './stores/users';

const userStore = useUsersStore();

onMounted(() => {
  userStore.getUser();
})
</script>

<template>
  <RouterView />
</template>
