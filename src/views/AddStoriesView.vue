<script setup>
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/users';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';


const userStore = useUsersStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const image1Ref = ref(null);
const profileForm = ref(null);
const videoPreview = ref('');
const file = ref(null);
const caption = ref("");

const handleImagePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    videoPreview.value = url;
    file.value = e.target.files[0];
};

const uploadImage = async () => {
    let filePath;
    const fileName = Math.floor(Math.random() * 10000000);
    const { data, error } = await supabase.storage.from("stories").upload('public/' + fileName, file.value);

    if (error) {
        loading.value = false;
        return errorMessage.value = "unable to uplaod video"
    }

    filePath = data.path;
    await supabase.from("stories").insert({
        url: filePath,
        owner_id: user.value.id
    })
};

const onSubmit = async () => {
    await uploadImage();
    toast("Your video is added!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
    videoPreview.value = "";
    file.value = null;
    router.push("/")
};
</script>

<template>
    <Layout>
        <TopNav title="Add new story" />
        <div class="relative flex flex-col items-center justify-start w-full h-full gap-4 p-2 overflow-auto">
            <section class="flex items-center justify-center w-full">
                <form @submit.prevent="onSubmit" ref="profileForm"
                    class="flex flex-col items-center justify-center w-full gap-4 p-4">
                    <div class="relative flex w-full overflow-hidden bg-gray-300 rounded-md min-h-[450px] h-2/3">
                        <div class="absolute w-full h-full ">
                            <input ref="image1Ref" type="file" name="image1" id="image1" class="file-upload__input"
                                @change="handleImagePreview">
                            <button v-if="!videoPreview" type="button" class="file-upload__button"
                                @click="$refs.image1Ref.click()">
                                +
                            </button>
                        </div>
                        <iframe v-if="videoPreview" :src="videoPreview" alt="Stories"
                            class="flex justify-center aspect-video" />
                    </div>
                    <button type="submit"
                        class="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                </form>
            </section>
        </div>
    </Layout>
</template>

<style scoped>
.file-upload__input {
    display: none;
}

.file-upload__button {
    -webkit-appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    font-size: 40px;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    outline: none;
    margin: 4px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
}
</style>
