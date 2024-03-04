<script setup>
import { db } from '@/firebase';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const newMessage = ref('');
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore);
const route = useRoute();
const { chatId } = route.params;

const onSubmit = async (e) => {
    const payload = {
        userId: loggedUser.value.id,
        message: newMessage.value,
        userImage: loggedUser.value.imageUrl,
        timestamp: serverTimestamp(),
    };

    const roomRef = doc(db, "instachats", chatId);
    const messagesRef = collection(roomRef, "messages");

    try {
        await addDoc(messagesRef, payload);
        newMessage.value = ""
    } catch (error) {
        console.error("Error adding message: ", error);
    }
};
</script>

<template>
    <div class="flex flex-row items-center w-full max-w-[640px] h-16 px-2 bg-white">
        <div class="flex flex-grow w-full">
            <form @submit.prevent="onSubmit" class="relative w-full">
                <input v-model="newMessage" type="text" name="message" id="message" value="" placeholder="Send message"
                    className="flex w-full h-10 pl-4 text-black bg-gray-100 border rounded-xl focus:outline-none focus:border-blue-300" />
                <button
                    class="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </form>
        </div>
        <div class="pr-2 ml-4">
            <button type="submit" class="flex items-center justify-center bg-transparent outline-none" @click="">
                <svg class="w-6 h-6 text-gray-900" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>