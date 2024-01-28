<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    outputTitle: string;
    minValue: number;
    maxValue: number;
    defaultValue?: number;
    modelValue: number;
  }>(),
  {
    defaultValue: 0,
  },
);

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-row justify-between gap-4">
    <div class="grow">
      <label class="font-medium">{{ title }}</label>
      <input
        type="range"
        :min="minValue"
        :max="maxValue"
        class="slider h-6 w-full appearance-none rounded-full bg-white px-1 shadow-inner outline-none"
        :value="modelValue"
        @input="
          ($event: Event) => {
            const target = $event.target as HTMLInputElement;
            $emit('update:modelValue', target.valueAsNumber);
          }
        "
      />
    </div>
    <div>
      <label class="font-medium">{{ outputTitle }}</label>
      <input
        type="number"
        :max="maxValue"
        :min="minValue"
        class="block h-6 w-16 rounded-md bg-white text-center font-medium shadow-inner [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        :value="modelValue"
      />
    </div>
  </div>
</template>

<style scoped inline>
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #a555a2;
  cursor: pointer;
  border-radius: 999px;
}
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04aa6d;
  cursor: pointer;
}
</style>
