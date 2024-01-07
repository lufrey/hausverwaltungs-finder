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
    v-bind="$attrs"
  >
    {{ zipCodeToDistrict[zipCode].name }}
  </NuxtLink>
  <div v-else>{{ zipCode }}</div>
</template>
