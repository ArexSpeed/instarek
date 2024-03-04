<script setup>
import { ref, onMounted, watch, onUnmounted, watchEffect } from 'vue';
import ChatHeader from '@/components/ChatHeader.vue';
import GuestLayout from '@/components/GuestLayout.vue';
import ChatInput from '@/components/ChatInput.vue';
import ChatBubble from '@/components/ChatBubble.vue';
import { useUsersStore } from '@/stores/users';
import { useRoute } from 'vue-router';
import { db } from '@/firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const { chatId } = route.params;
const messages = ref([])
const userStore = useUsersStore();
const { user: loggedUser } = storeToRefs(userStore);

const messagesRef = collection(db, `instachats/${chatId}/messages`);

const orderedMessagesQuery = query(
    messagesRef,
    orderBy("timestamp", "asc")
);

const unsubscribe = onSnapshot(orderedMessagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("msg2", messages.value);
});

onUnmounted(unsubscribe);
const messagesEndRef = ref(null);
const scrollToBottom = () => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' });
};

watch(() => messages.value, scrollToBottom);

onMounted(() => {
    scrollToBottom();
});

</script>

<template>
    <GuestLayout>
        <ChatHeader />
        <div class="flex flex-col w-full h-full p-2">
            <div class="flex flex-col gap-2 pt-20 pb-32">
                <ChatBubble v-for="message in messages" :ownMsg="message.userId === loggedUser.id" :msg="message" />


                <div ref="messagesEndRef"></div>
            </div>
            <div class="fixed bottom-0 w-full">
                <ChatInput chatId={chatId} />
            </div>
        </div>
    </GuestLayout>
</template>