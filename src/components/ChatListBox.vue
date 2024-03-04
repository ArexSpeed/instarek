<script setup>
import { RouterLink } from 'vue-router';
const { chat } = defineProps(['chat'])
</script>

<template>
    <RouterLink :to="`/chats/${chat?.id}`" className="flex items-center gap-4 p-2 border-b border-gray-200">
        <img className="object-cover w-10 h-10 rounded-full"
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="" />
        <div className="font-medium text-black">
            <div>
                Arex Speed
            </div>
            <div className="text-sm text-gray-500">This is last message</div>
        </div>
    </RouterLink>
</template>