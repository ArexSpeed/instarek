<script setup>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import LikesSection from './LikesSection.vue';
import { RouterLink } from 'vue-router';
import { sourceUrl } from '@/supabase';

const { posts } = defineProps(['posts']);
console.log(posts, "post")
/*
Post type:
type Post = {
    id: number,
    created_at: string,
    url: string,
    caption: string,
    owner_id: {
        created_at: string,
        id: number,
        email: string,
        username: string
        imageUrl: string
    }
}
*/

const updateLike = (object) => {
    let deleteLike = false
    let id = null

    for (let i = 0; i < object.post.likes.length; i++) {
        const like = object.post.likes[i];
        if (like.user_id === object.user.id && like.post_id === object.post.id) {
            deleteLike = true
            id = like.id
        }
    }

    if (deleteLike) {
        router.delete('/likes/' + id, {
            onFinish: () => updatedPost(object),
        })
    } else {
        router.post('/likes', {
            post_id: object.post.id,
        }, {
            onFinish: () => updatedPost(object),
        })
    }
}
</script>

<template>
    <div id="Posts" class="px-4 max-w-[600px] mx-auto mt-10" v-for="post in posts" :key="post.id">
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
                <RouterLink :to="`/profile/${post.owner_id.id.toString()}`" class="flex items-center">
                    <!-- <img class="rounded-full w-9 h-9" :src="`${sourceUrl}${post.owner_id.imageUrl}`"> -->
                    <img class="rounded-full w-9 h-9"
                        :src="`${post.owner_id.imageUrl ? `${sourceUrl}${post.owner_id.imageUrl}` : `https://images.pexels.com/photos/18771871/pexels-photo-18771871/free-photo-of-town-with-beach-on-amalfi-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}`">
                    <div class="ml-4 font-extrabold">{{ post.owner_id.username }}</div>
                </RouterLink>
                <div class="flex items-center text-gray-500">
                    <span class="-mt-5 ml-2 mr-1 text-[30px]">.</span>
                    <div>10.10.2022</div>
                </div>
            </div>

            <DotsHorizontal class="cursor-pointer" :size="27" />
        </div>

        <div class="flex items-center w-full h-auto bg-black rounded-lg">
            <img class="w-full mx-auto" :src="`${sourceUrl}${post.url} `" alt="" />
        </div>

        <LikesSection :post="post" @like="updateLike($event)" />

    </div>

    <div class="pb-20"></div>
</template>