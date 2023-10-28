<template>
    <div class="apartment flex flex-row mt-4">
        <div class="image-container flex-grow shrink-0">
            <img :src="imageSrc" alt="Property Image" class=" rounded-lg">
        </div>
        <div class="apartment__info grow-[4] shrink">
            <h3 class=" text-l text-ellipsis whitespace-nowrap leading-5">{{ apt_name }}</h3>
            <h4 class=" text-s font-light text-ellipsis flex-nowrap">{{ apt_street }} - {{ apt_district }}</h4>
            <div class="tags-container flex flex-row gap-x-1">
                <span v-for="tag in tags" :key="tag" class="tag px-2.5 py-0.25 rounded-full bg-[#fff] text-accent text-xs">{{ tag }}</span>
            </div>
        </div>
        <div class="apartment__details text-right flex-grow shrink-0">
            <span class="price text-l font-light block leading-5">{{ price }} €</span>
            <span class="square-footage text-s font-light block">{{ squareFootage }} m²</span>
            <button class="favorites-button inline-block" @click="toggleFavorite" title="Zu Favoriten hinzufügen">
                <img :src="favorite ? '/heart_filled.svg' : '/heart_outline.svg'" class=" w-5">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PreviewlistApartment',
    props: {
        imageSrc: {
            type: String,
            required: true
        },
        apt_name: {
            type: String,
            required: true
        },
        apt_street: {
            type: String,
            required: true
        },
        apt_district: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        squareFootage: {
            type: String,
            required: true
        },
        favorite: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        toggleFavorite() {
            this.$emit('toggle-favorite');
        }
    }
}
</script>