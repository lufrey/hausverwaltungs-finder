<template>
  <NuxtLink v-if="href" :to="href" class="absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary">
    {{ buttonText }}
    <img
      src="/arrow_right.svg"
      alt=""
      class="ml-4 inline"
    />
  </NuxtLink>
  <button v-else class="absolute -bottom-5 -right-10 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary" @click="$emit('submit', action)">
    {{ buttonText }}
    <img
      src="/arrow_right.svg"
      alt=""
      class="ml-4 inline"
    />
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: false,
      default: null,
    },
  },
  emits: ["submit"],
};
</script>

<style scoped>
a, button {
  box-shadow: #a555a2 -7px 7px;
}
</style>
