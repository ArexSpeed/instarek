<script setup>
import TopNav from '@/components/TopNav.vue';
import { onMounted, ref } from 'vue';
import { supabase, sourceUrl } from '@/supabase';
import { useRoute, RouterLink } from 'vue-router';

const stories = ref([]);
const route = useRoute();
const { id } = route.params;
const loading = ref(false);

const fetchStories = async () => {
    loading.value = true;
    const { data: storiesData } = await supabase.from("stories").select('*, owner_id(id, username, imageUrl)').eq('id', id)
    stories.value = storiesData;
    loading.value = false;
}

onMounted(() => {
    fetchStories();
})
</script>
<template>
    <GuestLayout>
        <TopNav />
        <div v-if="!loading" class="flex flex-col items-center justify-center w-full h-full">
            <RouterLink :to="`/profile/${stories[0]?.owner_id.id.toString()}`" class="flex items-center w-full p-2">
                <img class="rounded-full w-9 h-9"
                    :src="`${stories[0]?.owner_id.imageUrl ? `${sourceUrl}${stories[0]?.owner_id.imageUrl}` : `https://images.pexels.com/photos/18771871/pexels-photo-18771871/free-photo-of-town-with-beach-on-amalfi-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}`">
                <div class="ml-2 font-semibold">{{ stories[0]?.owner_id.username }}</div>
            </RouterLink>
            <iframe v-if="!loading"
                :src="`https://bwglppilzhoxmasmvsra.supabase.co/storage/v1/object/public/stories/${stories[0]?.url}`"
                class="aspect-auto min-h-[550px] w-full" allow='autoplay'></iframe>
        </div>
    </GuestLayout>
</template>