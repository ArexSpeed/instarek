<script setup>
import { onMounted, reactive, ref } from 'vue'
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { useUsersStore } from '@/stores/users';
import { supabase } from '@/supabase';

import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import BookmarkOutline from 'vue-material-design-icons/BookmarkOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import PostGrid from '@/components/PostGrid.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();
let data = reactive({ post: null })
const form = reactive({ file: null })
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)
const { userId } = route.params;
const currentUser = ref(null)
const posts = ref(null);
const loading = ref(false);

const fetchData = async () => {
    console.log('fetching')
    loading.value = true;
    const { data: userData } = await supabase.from("users").select().eq('id', userId).single();

    if (!userData) {
        loading.value = false;
        return currentUser.value = null
    }
    currentUser.value = userData
    fetchUserPosts();
    loading.value = false;
}

const fetchUserPosts = async () => {
    loading.value = true;
    const { data: postsData } = await supabase.from("posts").select().eq('owner_id', userId)

    posts.value = postsData;
    loading.value = false;
    console.log(postsData);
}

onMounted(() => {
    if (loggedUser.value.id.toString() === userId) {
        router.push('/profile');
    }
    fetchData();
})

</script>

<template>
    <Layout>
        <div v-if="!loading">
            <TopNav :title="currentUser?.username" />
            <div class="pt-2 md:pt-6"></div>
            <div class="max-w-[880px] lg:ml-0 md:ml-[80px] md:pl-20 px-4 w-[100vw]">
                <div class="flex items-center w-full">

                    <label for="fileUser">
                        <img class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer"
                            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    </label>

                    <div class="ml-6">
                        <div class="flex items-center mb-5 md:mb-8">
                            <div class="md:mr-6 mr-3 rounded-lg text-[22px]">{{ currentUser?.username }}</div>
                            <button
                                class="md:block hidden md:mr-6 p-1 px-4 rounded-lg text-[16px] font-extrabold bg-gray-100 hover:bg-gray-200">
                                Follow
                            </button>

                        </div>
                        <button
                            class="md:hidden mr-6 p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-extrabold bg-gray-100 hover:bg-gray-200">
                            Follow
                        </button>
                        <div class="hidden md:block">
                            <div class="flex items-center text-[18px]">
                                <div class="mr-6">
                                    <span class="font-extrabold">{{ posts?.length }}</span> posts
                                </div>
                                <div class="mr-6">
                                    <span class="font-extrabold">123</span> followers
                                </div>
                                <div class="mr-6">
                                    <span class="font-extrabold">456</span> following
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="py-2">
                    Description
                </div>
            </div>

            <div class="md:hidden">
                <div class="flex items-center justify-around w-full mt-8 border-t border-t-gray-300">
                    <div class="p-3 text-center">
                        <div class="font-extrabold">{{ posts?.length }}</div>
                        <div class="text-gray-400 font-semibold -mt-1.5">posts</div>
                    </div>
                    <div class="p-3 text-center">
                        <div class="font-extrabold">43</div>
                        <div class="text-gray-400 font-semibold -mt-1.5">followers</div>
                    </div>
                    <div class="p-3 text-center">
                        <div class="font-extrabold">55</div>
                        <div class="text-gray-400 font-semibold -mt-1.5">following</div>
                    </div>
                </div>

                <div class="flex items-center justify-between w-full border-t border-t-gray-300">
                    <div class="flex justify-center w-1/4 p-3 border-t border-t-gray-900">
                        <Grid :size="28" fillColor="#0095F6" class="cursor-pointer" />
                    </div>
                    <div class="flex justify-center w-1/4 p-3">
                        <PlayBoxOutline :size="28" fillColor="#8E8E8E" class="cursor-pointer" />
                    </div>
                    <div class="flex justify-center w-1/4 p-3">
                        <BookmarkOutline :size="28" fillColor="#8E8E8E" class="cursor-pointer" />
                    </div>
                    <div class="flex justify-center w-1/4 p-3">
                        <AccountBoxOutline :size="28" fillColor="#8E8E8E" class="cursor-pointer" />
                    </div>
                </div>
            </div>

            <div id="ContentSection" class="md:pr-1.5 lg:pl-0 md:pl-[90px]">
                <div class="hidden mt-10 border-t md:block border-t-gray-300">
                    <div
                        class="flex items-center justify-between max-w-[600px] mx-auto font-extrabold text-gray-400 text-[15px]">
                        <div class="p-[17px] w-1/4 flex justify-center items-center border-t border-t-gray-900">
                            <Grid :size="15" fillColor="#000000" class="cursor-pointer" />
                            <div class="ml-2 -mb-[1px] text-gray-900">POSTS</div>
                        </div>
                        <div class="p-[17px] w-1/4 flex justify-center items-center">
                            <PlayBoxOutline :size="15" fillColor="#8E8E8E" class="cursor-pointer" />
                            <div class="ml-2 -mb-[1px] text-gray-900">REELS</div>
                        </div>
                        <div class="p-[17px] w-1/4 flex justify-center items-center">
                            <BookmarkOutline :size="15" fillColor="#8E8E8E" class="cursor-pointer" />
                            <span class="ml-2 -mb-[1px]">SAVED</span>
                        </div>
                        <div class="p-[17px] w-1/4 flex justify-center items-center">
                            <AccountBoxOutline :size="15" fillColor="#8E8E8E" class="cursor-pointer" />
                            <span class="ml-2 -mb-[1px]">TAGGED</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative grid grid-cols-3 gap-1 md:gap-4">
                <div v-for="post in posts" :key="postByUser">
                    <PostGrid :postByUser="post" @selectedPost="data.post = $event" />
                </div>
            </div>

            <div class="pb-20"></div>
        </div>
        <div v-else>
            Loading...
        </div>
    </Layout>
</template>