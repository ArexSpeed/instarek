<script setup>
const { ownMsg, msg } = defineProps(['ownMsg', 'msg'])
import { sourceUrl } from '@/supabase';
</script>

<template>
    <div v-if="ownMsg" class="flex flex-row-reverse items-end gap-2">
        <img class="object-cover w-8 h-8 rounded-full" :src="`${sourceUrl}${msg.userImage}`" alt="" />
        <div
            class="flex flex-col w-auto max-w-[320px] leading-1.5 p-2 border-gray-200 bg-blue-200 rounded-l-xl rounded-tr-xl ">
            <p class="p-1 text-sm font-normal text-blue-800">{{ msg.message }}</p>
        </div>
    </div>
    <div v-else class="flex items-start gap-2">
        <img class="object-cover w-8 h-8 rounded-full" :src="`${sourceUrl}${msg.userImage}`" alt="" />
        <div
            class="flex flex-col w-auto max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
            <p class="p-1 text-sm font-normal text-gray-800">{{ msg.message }}</p>
        </div>
    </div>
</template>