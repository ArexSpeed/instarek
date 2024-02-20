<script setup>
import GuestLayout from '@/components/GuestLayout.vue';

</script>

<template>
    <GuestLayout>
        <div class="flex flex-col items-center justify-center w-full h-screen p-2">
            <form class="w-full max-w-sm mx-auto ">
                <div class="mb-5">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your
                        username</label>
                    <input type="username" id="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="username" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your
                        password</label>
                    <input type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required />
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    </GuestLayout>
</template>