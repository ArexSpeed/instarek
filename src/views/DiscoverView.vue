<script setup>
import DiscoverContainer from '@/components/DiscoverContainer.vue';
import DiscoverSearch from '@/components/DiscoverSearch.vue';
import Layout from '@/components/Layout.vue';
import TopNav from '@/components/TopNav.vue';

const posts = [
    { id: 1, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 7, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 8, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 9, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 10, image: 'https://images.pexels.com/photos/19039431/pexels-photo-19039431/free-photo-of-palm-and-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const videos = [
    { id: 11, image: 'https://images.pexels.com/photos/3779853/pexels-photo-3779853.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 12, image: 'https://images.pexels.com/photos/3779853/pexels-photo-3779853.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 13, image: 'https://images.pexels.com/photos/3779853/pexels-photo-3779853.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];
</script>

<template>
    <Layout>
        <!-- <TopNav title="Discover" /> -->
        <DiscoverSearch />
        <!-- <div class="container p-4 mx-auto">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="post in posts" :key="post.id"
                        class="relative overflow-hidden rounded-md aspect-w-1 aspect-h-1">
                        <img :src="post.image" alt="Post" class="object-cover w-full h-full">
                        <div
                            class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                            <button class="px-4 py-2 font-semibold text-black bg-white rounded-md">Like</button>
                        </div>
                    </div>
                </div>
            </div> -->
        <!-- <div class="grid grid-cols-3 gap-0">
            <div><img :src="posts[0].image" alt="Post" class="object-cover w-full h-full" /></div>
            <div><img :src="posts[1].image" alt="Post" class="object-cover w-full h-full" /></div>
            <div class="col-start-1 row-start-2"><img :src="posts[2].image" alt="Post" class="object-cover w-full h-full" />
            </div>
            <div class="col-start-2 row-start-2"><img :src="posts[3].image" alt="Post" class="object-cover w-full h-full" />
            </div>
            <div class="col-start-3 row-span-2 row-start-1"><img :src="posts[4].image" alt="Post"
                    class="object-cover w-full h-full" /></div>
            <div class="row-span-2 row-start-3"><img :src="posts[5].image" alt="Post" class="object-cover w-full h-full" />
            </div>
            <div class="row-start-3"><img :src="posts[6].image" alt="Post" class="object-cover w-full h-full" /></div>
            <div class="col-start-2 row-start-4"><img :src="posts[7].image" alt="Post" class="object-cover w-full h-full" />
            </div>
            <div class="col-start-3 row-start-3"><img :src="posts[8].image" alt="Post" class="object-cover w-full h-full" />
            </div>
            <div class="col-start-3 row-start-4"><img :src="posts[9].image" alt="Post" class="object-cover w-full h-full" />
            </div>

        </div> -->
        <!-- <div class="grid grid-cols-3 gap-0">
                <div>1</div>
                <div>2</div>
                <div class="col-start-1 row-start-2">5</div>
                <div class="col-start-2 row-start-2">6</div>
                <div class="col-start-3 row-span-2 row-start-1">9</div>
                <div class="row-span-2 row-start-3">10</div>
                <div class="row-start-3">11</div>
                <div class="col-start-2 row-start-4">12</div>
                <div class="col-start-3 row-start-3">13</div>
                <div class="col-start-3 row-start-4">14</div>

            </div> -->
        <DiscoverContainer />
    </Layout>
</template>
