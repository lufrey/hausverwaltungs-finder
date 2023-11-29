<template>
  <div class="flex flex-row justify-between gap-4">
    <div class="grow">
      <label class="font-medium">{{ title }}</label>
      <input
        v-model="sliderValue"
        type="range"
        :min="minValue"
        :max="maxValue"
        class="slider h-6 w-full appearance-none rounded-full bg-white px-1 shadow-inner outline-none"
      />
    </div>
    <div>
      <label class="font-medium">{{ outputTitle }}</label>
      <div
        class="h-6 w-16 rounded-md bg-white text-center font-medium shadow-inner"
      >
        {{ sliderValue }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Slider",
  props: {
    title: {
      type: String,
      required: true,
    },
    outputTitle: {
      type: String,
      required: true,
    },
    minValue: {
      type: Number,
      required: false,
      default: 0,
    },
    maxValue: {
      type: Number,
      required: false,
      default: 10,
    },
    defaultValue: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  setup(props) {
    const sliderValue = ref(props.defaultValue);

    return {
      sliderValue,
      ...props,
    };
  },
  onMounted() {
    sliderValue.value = (minValue + maxValue) / 2;
  },
};
</script>

<style>
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
