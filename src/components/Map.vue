<template>
  <div class="relative w-screen h-screen">
    <img :src="imageUrl" class="w-screen" />
    <img
      :src="btn1"
      :style="{
        top: distanceFromTopAdapted + 'px',
        width: imageWidthAdapted + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
      class="absolute"
      @click="taskone"
    />

    <img
      :src="btn1"
      :style="{
        top: distanceFromTopAdapted2 + 'px',
        width: imageWidthAdapted + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
      class="absolute"
      @click="tasktwo"
    />
  </div>
</template>
    
  <script setup>
import { ref, onBeforeMount } from "vue";
import imageUrl from "../assets/es/02Areas/Map.jpg";
import btn1 from "../assets/es/02Areas/StartBtn1.png";
import { useRouter } from "vue-router";
defineProps({
  name: String,
});
// 初始化距离顶部的位置为0
const distanceFromTopAdapted = ref(0);
const distanceFromTopAdapted2 = ref(0);

const distanceFromLeftAdapted = ref(0);
const imageWidthAdapted = ref(0);

const route = useRouter();
onBeforeMount(() => {
  // 获取屏幕宽度
  const screenWidth = window.innerWidth;
  // 创建一个新的Image对象
  const img = new Image();
  // 设置Image对象的src为图片路径
  img.src = imageUrl;
  // 监听Image对象的load事件
  img.onload = () => {
    // 获取图片原始宽度和高度
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    // 计算图片的高度
    const adaptedHeight = (originalHeight / originalWidth) * screenWidth;

    // 原图中距离顶部的位置
    const distanceFromTopOriginal = 1200;
    // 计算适配后的位置
    distanceFromTopAdapted.value =
      (distanceFromTopOriginal / originalHeight) * adaptedHeight;

    // 原图中距离顶部的位置
    const distanceFromTopOriginal1 = 2040;
    // 计算适配后的位置
    distanceFromTopAdapted2.value =
      (distanceFromTopOriginal1 / originalHeight) * adaptedHeight;
    // const distanceFromLeftOriginal = 85;
    // distanceFromLeftAdapted.value =
    //   (distanceFromLeftOriginal / originalWidth) * screenWidth;

    imageWidthAdapted.value = (252 / originalWidth) * screenWidth;
  };
});

const taskone = () => {
  route.push({ path: "/taskone" });
};
const tasktwo = () => {
  route.push({ path: "/tasktwo" });
};
</script>
  
  <style>
</style>
  