<script setup>
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/vue'
import Comment from './Comment.vue';
import AddComment from './AddComment.vue';

const props = defineProps(['isOpen', 'postId', 'comments'])
const emit = defineEmits(['openDialog'])

function setIsOpen(value) {
    props.isOpen = value
    emit('openDialog', value)
}


</script>

<template>
    <Dialog :open="props.isOpen" @close="setIsOpen(false)" class="relative z-50">>
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 w-screen overflow-y-auto">
            <div class="flex items-end justify-center max-w-xl min-h-full m-auto">
                <DialogPanel class="w-full p-2 bg-white rounded">
                    <div class="flex flex-col items-center justify-center w-full">
                        <button @click="setIsOpen(false)"
                            class="w-[160px] h-[4px] rounded-full bg-gray-300 m-auto self-center outline-none" />
                        <DialogTitle class="py-2 text-center border-b border-gray-100">Comments</DialogTitle>
                    </div>
                    <AddComment />
                    <div v-for="comment in props.comments" class="flex flex-col w-full pt-2">
                        <Comment :comment="comment" />
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>