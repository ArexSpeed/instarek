<script setup>
import { onMounted, reactive, ref } from 'vue'
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { useUsersStore } from '@/stores/users';
import { sourceUrl, supabase } from '@/supabase';

import Cog from 'vue-material-design-icons/Cog.vue';
import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import BookmarkOutline from 'vue-material-design-icons/BookmarkOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import PostGrid from '@/components/PostGrid.vue';
import { useRouter, RouterLink } from 'vue-router';
import FollowersList from '@/components/FollowersList.vue';

let data = reactive({ post: null })
const form = reactive({ file: null })
const userStore = useUsersStore();
const router = useRouter();
const posts = ref(null)
const loading = ref(false);
const currentUser = ref(null);
const userInfo = reactive({
    posts: 0,
    followers: 0,
    following: 0
})
const followers = ref([]);
const following = ref([]);
const isFollowing = ref(false);

const currentTabView = ref('posts')

const fetchData = async () => {
    console.log('fetching')
    loading.value = true;
    const { data: userData } = await supabase.from("users").select().eq('id', userStore.user.id).single();

    if (!userData) {
        loading.value = false;
        return currentUser.value = null
    }
    currentUser.value = userData
    fetchUserPosts();
    loading.value = false;
    console.log(currentUser.value)
}

const fetchUserPosts = async () => {
    loading.value = true;
    const { data: postsData } = await supabase.from("posts").select().eq('owner_id', userStore.user.id)

    posts.value = postsData;
    await fetchFollowersCount();
    await fetchFollowingCount();
    userInfo.followers = followers.value.length;
    userInfo.following = following.value.length;
    userInfo.posts = postsData.length;
    loading.value = false;
    console.log(postsData);
}

const getUploadedImage = (e) => {
    form.file = e.target.files[0]
    router.post(`/users`, form, {
        preserveState: false
    })
}

const fetchFollowersCount = async () => {
    const { data: followerData } = await supabase
        .from("followers_following")
        .select("*, follower_id(*)")
        .eq("following_id", userStore.user.id)
    followers.value = followerData;
    console.log("followers", followerData);
}

const fetchFollowingCount = async () => {
    const { data: followingData } = await supabase
        .from("followers_following")
        .select("*, following_id(*)")
        .eq("follower_id", userStore.user.id)
    following.value = followingData;
    console.log("following", followingData);


}

const changeTabView = (value) => {
    currentTabView.value = value
}

onMounted(() => {
    if (!userStore.user) {
        router.push('/login');
    }
    fetchData();
})

</script>

<template>
    <Layout>
        <TopNav :title="userStore?.user?.username" />
        <div class="pt-2 md:pt-6"></div>
        <div class="max-w-[880px] lg:ml-0 md:ml-[80px] md:pl-20 px-4 w-[100vw]">
            <div class="flex items-center w-full">

                <label for="fileUser">
                    <img v-if="currentUser?.imageUrl" class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer"
                        :src="`${sourceUrl}${currentUser?.imageUrl}`">

                    <img v-else class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer"
                        src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">

                </label>
                <!-- <input v-if="user.id === $page.props.auth.user.id" id="fileUser" class="hidden" type="file"
                        @input="getUploadedImage($event)"> -->
                <input id="fileUser" class="hidden" type="file" @input="getUploadedImage($event)">

                <div class="ml-6">
                    <div class="flex items-center mb-5 md:mb-8">
                        <div class="md:mr-6 mr-3 rounded-lg text-[22px]">{{ userStore?.user?.username }}</div>

                    </div>
                    <RouterLink to="/profile/edit"
                        class="mr-6 p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-extrabold bg-gray-100 hover:bg-gray-200">
                        Edit Profile
                    </RouterLink>
                </div>


            </div>
            <div class="py-2">
                {{ currentUser?.description }}
            </div>
        </div>

        <div>
            <div class="flex items-center justify-around w-full mt-8 border-t border-t-gray-300">
                <div @click="changeTabView('posts')" class="p-3 text-center cursor-pointer">
                    <div class="font-extrabold">{{ userInfo.posts }}</div>
                    <div class="text-gray-400 font-semibold -mt-1.5">posts</div>
                </div>
                <div @click="changeTabView('followers')" class="p-3 text-center cursor-pointer">
                    <div class="font-extrabold">{{ userInfo.followers }}</div>
                    <div class="text-gray-400 font-semibold -mt-1.5">followers</div>
                </div>
                <div @click="changeTabView('following')" class="p-3 text-center cursor-pointer">
                    <div class="font-extrabold">{{ userInfo.following }}</div>
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

        <div v-if="currentTabView === 'posts'" class="relative grid grid-cols-3 gap-1 md:gap-4">
            <div v-for="postByUser in posts" :key="postByUser.id">
                <PostGrid :postByUser="postByUser" @selectedPost="data.post = $event" />
            </div>
        </div>
        <div v-if="currentTabView === 'followers'" v-for="follower in followers" class="flex flex-col gap-2 p-2"
            key="follower.id">
            <FollowersList :follower="follower" />
        </div>
        <div v-if="currentTabView === 'following'" v-for="follower in following" class="flex flex-col gap-2 p-2"
            key="follower.id">
            <FollowersList :follower="follower" />
        </div>

        <div class="pb-20"></div>
    </Layout>
</template>
