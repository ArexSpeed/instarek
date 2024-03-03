<script setup>
import { onMounted, ref } from 'vue'

import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';
import { useRoute } from 'vue-router';
import FollowersList from '@/components/FollowersList.vue';
import Layout from '@/components/Layout.vue';

const route = useRoute();
const { userId } = route.params;
const followers = ref([]);
const following = ref([]);
const currentTabView = ref('followers')


const fetchFollowers = async () => {
    const { data: followerData } = await supabase
        .from("followers_following")
        .select("*, follower_id(*)")
        .eq("following_id", userId)
    followers.value = followerData;
}

const fetchFollowing = async () => {
    const { data: followingData } = await supabase
        .from("followers_following")
        .select("*, following_id(*)")
        .eq("follower_id", userId)
    following.value = followingData;
}

const changeTabView = (value) => {
    currentTabView.value = value
}

onMounted(() => {
    fetchFollowers();
    fetchFollowing();
})
</script>

<template>
    <Layout>
        <TopNav title="Followers" />
        <div class="flex items-center justify-between w-full border-b border-b-gray-300">
            <div @click="changeTabView('followers')" class="flex justify-center w-1/2 p-3 text-sm cursor-pointer"
                :class="currentTabView === 'followers' && 'border-b border-b-gray-900'">
                {{ followers.length }} followers
            </div>
            <div @click="changeTabView('following')" class="flex justify-center w-1/2 p-3 text-sm cursor-pointer"
                :class="currentTabView === 'following' && 'border-b border-b-gray-900'">
                {{ following.length }} following
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
    </Layout>
</template>