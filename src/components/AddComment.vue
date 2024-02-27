<script setup>
import { useUsersStore } from '@/stores/users';
import { supabase } from '@/supabase';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { inject } from 'vue'

const postId = inject('postIdForComment')
const userStore = useUsersStore();
const { user } = storeToRefs(userStore);

const comment = ref('');

const addComment = async () => {
    await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.value.id,
        comment: comment.value
    })
    comment.value = "";
}
</script>

<template>
    <form class="flex flex-row items-center justify-center w-full py-2" @submit.prevent="addComment">
        <input type="text" name="comment" id="comment" placeholder="Your comment" v-model="comment"
            class="flex w-full h-8 pl-4 text-black bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-300 " />
        <button type="submit" class="flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6 text-gray-600" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5">
                </path>
            </svg>
        </button>
    </form>
</template>