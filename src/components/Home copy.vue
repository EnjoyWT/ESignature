<template>
  <!-- <div class="w-screen h-screen">

    <img
      :src="imageUrl"
      alt="Description"
      class="w-screen h-screen object-cover"
    />

  </div> -->

  <div class="relative w-screen h-screen">
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ 'background-image': 'url(' + imageUrl + ')' }"
    ></div>
    <div class="relative z-10 flex flex-col pt-[20rem] px-8">
      <input
        type="text"
        class="rounded-full p-3 text-black"
        placeholder=""
        v-model="email"
      />
      <img :src="imageUrl2" class="pt-6" alt="Description" @click="sendEmail" />
    </div>
  </div>
</template>
 
 
 
 <script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import { storeToRefs } from "pinia"; //引入pinia转换
import { useRouter } from "vue-router";

import imageUrl from "../assets/es/01Input/InputBG.jpg";
import imageUrl2 from "../assets/es/01Input/SubmitBtn.png";

import homeInfoStore from "../store/home";

const homeInfo = homeInfoStore();

const { username, age, like, hobby } = storeToRefs(homeInfo); // 响应式

const router = useRouter();

const email = ref(null);
defineProps({
  name: String,
});
// onBeforeMount(() => {
//   homeInfo.getRemoteUser("999");

// });

const handleTouchStart = (event) => {
  console.log("11");
  event.preventDefault();
};

const handleGestureStart = (event) => {
  event.preventDefault();
  console.log("000");
};

// 禁止web端屏幕缩放
onMounted(() => {
  // document.addEventListener("touchstart", handleTouchStart, { passive: false });
  // document.addEventListener("gesturestart", handleGestureStart, {
  //   passive: false,
  // });
});

// 一个一个修改
const sendEmail = () => {
  router.push({ path: "/map" });

  return;
  // 正则表达式验证邮箱格式
  const emailRegex = /\S+@\S+\.\S+/;
  const that = this;
  if (emailRegex.test(email.value)) {
    homeInfo.createUser(email.value, (err, data) => {
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

  if (taskOne + taskTwo == 2) {
    //已经完成了
  } else {
    router.push({ path: "/map" });
  }
};
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
</style>