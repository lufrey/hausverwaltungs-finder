<script setup lang="ts">
import { berlinDistricts } from "~/data/districts";
import { mailingListSignUpSchema } from "~/data/schemas";

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: "beispiel@email.com",
  },
);

const formState = ref({
  hasBeenSubmitted: false,
  values: {
    email: "",
    district: [],
    rooms: 3,
    price: 2000,
  },
  errors: computed(() => {
    const result = mailingListSignUpSchema.safeParse(formState.value.values);
    if (!formState.value.hasBeenSubmitted || result.success) {
      return {} satisfies Record<string, undefined>;
    }
    const errors = result.error?.errors.reduce(
      (acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      },
      {} as Record<string, string | undefined>,
    );

    return errors;
  }),
});
</script>

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
        v-model="formState.values.email"
        type="email"
        required
        :placeholder="placeholder"
        class="shadow-ipx-1 not h-8 w-full rounded-md bg-white px-1 outline-none focus-within:border-b-2 focus-within:border-b-accent"
        :class="{
          '!border-b-2 !border-b-red-500': formState.errors.email,
        }"
      />
      <p v-if="formState.errors.email">{{ formState.errors.email }}</p>
    </div>
    <TextFieldWithAutocomplete
      v-model="formState.values.district"
      :suggestions="
        Object.entries(berlinDistricts).map(([id, district]) => ({
          id,
          title: district.title,
        }))
      "
      placeholder="Bezirk"
      class="mt-2"
    />
    <!-- Bezirk -->
    <Slider
      v-model="formState.values.rooms"
      title="Zimmer (minimum)"
      output-title="Anzahl"
      :min-value="1"
      :max-value="10"
      :default-value="3"
      class="mt-2"
    />
    <!-- Zimmer -->
    <Slider
      v-model="formState.values.price"
      title="Monatsmiete (kalt, maximum)"
      output-title="Preis €"
      :min-value="100"
      :max-value="5000"
      class="mt-2"
    />
    <!-- Monatsmiete -->
    <!-- :disabled="!formState.values.email" -->

    <FatButton
      class="absolute -bottom-5 -right-4 md:-right-10"
      :action="
        async () => {
          formState.hasBeenSubmitted = true;
          if (Object.values(formState.errors).length > 0) return;

          await $client.mailingList.signUp.mutate(formState.values);
        }
      "
    >
      Jetzt in den Verteiler
    </FatButton>
  </div>
</template>

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
