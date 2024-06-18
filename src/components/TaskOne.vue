<template>
  <div>
    <img :src="showImgSrc" class="w-screen h-svh fixed inset-0" />

    <!-- <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img :src="showImgSrc" />
    </div> -->
    <div
      class="touch-area fixed left-0 right-0 top-1/4 h-1/2 select-none"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @contextmenu.prevent="disableContextMenu"
    >
      <!-- <div
        v-for="(touch, index) in touches"
        :key="index"
        class="touch-point"
        :style="{ left: `${touch.x}px`, top: `${touch.y}px` }"
      ></div> -->
      <!-- <div v-if="isShowDone">
        <img :src="taskoneimg" class="w-screen h-svh fixed inset-0" />
      </div> -->
    </div>
    <Done
      v-if="isShowDone"
      :isShowDone="isShowDone"
      @update:isShowDone="isShowDone = $event"
    />

    <img
      v-if="isShowBack"
      :src="back"
      @click="backclicked"
      class="w-[124px] h-[45px] fixed"
      :style="{
        top: elementTop + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
    />

    <button
      @click.stop.prevent="backclicked"
      class="w-[130px] h-[60px] fixed"
      :style="{
        top: elementTop + 'px',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
    ></button>
  </div>
</template>



<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";

import taskoneun from "../assets/es/03Area-01/taskoneun.jpg";
import taskonedone from "../assets/es/03Area-01/taskonedone.jpg";

// import taskoneimg from "../assets/es/03Area-02/02bg.jpg";
// import icon1 from "../assets/es/03Area-01/icon1.png";
// import noicon1 from "../assets/es/03Area-01/noicon1.png";
import back from "../assets/es/03Area-01/back.png";
import { useRouter } from "vue-router";

import Done from "./Done.vue";

import { storeToRefs } from "pinia"; //引入pinia转换
import homeInfoStore from "../store/home";

const homeInfo = homeInfoStore();
const { taskone, tasktwo, email } = storeToRefs(homeInfo); // 响应式

const touches = ref([]);

const showImgSrc = ref(taskoneun);

const isShowDone = ref(false);
const isShowBack = ref(true);

const router = useRouter();
const elementTop = ref(0);

defineProps({
  name: String,
});
onBeforeMount(() => {
  window.scroll(0, 0);
  //判断是否已经盖过章
  handleUserData();

  // 获取屏幕高度
  const screenWidth = window.innerWidth;

  // 创建一个新的Image对象
  const img = new Image();
  // 设置Image对象的src为图片路径
  img.src = taskonedone;
  // 监听Image对象的load事件
  img.onload = () => {
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    // 计算图片的高度
    const adaptedHeight = (originalHeight / originalWidth) * screenWidth;

    // 原图中距离顶部的位置
    const distanceFromTopOriginal = 1100;
    // 计算适配后的位置
    elementTop.value =
      (distanceFromTopOriginal / originalHeight) * adaptedHeight;
  };
});

const handleUserData = () => {
  let one = taskone.value;
  let two = tasktwo.value;

  if (one + two == 2) {
    console.log("两个任务都完成了");
    isShowBack.value = false;
    showImgSrc.value = taskonedone;

    setTimeout(() => {
      isShowDone.value = true;
    }, 1250);
  } else if (one == 1) {
    console.log("任务1 已经完成");
    isShowBack.value = false;
    showImgSrc.value = taskonedone;
  }
};

const onTouchStart = (event) => {
  // touches.value = Array.from(event.touches).map((touch) => ({
  //   x: touch.clientX,
  //   y: touch.clientY * (3 / 4),
  // }));
  // console.log(touches.value);
  // if (touches.value.length == 3) {
  //   handleTouchEnd();
  // }
  // event.preventDefault();
  // event.stopPropagation();
  const touchArea = document.querySelector(".touch-area");
  const touchAreaRect = touchArea.getBoundingClientRect();

  touches.value = Array.from(event.targetTouches).map((touch) => ({
    x: touch.clientX - touchAreaRect.left,
    y: touch.clientY - touchAreaRect.top,
  }));

  if (touches.value.length == 2) {
    handleTouchEnd();
    console.log("任务1 已经完成");
  }
};
const handleTouchEnd = (event) => {
  //检测两个点的距离 ,满足条件后

  let user = {
    id: "", // 用户标识符
    email: "",
    taskone: 0,
    tasktwo: 0,
    createAt: "",
    updateAt: "",
    hEmail: "",
  };

  // 假设 homeInfo 是另一个对象，包含了你要用来赋值的数据
  user.id = homeInfo.id;
  user.email = homeInfo.email;
  user.createAt = homeInfo.createAt;
  user.updateAt = homeInfo.updateAt;
  user.hEmail = homeInfo.hEmail;
  user.taskone = 1; //修改对应的值
  user.tasktwo = homeInfo.tasktwo; //修改对应的值

  if (user.id == "" || user.email == "") {
    return;
  }
  console.log(homeInfo);
  // 假设 homeInfo 也有其他属性，你也可以继续为 user 对象的其他属性分配值

  homeInfo.updateUser(user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      handleUserData(data);
    }
  });
};
const backclicked = () => {
  router.push({ path: "/map" });
};

const disableContextMenu = (event) => {
  event.preventDefault();
};

onMounted(() => {
  document.addEventListener("contextmenu", disableContextMenu);
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", disableContextMenu);
});
</script>


<style scoped>
.touch-area {
  width: 100%;
  height: 50vh;
  /* background-color: #f0f0f0; */
}

.touch-point {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #ff0000;
  border-radius: 50%;
}
</style>