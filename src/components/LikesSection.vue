<script setup>
import { supabase } from '@/supabase';
import { computed, onMounted, toRefs, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import CommentsDialog from './CommentsDialog.vue';
import { provide } from 'vue'

const props = defineProps(['post'])
const { post } = toRefs(props)

const emit = defineEmits(['like'])
provide('postIdForComment', post.value.id)

const userStore = useUsersStore();
const { user } = storeToRefs(userStore);
const isLiked = ref(false);
const likesCounter = ref(0);
const commentsCounter = ref(0);
const comments = ref([]);


const fetchLikes = async () => {
    const { data: likesData } = await supabase.from("likes").select().eq('post_id', post.value.id)
    if (user.value) {
        isLiked.value = likesData.find((like) => like.user_id === user.value.id)
    }
    likesCounter.value = likesData.length;
    //onsole.log("likes", likesData);
}

const fetchComments = async () => {
    //loading.value = true;
    const { data: commentsData } = await supabase.from("comments").select('*, user_id(id, username, imageUrl)').eq('post_id', post.value.id)
    commentsCounter.value = commentsData.length
    comments.value = commentsData;
    //loading.value = false;
}

const addLike = async () => {
    isLiked.value = true;
    likesCounter.value += 1;
    if (user.value) {
        await supabase.from("likes").insert({
            post_id: post.value.id,
            user_id: user.value.id
        })
    }
}

onMounted(() => {
    fetchLikes();
    fetchComments();
})

// Checking for realtime
// const subComments = supabase.channel('custom-all-channel')
//     .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'comments' },
//         (payload) => {
//             console.log('comment changed', payload);
//             //fetchComments();
//             console.log('comments bef', comments.value);
//             //comments.value = [...comments.value, payload.new]
//             // commentsCounter.value += 1;
//             console.log("comments new", comments.value);
//             info.value = payload.new.comment;
//             // ({ data: allChats } = await getAllChats());
//         }
//     ).subscribe();

// Comments dialog
const isOpen = ref(false)

function setIsOpen(value) {
    isOpen.value = value
}
</script>

<template>
    <div class="flex justify-between p-2">
        <div class="flex space-x-4">
            <svg v-if="isLiked" class="w-6 h-6 text-red-500" data-slot="icon" fill="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z">
                </path>
            </svg>
            <svg v-else @click="addLike" aria-label="Like" class="w-6 h-6 text-gray-600 cursor-pointer hover:fill-red-500"
                color="rgb(245, 245, 245)" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Like</title>
                <path
                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                </path>
            </svg>

            <svg @click="setIsOpen" aria-label="Comment" class="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-400"
                color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Comment</title>
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor"
                    stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            <svg aria-label="Share Post" class="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-400"
                color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Share Post</title>
                <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3"
                    y2="10.083"></line>
                <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
            </svg>
        </div>
        <div>
            <svg aria-label="Save" class="w-6 h-6 text-gray-600 cursor-pointer" color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Save</title>
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
            </svg>
        </div>
    </div>
    <div class="px-2">
        <div class="my-2 text-sm font-medium">{{ likesCounter }} likes</div>
        <div class="flex space-x-2 text-sm">
            <a href="" class="font-medium">{{ post.owner_id.username }}</a>
            <p>{{ post.caption }}</p>
        </div>
        <div class="py-2 text-sm text-gray-400 cursor-pointer" @click="setIsOpen(true)">View all {{ commentsCounter }}
            comments
        </div>
    </div>
    <CommentsDialog :isOpen="isOpen" @openDialog="setIsOpen" :postId="post.id" :comments="comments" />
</template>