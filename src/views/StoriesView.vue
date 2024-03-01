<script setup>
import TopNav from '@/components/TopNav.vue';
import { onMounted, ref } from 'vue';
import { supabase } from '@/supabase';
import { useRoute } from 'vue-router';

const stories = ref([]);
const route = useRoute();
const { id } = route.params;
const loading = ref(false);

const fetchStories = async () => {
    loading.value = true;
    console.log(id);
    const { data: storiesData } = await supabase.from("stories").select().eq('id', id)
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
        <div class="flex items-center justify-center w-full h-full">
            <iframe v-if="!loading"
                :src="`https://bwglppilzhoxmasmvsra.supabase.co/storage/v1/object/public/stories/${stories[0]?.url}`"
                class="aspect-auto min-h-[550px] w-full"></iframe>
        </div>
    </GuestLayout>
</template>