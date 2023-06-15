<script setup>
import { getAssetURL } from "@/utils/get-asset-url";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

const { getItems } = useDirectusItems();

const banners = await getItems({ collection: "banner_firefly" });
console.log(banners);
</script>

<template>
    <section class="banner" id="nserv">
        <swiper
            :modules="[SwiperAutoplay]"
            :autoplay="{
                delay: 5000,
            }"
            :loop="true"
        >
            <swiper-slide v-for="banner in banners" :key="banner.id">
                <div
                    class="banner-img--container"
                    :style="`background-image:url(${getAssetURL(
                        banner.banner
                    )})`"
                >
                    <!-- <img :src="getAssetURL(banner.banner)" alt="" /> -->
                </div>
            </swiper-slide>
        </swiper>
        <!-- :style="`background-image:url(${getAssetURL( banner.banner )})`" -->
        <!-- <vueper-slides
            :slide-ratio="1 / 2"
            fixed-height="350px"
            :arrows="false"
            :bullets="false"
            autoplay
        >
            <vueper-slide
                v-for="banner in banners"
                :key="banner.id"
                :image="getAssetURL(banner.banner)"
            />
        </vueper-slides> -->
    </section>
</template>

<style scoped lang="scss">
//

.banner {
    height: 30vh;
    padding-bottom: 2rem;
    .banner-img--container {
        cursor: grab;
        height: 30vh;
        background-position: 0%;
        background-size: cover;
        background-repeat: no-repeat;
        // img {
        //     width: 100%;
        //     height: 100%;
        //     object-fit: cover;
        //     object-position: left;
        // }
    }
}
@media screen and (min-width: 768px) {
    .banner {
        height: 50vh;
        .banner-img--container {
            height: 50vh;
        }
    }
}
</style>
