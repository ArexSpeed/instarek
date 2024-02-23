<script setup>
import GuestLayout from '@/components/GuestLayout.vue';
import { reactive, ref } from 'vue';
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUsersStore();
const { errorMessage, loading, user } = storeToRefs(userStore);
const router = useRouter();

const userCredentials = reactive({
    email: "",
    password: "",
    username: "",
})

// const clearUserCredentialsInputs = () => {
//     userCredentials.email = "";
//     userCredentials.password = "";
//     userCredentials.username = "";
//     userStore.clearErrorMessage();
// }

const handleOk = async (e) => {
    console.log("login", userCredentials)
    e.preventDefault();
    // if (props.isLogin) {
    //     await userStore.handleLogin({
    //         password: userCredentials.password,
    //         email: userCredentials.email
    //     });
    // }
    // else {
    //     await userStore.handleSignup(userCredentials);
    // }
    await userStore.handleSignup(userCredentials);
    router.push('/')
    // if (user.value) {
    //     open.value = false;
    //     clearUserCredentialsInputs();
    // }
};

// const handleCancel = () => {
//     clearUserCredentialsInputs();
//     open.value = false;
// }

</script>

<template>
    <GuestLayout>
        <div class="flex flex-col items-center justify-center w-full h-screen p-2">
            <form class="w-full max-w-sm mx-auto " @submit="handleOk">
                <div class="mb-5">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your
                        username</label>
                    <input v-model="userCredentials.username" type="username" id="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="username" required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your
                        email</label>
                    <input v-model="userCredentials.email" type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="email" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your
                        password</label>
                    <input v-model="userCredentials.password" type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required />
                </div>

                <button type="submit"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
            </form>
        </div>
    </GuestLayout>
</template>