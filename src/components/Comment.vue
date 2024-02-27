<script setup>
import { sourceUrl } from '@/supabase';
const { comment } = defineProps(['comment']);
import moment from 'moment';
/*
type Comment = {
    id: number,
    created_at: string,
    post_id: number,
    comment: string,
    user_id: {
        id: number,
        username: string
        imageUrl: string
    }
}
*/
</script>

<template>
    <div class="flex items-start gap-2.5">
        <img class="w-8 h-8 rounded-full" :src="`${sourceUrl}${comment.user_id.imageUrl}`">
        <div class="flex flex-col w-full leading-1.5 px-2 border-gray-200">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900">{{ comment.user_id.username }}</span>
                <span class="text-sm font-normal text-gray-500">{{ moment(comment.created_at).startOf('day').fromNow()
                }}</span>
            </div>
            <p class="py-2 text-sm font-normal text-gray-900">{{ comment.comment }}</p>
            <span class="text-sm font-normal text-gray-500">Reply</span>
        </div>
    </div>
</template>