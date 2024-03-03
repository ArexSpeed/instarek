<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { useUsersStore } from '@/stores/users';
import { supabase, sourceUrl } from '@/supabase';

import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import PostGrid from '@/components/PostGrid.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import ProfileDetails from '@/components/ProfileDetails.vue';

const router = useRouter();
const route = useRoute();
let data = reactive({ post: null })
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore)
const { userId } = route.params;
const currentUser = ref(null)
const posts = ref(null);
const loading = ref(false);
const isFollowing = ref(false);
const userInfo = reactive({
    posts: null,
    followers: 0,
    following: 0
})

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
    userInfo.followers = await fetchFollowersCount();
    userInfo.following = await fetchFollowingCount();
    userInfo.posts = postsData.length;
    loading.value = false;
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
    const { count } = await supabase
        .from("followers_following")
        .select("*", { count: 'exact' })
        .eq("following_id", userId)
    return count;
}

const fetchFollowingCount = async () => {
    const { count } = await supabase
        .from("followers_following")
        .select("*", { count: 'exact' })
        .eq("follower_id", userId)
    return count;
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
            <ProfileDetails :image="`${sourceUrl}${currentUser?.imageUrl}`" :userId="currentUser?.id"
                :username="currentUser?.username" :description="currentUser?.description" :posts="userInfo.posts"
                :followers="userInfo.followers" :following="userInfo.following" />
            <div class="flex flex-row gap-2 px-4 pt-2 pb-4 space-y-1">
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



            <div class="flex items-center justify-between w-full border-t border-t-gray-300">
                <div class="flex justify-center w-1/3 p-3 border-t border-t-gray-900">
                    <Grid :size="28" fillColor="#0095F6" class="cursor-pointer" />
                </div>
                <div class="flex justify-center w-1/3 p-3">
                    <PlayBoxOutline :size="28" fillColor="#8E8E8E" class="cursor-pointer" />
                </div>
                <div class="flex justify-center w-1/3 p-3">
                    <AccountBoxOutline :size="28" fillColor="#8E8E8E" class="cursor-pointer" />
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
