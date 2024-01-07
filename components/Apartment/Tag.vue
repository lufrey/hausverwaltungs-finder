<script setup lang="ts">
import { tags } from "~/data/tags";
import type { Tags } from "~/data/tags";

defineProps<{
  tag: Tags[number];
}>();
</script>

<template>
  <NuxtLink
    :to="`/overview?tags=${tag}`"
    class="py-0.25 rounded-full px-2.5 text-xs"
  >
    {{ tags[tag] }}
  </NuxtLink>
</template>
