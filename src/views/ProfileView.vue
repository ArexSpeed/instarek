<script setup>
import { onMounted, reactive, ref } from 'vue'
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { useUsersStore } from '@/stores/users';
import { sourceUrl, supabase } from '@/supabase';

import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import PostGrid from '@/components/PostGrid.vue';
import { useRouter, RouterLink } from 'vue-router';
import ProfileDetails from '@/components/ProfileDetails.vue';

let data = reactive({ post: null })
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
    userInfo.followers = await fetchFollowersCount();
    userInfo.following = await fetchFollowingCount();
    userInfo.posts = postsData.length;
    loading.value = false;
}

const fetchFollowersCount = async () => {
    const { count } = await supabase
        .from("followers_following")
        .select("*", { count: 'exact' })
        .eq("following_id", userStore.user.id)
    return count;
}

const fetchFollowingCount = async () => {
    const { count } = await supabase
        .from("followers_following")
        .select("*", { count: 'exact' })
        .eq("follower_id", userStore.user.id)
    return count;
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

        <ProfileDetails :image="`${sourceUrl}${currentUser?.imageUrl}`" :userId="userStore.user.id"
            :username="userStore.user.username" :description="currentUser?.description" :posts="userInfo.posts"
            :followers="userInfo.followers" :following="userInfo.following" />
        <div class="px-4 pt-2 pb-4 space-y-1">
            <RouterLink to="/profile/edit"
                class="w-full px-4 py-1 text-sm font-medium text-center transition-colors bg-gray-100 rounded-md outline-none hover:bg-black/10">
                Edit Profile
            </RouterLink>
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
            <div v-for="postByUser in posts" :key="postByUser.id">
                <PostGrid :postByUser="postByUser" @selectedPost="data.post = $event" />
            </div>
        </div>

        <div class="pb-20"></div>
    </Layout>
</template>
