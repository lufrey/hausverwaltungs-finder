<template>
  <div>
    <label for="email">Deine E-Mail</label>
    <input
      id="email"
      v-model="inputValue"
      type="text"
      required
      :placeholder="placeholder"
      class="shadow-ipx-1 not h-8 w-full rounded-md bg-white px-1 outline-none focus-within:border-b-2 focus-within:border-b-accent"
      :class="{
        '!border-b-2 !border-b-red-500': !isValidEmail && inputValue.length > 0,
      }"
    />
    <!-- <p v-if="!isValidEmail">Please enter a valid email address</p> -->
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "TextFieldWithRules",
  props: {
    placeholder: {
      type: String,
      default: "beispiel@email.com",
    },
  },
  setup() {
    const inputValue = ref("");
    const isValidEmail = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inputValue.value);
    });

    return {
      inputValue,
      isValidEmail,
    };
  },
};
</script>
