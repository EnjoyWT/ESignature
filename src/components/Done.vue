<template>
  <div class="">
    <img :src="doneimg" class="fixed w-screen inset-0" />

    <button
      @click.stop.prevent="toggleShowDone"
      class="w-[100px] h-[50px] fixed"
      :style="{
        top: elementTop + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
    ></button>
  </div>
</template>


 
<script setup>
import { ref, onBeforeMount } from "vue";
import doneimg from "../assets/es/04tanchuang/done.png";
const elementTop = ref(0);

const props = defineProps({
  isShowDone: Boolean,
});
const emit = defineEmits(["update:isShowDone"]);

const toggleShowDone = () => {
  emit("update:isShowDone", !props.isShowDone);
};
onBeforeMount(() => {
  // 获取屏幕高度
  const screenWidth = window.innerWidth;

  // 创建一个新的Image对象
  const img = new Image();
  // 设置Image对象的src为图片路径
  img.src = doneimg;
  // 监听Image对象的load事件
  img.onload = () => {
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    // 计算图片的高度
    const adaptedHeight = (originalHeight / originalWidth) * screenWidth;

    // 原图中距离顶部的位置
    const distanceFromTopOriginal = 950;
    // 计算适配后的位置
    elementTop.value =
      (distanceFromTopOriginal / originalHeight) * adaptedHeight;
  };
});

const handleClick = () => {
  isShowDone = false;
  console.log("handleClick====");
};
</script>


<style>
</style>