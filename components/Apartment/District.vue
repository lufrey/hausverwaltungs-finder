<script setup lang="ts">
import { zipCodeToDistrict } from "~/data/districts";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  zipCode: string;
}>();

const district = computed(() => zipCodeToDistrict[props.zipCode]);
</script>

<template>
  <NuxtLink
    v-if="district"
    :to="`/overview?districts=${district.slug}`"
    :title="`Bezirk für ${zipCode}`"
    v-bind="$attrs"
  >
    {{ zipCodeToDistrict[zipCode].name }}
  </NuxtLink>
  <span v-else>{{ zipCode }}</span>
</template>
