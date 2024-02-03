<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  v?: string;
}>();

// create srcset for img tag, with the formats and densities 1 and 2
const srcSet = computed(() => {
  const params = new URLSearchParams();
  props.v && params.set("v", props.v);

  if (!props.width || !props.height) return "";
  const newSrcSet: String[] = [];
  ["avif", "webp"].forEach((format) => {
    if (!props.width || !props.height) {
      newSrcSet.push(`${props.src}?${params.toString()}&f=${format}&dpr=1 1x`);
    } else {
      newSrcSet.push(
        `${props.src}?${params.toString()}&f=${format}&w=${props.width}&h=${props.height}&dpr=1 1x`,
        `${props.src}?${params.toString()}&f=${format}&w=${props.width * 2}&h=${props.height * 2}&dpr=2 2x`,
      );
    }
  });

  return newSrcSet.join(", ");
});
</script>
<template>
  <img
    :alt="props.alt"
    :srcset="srcSet"
    :src="props.src"
  />
</template>
