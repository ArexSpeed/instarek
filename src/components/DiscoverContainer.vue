<script  setup>
import { ref } from "vue";
import DiscoverItem from "./DiscoverItem.vue";

const type = ref('explore')
const getItemCount = () => {
    if (type.value === "profile") return 3;
    else return 4;
};

</script>

<template>
    <!-- <div v-for="i in 6">
        <img :src="discovers[6].pictures[i - 1]" />
    </div> -->
    <div class="space-y-px" :class="{
        'pt-4': type === 'explore',
        'pt-1': type === 'profile',
    }">
        <div v-for="index in 6" :key="`wrapper-${index}`" class="flex gap-px" :class="{
            'overflow-x-hidden': type === 'explore',
            'flex-row-reverse': type === 'explore' && index % 2 === 0,
        }">
            <div class="grid gap-px" :class="{
                'grid-cols-2 flex-shrink-0 grid-rows-2 place-items-stretch':
                    type === 'explore',
                'grid-cols-3': type === 'profile',
            }">
                <DiscoverItem v-for="i in getItemCount()" :key="i" :type="type === 'profile' ? 'profile' : 'small'" />
            </div>

            <DiscoverItem v-if="type === 'explore'" type="large" :image="`https://picsum.photos/id/${index}/1000/1000`" />
        </div>
    </div>
</template>