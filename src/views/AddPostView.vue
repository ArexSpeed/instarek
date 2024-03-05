<script setup>
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/users';

import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUsersStore();
const { user } = storeToRefs(userStore);
const image1Ref = ref(null);
const profileForm = ref(null);
const imagePreview = ref('');
const file = ref(null);
const caption = ref("");

const handleImagePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    imagePreview.value = url;
    file.value = e.target.files[0];
};

const uploadImage = async () => {
    let filePath;
    const fileName = Math.floor(Math.random() * 10000000);
    const { data, error } = await supabase.storage.from("images").upload('public/' + fileName, file.value);

    if (error) {
        loading.value = false;
        return errorMessage.value = "unable to uplaod image"
    }

    filePath = data.path;
    await supabase.from("posts").insert({
        url: filePath,
        caption: caption.value,
        owner_id: user.value.id
    })
};

const onSubmit = async () => {
    await uploadImage();
    toast("Your image is added!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
    caption.value = "";
    imagePreview.value = "";
    file.value = null;
};

onMounted(() => {
    if (!userStore.user) {
        return router.push('/login');
    }
})
</script>

<template>
    <Layout v-if="userStore.user">
        <TopNav title="Add new post" />
        <div class="relative flex flex-col items-center justify-start w-full h-full gap-4 p-2 overflow-auto">
            <section class="flex items-center justify-center w-full">
                <form @submit.prevent="onSubmit" ref="profileForm"
                    class="flex flex-col items-center justify-center w-full gap-4 p-4">
                    <div class="relative flex w-full overflow-hidden bg-gray-300 rounded-md min-h-[300px] h-1/2">
                        <div class="absolute w-full h-full ">
                            <input ref="image1Ref" type="file" name="image1" id="image1" class="file-upload__input"
                                @change="handleImagePreview">
                            <button type="button" class="file-upload__button" @click="$refs.image1Ref.click()">
                                +
                            </button>
                        </div>
                        <img v-if="imagePreview" :src="imagePreview" alt="Post" class="object-contain w-full h-full" />
                    </div>
                    <!-- Other form fields -->
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <textarea id="caption" name="caption" rows="12"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-200 focus:border-red-200 "
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
