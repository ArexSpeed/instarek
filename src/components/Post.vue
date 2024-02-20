<script setup>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import LikesSection from './LikesSection.vue';
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
    <div id="Posts" class="px-4 max-w-[600px] mx-auto mt-10" v-for="post in 10" :key="post">
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
                <a href="/" class="flex items-center">
                    <img class="rounded-full w-[38px] h-[38px]"
                        src="https://images.pexels.com/photos/18771871/pexels-photo-18771871/free-photo-of-town-with-beach-on-amalfi-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    <div class="ml-4 font-extrabold text-[15px]">Arex Speed</div>
                </a>
                <div class="flex items-center text-[15px] text-gray-500">
                    <span class="-mt-5 ml-2 mr-[5px] text-[35px]">.</span>
                    <div>10.10.2022</div>
                </div>
            </div>

            <DotsHorizontal class="cursor-pointer" :size="27" />
        </div>

        <div class="bg-black rounded-lg w-full min-h-[400px] flex items-center">
            <img class="w-full mx-auto"
                src="https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>

        <LikesSection :post="post" @like="updateLike($event)" />

        <div class="py-1 font-extrabold text-black">10 likes</div>
        <div>
            <span class="font-extrabold text-black">arexspeed</span>
            Description or this post
        </div>
        <button @click="currentPost = post; openOverlay = true" class="py-1 font-extrabold text-gray-500">
            View all 20 comments
        </button>
    </div>

    <div class="pb-20"></div>
</template>