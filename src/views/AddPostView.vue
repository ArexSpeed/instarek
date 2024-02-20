<script setup>
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';

import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import { getUserData, updateUserData } from "../services/users";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase";
// import { addUserData, selectedMyUserData } from "../context/slices/userSlice";
// import { useAppDispatch, useAppSelector } from "../context/store";

const image1Ref = ref(null);
const profileForm = ref(null);
const imagePreview = ref('');
const userData = ref({
    id: "",
    nickname: "",
    birth: "",
    description: "",
    firstName: "",
    imageSrc: "",
    lastName: "",
    location: "",
    profession: "",
    sex: "",
    shortDescription: "",
});
// const dispatch = useAppDispatch();
// const myUser = useAppSelector(selectedMyUserData);
// const navigate = useRouter().push;
// const openToast = ref(false);

// onMounted(async () => {
//   const data = await getUserData(myUser.user.nickname);
//   userData.value = data;
// });

const handleImagePreview = (e) => {
    //   const file = e.target.files[0];
    //   const url = URL.createObjectURL(file);
    //   imagePreview.value = url;
    //   uploadImage(file);
};

const uploadImage = (file) => {
    //   const imageRef = ref(storage, `images/${file.name}`);
    //   uploadBytes(imageRef, file).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       userData.value.imageSrc = url;
    //     });
    //   });
};

const onSubmit = async () => {
    //   const form = new FormData(profileForm.value);
    //   const payload = {
    //     id: myUser.user.id,
    //     nickname: userData.value.nickname,
    //     birth: form.get("birth")?.toString() || userData.value.birth,
    //     description: form.get("description")?.toString() || userData.value.description,
    //     firstName: form.get("firstName")?.toString() || userData.value.firstName,
    //     imageSrc: userData.value.imageSrc,
    //     lastName: form.get("lastName")?.toString() || userData.value.lastName,
    //     location: form.get("location")?.toString() || userData.value.location,
    //     profession: form.get("profession")?.toString() || userData.value.profession,
    //     sex: form.get("sex")?.toString() || userData.value.sex,
    //     shortDescription:
    //       form.get("shortDescription")?.toString() || userData.value.shortDescription,
    //   };

    //   try {
    //     await updateUserData(payload);
    //     dispatch(addUserData(payload));
    //     openToast.value = true;
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
};
</script>

<template>
    <Layout>
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
                        <img v-if="userData.imageSrc && imagePreview === ''" :src="userData.imageSrc" alt="Post"
                            class="object-fill w-full h-full" />
                        <img v-if="imagePreview" :src="imagePreview" alt="Post" class="object-contain w-full h-full" />
                    </div>
                    <!-- Other form fields -->
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <textarea id="description" name="description" rows="12"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-200 focus:border-red-200 "
                            placeholder="Description" defaultValue="Your description"></textarea>
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
