<template>
  <transition-group
    tag="div"
    class="relative h-full w-full"
    name="fade"
    mode="out-in"
  >
    <img
      :key="currentImageIndex"
      :src="'/decoration/' + currentImage"
      alt="Image Carousel"
      class="absolute h-full w-full object-cover"
    />
  </transition-group>
</template>
<script>
import { ref, watch, onMounted } from "vue";
export default {
  props: {
    images: {
      type: Array,
      default: () => ["simone-hutsch-YsEOuVd7afg-unsplash.jpg"],
    },
    interval: {
      type: Number,
      default: 7000,
    }, // Time in milliseconds for each image transition
  },
  setup(props) {
    const currentImageIndex = ref(0);
    // Compute the current image source based on the currentImageIndex
    const currentImage = ref(props.images[currentImageIndex.value]);
    // Watch for changes in the currentImageIndex and update the currentImage
    watch(currentImageIndex, (newIndex) => {
      currentImage.value = props.images[newIndex];
    });
    // Automatically advance to the next image at the specified interval
    const autoAdvance = () => {
      currentImageIndex.value =
        (currentImageIndex.value + 1) % props.images.length;
    };
    // Start the automatic image transition when the component is mounted
    onMounted(() => {
      const interval = props.interval; // Default to 5 seconds
      setInterval(autoAdvance, interval);
    });
    return {
      currentImageIndex,
      currentImage,
    };
  },
};
</script>
<style>
.fade-move, /* apply transition to moving elements */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
