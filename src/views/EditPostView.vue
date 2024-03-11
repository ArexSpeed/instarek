<script setup>
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';
import { supabase, sourceUrl } from '@/supabase';
import { useUsersStore } from '@/stores/users';

import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { postId } = route.params
const userStore = useUsersStore();
const { user } = storeToRefs(userStore);
const image1Ref = ref(null);
const profileForm = ref(null);
const imagePreview = ref('');
const isImageNew = ref(false);
const imageBucketName = ref(null);
const file = ref(null);
const caption = ref("");

const handleImagePreview = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    imagePreview.value = url;
    isImageNew.value = true;
    file.value = e.target.files[0];
};

const fetchPost = async () => {
    //loading.value = true;
    console.log({ postId })
    const { data: postData } = await supabase.from("posts").select('*').eq("id", postId).single();
    console.log(postData);
    imagePreview.value = `${sourceUrl}${postData.url}`;
    imageBucketName.value = postData.imageUrl
    caption.value = postData.caption
    //posts.value = postsData;
    //loading.value = false;
}

const updatePost = async () => {
    let filePath;
    const fileName = Math.floor(Math.random() * 10000000);
    const { data, error } = await supabase.storage.from("images").upload('public/' + fileName, file.value);

    if (error) {
        loading.value = false;
        return errorMessage.value = "unable to uplaod image"
    }

    filePath = data.path;

    if (isImageNew.value) {
        await supabase.from("posts").update({
            url: filePath,
            caption: caption.value,

        })
            .eq('id', postId)
    } else {
        await supabase.from("posts").update({
            caption: caption.value,
        })
            .eq('id', postId)
    }
};

const onSubmit = async () => {
    await updatePost();
    toast("Your post is updated!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
    caption.value = "";
    imagePreview.value = "";
    isImageNew.value = false;
    imageBucketName.value = "";
    file.value = null;
};

const goBack = () => {
    router.go(-1);
}

const deletePost = async () => {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

    toast("Your posts is deleted!", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
    router.push("/")
}

onMounted(() => {
    if (!userStore.user) {
        return router.push('/login');
    }
    fetchPost();
})
</script>

<template>
    <Layout v-if="userStore.user">
        <TopNav title="Edit post" />
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
                        class="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                    <button type="button" @click="goBack"
                        class=" bg-transparent hover:bg-gray-100 ring-1 text-gray-800 ring-blue-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                    <button type="button" @click="deletePost"
                        class="text-white bg-red-400 hover:bg-red-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
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
