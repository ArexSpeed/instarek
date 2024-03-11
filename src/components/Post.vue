<script setup>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import LikesSection from './LikesSection.vue';
import { RouterLink } from 'vue-router';
import { sourceUrl, supabase } from '@/supabase';
import moment from 'moment';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { toast } from 'vue3-toastify';

const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)
const { posts } = defineProps(['posts']);

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

const deletePost = async (id) => {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    toast("Your posts is deleted!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
}

</script>

<template>
    <div id="Posts" class="max-w-[600px] mx-auto mt-10" v-for="post in posts" :key="post.id">
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center px-2">
                <RouterLink :to="`/profile/${post.owner_id.id.toString()}`" class="flex items-center">
                    <img class="rounded-full w-9 h-9"
                        :src="`${post.owner_id.imageUrl ? `${sourceUrl}${post.owner_id.imageUrl}` : `https://images.pexels.com/photos/18771871/pexels-photo-18771871/free-photo-of-town-with-beach-on-amalfi-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}`">
                    <div class="ml-4 font-extrabold">{{ post.owner_id.username }}</div>
                </RouterLink>
                <div class="flex items-center text-gray-500">
                    <span class="-mt-5 ml-2 mr-1 text-[30px]">.</span>
                    <div>{{ moment(post.created_at).add(10, 'days').calendar() }}</div>
                </div>
            </div>

            <!-- <DotsHorizontal v-if="loggedUser.id === post.owner_id.id" @click="editPosts" class="cursor-pointer"
                :size="27" /> -->
            <Menu v-if="loggedUser.id === post.owner_id.id" as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton class="">

                        <DotsHorizontal class="cursor-pointer" :size="27" />
                    </MenuButton>
                </div>

                <transition enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0">
                    <MenuItems
                        class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                            <RouterLink :to="`/editpost/${post.id}`" :class="[
                                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]">

                                Edit
                            </RouterLink>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                            <button :class="[
                                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                            ]" @click="deletePost(post.id)">

                                Delete
                            </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
            <DotsHorizontal v-else class="cursor-pointer" :size="27" />
        </div>

        <div class="flex items-center w-full h-auto bg-black rounded-lg">
            <img class="w-full mx-auto" :src="`${sourceUrl}${post.url} `" alt="" />
        </div>

        <LikesSection :post="post" @like="updateLike($event)" />

    </div>

    <div class="pb-20"></div>
</template>