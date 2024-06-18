<template>
  <div class="relative w-screen inhome">
    <!-- 背景图片 -->
    <img :src="imageUrl" class="w-screen h-svh" />
    <!-- 其他元素 -->

    <input
      type="text"
      class="rounded-full p-3 text-black absolute"
      :style="{
        top: elementTop + 'px',
        transform: 'translate(-50%, -50%)',
        width: elementW + 'px',
      }"
      placeholder=""
      v-model="email"
      @blur="onPlaceholderMobleBlur"
    />
    <img
      :src="imageUrl2"
      :style="{
        top: elementTop + 40 + 'px',
        width: elementW + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
      class="absolute"
      alt="Description"
      @click="sendEmail"
    />
  </div>
</template>
 
 
 
 <script setup>
import { onMounted, ref, onBeforeMount, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia"; //引入pinia转换
import { useRouter } from "vue-router";

import imageUrl from "../assets/es/01Input/InputBG.jpg";
import imageUrl2 from "../assets/es/01Input/SubmitBtn.png";

import homeInfoStore from "../store/home";

const homeInfo = homeInfoStore();

const { username, age, like, hobby } = storeToRefs(homeInfo); // 响应式

const router = useRouter();

const elementTop = ref(0);
const elementW = ref(0);

const email = ref("");
defineProps({
  name: String,
});

const handleTouchStart = (event) => {
  event.preventDefault();
};

const handleTouchMove = (event) => {
  if (!event.target.closest("input")) {
    event.preventDefault();
  }
  // 如果目标是输入框，不阻止默认行为
  if (event.target.tagName !== "INPUT") {
    event.preventDefault();
  }
};

const handleGestureStart = (event) => {
  event.preventDefault();
};
const screenHeight = ref(window.screen.height);
const count = ref(0);

// 定义 onPlaceholderMobleBlur 方法
const onPlaceholderMobleBlur = () => {
  // window.scroll(0, 0);
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 这个属性指定滚动行为为平滑滚动
  });
  // setTimeout(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, 100); // 延迟100毫秒以便浏览器完成渲染
};
// 禁止web端屏幕缩放和滑动，但允许点击输入框
onMounted(() => {
  // document.addEventListener("touchstart", handleTouchStart, { passive: false });
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("gesturestart", handleGestureStart, {
    passive: false,
  });
});
// 在组件卸载前移除事件监听器
onBeforeUnmount(() => {
  document.removeEventListener("touchmove", handleTouchMove);
  document.removeEventListener("gesturestart", handleGestureStart);
});

// 一个一个修改
const sendEmail = () => {
  // 正则表达式验证邮箱格式
  const emailRegex = /\S+@\S+\.\S+/;
  let em = email.value.trim();
  if (emailRegex.test(em)) {
    homeInfo.createUser(em, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        handleUserData(data);
      }
    });
  } else {
    alert("Please enter a valid email address!");
  }
};
const handleUserData = (data) => {
  let taskOne = data.taskOne;
  let taskTwo = data.taskTwo;

  // if (taskOne + taskTwo == 2) {
  //   //已经完成了
  // } else {
  router.push({ path: "/map" });
  // }
};

onBeforeMount(() => {
  // 获取屏幕高度
  const screenHeight = window.innerHeight;

  // 创建一个新的Image对象
  const img = new Image();
  // 设置Image对象的src为图片路径
  img.src = imageUrl;
  // 监听Image对象的load事件
  img.onload = () => {
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    // 假设元素在原始图片中距离顶部的距离为1306像素
    const distanceFromTopOriginal = 585;

    // 计算元素在屏幕中的相对位置
    elementTop.value =
      (distanceFromTopOriginal / originalHeight) * screenHeight;

    elementW.value = (556 / originalWidth) * screenWidth;
  };
});
</script>
 
 
 <style scoped>
/* 输入框样式 */
.input-box {
  background-image: url("../assets/es/01Input/Input.png");
  /* 其他输入框样式，比如宽度、高度、边框等 */
}

/* 按钮样式 */
.button {
  background-image: url("../assets/es/01Input/SubmitBtn.png");
  /* 其他按钮样式，比如宽度、高度、边框等 */
}

.inhome {
  height: 100vh; /* 默认使用100vh */
}

@supports (height: 100h-svh) {
  .inhome {
    height: 100h-svh; /* 如果浏览器支持h-svh，则使用100h-svh */
  }
}
</style>