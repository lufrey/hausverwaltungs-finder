<template>
  <button
    class="absolute -right-10 -bottom-5 rounded-xl border border-primary bg-white px-6 py-4 text-m font-medium text-primary"
    @click="handleClick"
  >
    {{ buttonText }}
    <img src="/arrow_right.svg" alt="" class="inline ml-4">
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
  },
  emits: ["submit"],
  methods: {
    handleClick() {
      if (this.action === "submit") {
        // Submit form
        this.$emit("submit");
      } else {
        // Navigate to new page
        this.$router.push("/" + this.action);
      }
    },
  },
};
</script>

<style scoped>
button {
  box-shadow: #a555a2 -7px 7px;
}
</style>
