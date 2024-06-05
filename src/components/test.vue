<template>
  <div
    class="w-screen h-svh fixed inset-0"
    @touchstart.stop.prevent="onTouchStart"
    @touchend.stop.prevent="onTouchEnd"
  >
    <img :src="taskoneimg" class="w-screen h-svh fixed inset-0" />
  </div>
</template>



<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import taskoneimg from "../assets/es/03Area-02/02bg.jpg";

import { storeToRefs } from "pinia"; //引入pinia转换
import homeInfoStore from "../store/home";

const homeInfo = homeInfoStore();
const { taskone, tasktwo, email, count } = storeToRefs(homeInfo); // 响应式
const touches = ref([]);
// const count = ref(0);
defineProps({
  name: String,
});
const onTouchStart = (event) => {
  touches.value = Array.from(event.touches).map((touch) => ({
    x: touch.clientX,
    y: touch.clientY,
  }));
  console.log(touches.value.length);
  if (touches.value.length == 3) {
    console.log("=======onTouchStart======");
  }
  event.preventDefault();
  event.stopPropagation();
};
const onTouchEnd = (event) => {
  console.log("=======onTouchEnd== value==0==");
  console.log(touches.value.length);
  console.log("=======onTouchEnd== value==1==");

  if (touches.value.length == 3) {
    console.log("=======onTouchEnd======");
  }
  event.preventDefault();
  event.stopPropagation();
};

onMounted(() => {
  //   console.log("=======onMounted==0====");
  //   console.log(count.value);
  //   console.log("=======onMounted====1==");
  //   if (count.value == 0) {
  //     console.log("=======onMounted======");
  //     homeInfo.setCount(2);
  //     location.reload();
  //   }
});
</script>


<style>
</style>