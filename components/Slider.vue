<template>
  <div>
    <div class="slider-container">
      <label>{{ title }}</label>
      <input
        v-model="sliderValue"
        type="range"
        :min="minValue"
        :max="maxValue"
        class="slider"
      />
    </div>
    <div class="output-container">
      <label>{{ outputTitle }}</label>
      <div class="output">{{ sliderValue }}</div>
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
  },
  setup(props) {
    const sliderValue = ref(0);

    return {
      sliderValue,
      ...props,
    };
  },
};
</script>

<style>
.slider-container {
  display: flex;
  align-items: center;
}

.slider {
  margin-left: 10px;
}

.output-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.output {
  margin-left: 10px;
}
</style>
