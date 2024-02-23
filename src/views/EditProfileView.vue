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
const image1Ref = ref(null);
const profileForm = ref(null);
const imagePreview = ref('');
const file = ref(null);
const caption = ref("");
const router = useRouter();

const handleImagePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    imagePreview.value = url;
    file.value = e.target.files[0];
};

const uploadProfileImage = async () => {
    let filePath;
    const fileName = Math.floor(Math.random() * 10000000);
    const { data, error } = await supabase.storage.from("images").upload('public/' + fileName, file.value);

    if (error) {
        loading.value = false;
        return errorMessage.value = "unable to uplaod image"
    }

    filePath = data.path;
    await supabase.from("users").update({
        imageUrl: filePath,
        description: caption.value,
    })
        .eq('id', user.value.id)
};

const onSubmit = async () => {
    await uploadProfileImage();
    toast("Your profile is updated!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
    caption.value = "";
    imagePreview.value = "";
    file.value = null;
    router.push('/profile')
};
</script>

<template>
    <Layout>
        <TopNav title="Add new post" />
        <div class="relative flex flex-col items-center justify-start w-full h-full gap-4 p-2 overflow-auto">
            <section class="flex items-center justify-center w-full">
                <form @submit.prevent="onSubmit" ref="profileForm"
                    class="flex flex-col items-center justify-center w-full gap-4 p-4">
                    <div class="relative flex overflow-hidden bg-gray-300 w-[250px] h-[250px] rounded-full">
                        <div class="absolute w-full h-full ">
                            <input ref="image1Ref" type="file" name="image1" id="image1" class="file-upload__input"
                                @change="handleImagePreview">
                            <button type="button" class="file-upload__button" @click="$refs.image1Ref.click()">
                                +
                            </button>
                        </div>
                        <img v-if="imagePreview" :src="imagePreview" alt="Post"
                            class="object-cover w-[250px] h-[250px] rounded-full" />
                    </div>
                    <!-- Other form fields -->
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <textarea id="caption" name="caption" rows="12"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-200 focus:border-blue-200 "
                            placeholder="Description" v-model="caption"></textarea>
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
    width: 250px;
    height: 250px;
    border: none;
    border-radius: 100%;
    outline: none;
    margin: 4px;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
}
</style>
