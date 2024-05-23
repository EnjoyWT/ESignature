<template>
  <div class="multi-touch">
    <h1>多点识别示例</h1>
    <div class="touch-area" @touchstart="onTouchStart" @touchmove="onTouchMove">
      <div
        v-for="(touch, index) in touches"
        :key="index"
        class="touch-point"
        :style="{ left: `${touch.x}px`, top: `${touch.y}px` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiTouchExample",
  data() {
    return {
      touches: [],
    };
  },
  methods: {
    onTouchStart(event) {
      this.touches = Array.from(event.touches).map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));
    },
    onTouchMove(event) {
      this.touches = Array.from(event.touches).map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));
    },
  },
};
</script>

<style scoped>
.multi-touch {
  text-align: center;
}

.touch-area {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
}

.touch-point {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ff0000;
  border-radius: 50%;
}
</style>