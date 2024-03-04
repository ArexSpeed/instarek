<script setup>
import ChatListBox from './ChatListBox.vue';

const { chats } = defineProps(['chats']);
// const chats = [
//     {
//         id: '1',
//     },
//     {
//         id: '2',
//     },
//     {
//         id: '3',
//     },
// ]
console.log('ch', chats.value);
</script>

<template>
    <div class="flex flex-col w-full gap-2 p-2 pb-16">
        <div v-for="chat in chats">

            <ChatListBox :chat="chat" />
        </div>
    </div>
</template>