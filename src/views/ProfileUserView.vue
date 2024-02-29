<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { useUsersStore } from '@/stores/users';
import { supabase, sourceUrl } from '@/supabase';

import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import BookmarkOutline from 'vue-material-design-icons/BookmarkOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import PostGrid from '@/components/PostGrid.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import FollowersList from '@/components/FollowersList.vue';

const router = useRouter();
const route = useRoute();
let data = reactive({ post: null })
const form = reactive({ file: null })
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)
const { userId } = route.params;
const currentUser = ref(null)
const posts = ref(null);
const followers = ref([]);
const following = ref([]);
const loading = ref(false);
const isFollowing = ref(false);
const userInfo = reactive({
    posts: null,
    followers: 0,
    following: 0
})
const currentTabView = ref('posts')

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
    console.log(currentUser.value)
}

const fetchUserPosts = async () => {
    loading.value = true;
    const { data: postsData } = await supabase.from("posts").select().eq('owner_id', userId)

    posts.value = postsData;
    await fetchFollowersCount();
    await fetchFollowingCount();
    userInfo.followers = followers.value.length;
    userInfo.following = following.value.length;
    userInfo.posts = postsData.length;
    loading.value = false;
    console.log(postsData);
}

const fetchIsFollowing = async () => {
    if (loggedUser.value && (loggedUser.value.id !== userId)) {
        const { data } = await supabase
            .from("followers_following")
            .select()
            .eq("follower_id", loggedUser.value.id)
            .eq("following_id", userId)
            .single();
        if (data) isFollowing.value = true
        console.log(isFollowing.value);
    }
}

const followUser = async () => {
    isFollowing.value = true;
    userInfo.followers += 1;

    await supabase.from("followers_following").insert({
        follower_id: loggedUser.value.id, // user who is logged
        following_id: userId
    })
}

const unfollowUser = async () => {
    isFollowing.value = false
    userInfo.followers -= 1;
    await supabase.from("followers_following").delete().eq('follower_id', loggedUser.value.id).eq("following_id", userId)
}

const fetchFollowersCount = async () => {
    const { data: followerData } = await supabase
        .from("followers_following")
        .select("*, follower_id(*)")
        .eq("following_id", userId)
    console.log("followers_count", followerData)
    followers.value = followerData;
}

const fetchFollowingCount = async () => {
    const { data: followingData } = await supabase
        .from("followers_following")
        .select("*", 'following_id(*)')
        .eq("follower_id", userId)
    following.value = followingData;
}

const changeTabView = (value) => {
    currentTabView.value = value
}

onMounted(() => {
    if (loggedUser.value.id.toString() === userId) {
        router.push('/profile');
    }
    fetchData();
    fetchIsFollowing()

})

watch(loggedUser, () => {
    fetchIsFollowing()
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
                        <img v-if="currentUser?.imageUrl"
                            class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer"
                            :src="`${sourceUrl}${currentUser?.imageUrl}`">

                        <img v-else class="rounded-full object-cover w-[100px] h-[100px] cursor-pointer"
                            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
                    </label>

                    <div class="ml-6">
                        <div class="flex items-center mb-5 md:mb-8">
                            <div class="md:mr-6 mr-3 rounded-lg text-[22px]">{{ currentUser?.username }}</div>


                        </div>
                        <div class="flex flex-row gap-2">
                            <button v-if="!isFollowing" @click="followUser"
                                class="p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-bold bg-blue-400 hover:bg-blue-300">
                                Follow
                            </button>
                            <button v-else @click="unfollowUser"
                                class="p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-bold bg-gray-100 hover:bg-gray-200">
                                Followed
                            </button>
                            <button @click=""
                                class="p-1 px-4 max-w-[260px] w-full rounded-lg text-[17px] font-bold border border-blue-400 hover:bg-gray-100">
                                Message
                            </button>
                        </div>
                    </div>


                </div>
                <div class="py-2">
                    Description
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
                <div v-for="post in posts" :key="postByUser">
                    <PostGrid :postByUser="post" @selectedPost="data.post = $event" />
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
        </div>
        <div v-else>
            Loading...
        </div>
    </Layout>
</template>
