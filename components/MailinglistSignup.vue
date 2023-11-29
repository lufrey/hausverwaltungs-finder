<template>
  <div
    class="mailing_list relative mb-6 mt-4 rounded-3xl border border-black bg-secondary p-5 pb-16"
  >
    <span
      class="mail-tile-header absolute -top-8 left-[-1px] rounded-t-3xl border border-black bg-secondary px-5 pt-2 text-xl"
      >Nichts verpassen</span
    >
    <p class="mt-2 max-w-xl text-l font-light text-[grey]">
      Lass dich ganz einfach benachrichtigen sobald neue Wohnungen mit deinen
      Kriterien verfügbar sind.
    </p>
    <div class="mt-2">
      <label for="email">Deine E-Mail</label>
      <input
        id="email"
        v-model="inputValue"
        type="text"
        required
        :placeholder="placeholder"
        class="shadow-ipx-1 not h-8 w-full rounded-md bg-white px-1 outline-none focus-within:border-b-2 focus-within:border-b-accent"
        :class="{
          '!border-b-2 !border-b-red-500':
            !isValidEmail && inputValue.length > 0,
        }"
      />
      <!-- <p v-if="!isValidEmail">Please enter a valid email address</p> -->
    </div>
    <TextFieldWithAutocomplete
      :suggestions="[
        'Friedrichshain',
        'Kreuzberg',
        'Neukölln',
        'Mitte',
        'Prenzlauer Berg',
        'Charlottenburg',
        'Schöneberg',
      ]"
      placeholder="Bezirk"
      class="mt-2"
    />
    <!-- Bezirk -->
    <Slider
      title="Zimmer (minimum)"
      output-title="Anzahl"
      :min-value="1"
      :max-value="10"
      class="mt-2"
    />
    <!-- Zimmer -->
    <Slider
      title="Monatsmiete (kalt, maximum)"
      output-title="Preis €"
      :min-value="100"
      :max-value="5000"
      class="mt-2"
    />
    <!-- Monatsmiete -->
    <FatButton
      class="absolute -bottom-5 -right-4 md:-right-10"
      :disabled="!isValidEmail"
    >
      Jetzt in den Verteiler
    </FatButton>
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
<style scoped>
.mail-tile-header::before {
  height: 3px;
  width: 100%;
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  background-color: #ecdaeb;
}
.mail-tile-header::after {
  height: 50%;
  width: 3px;
  content: "";
  position: absolute;
  bottom: -3px;
  right: -2px;
  background-color: #ecdaeb;
}
</style>
