<template>
  <div>
    <img :src="taskoneimg" class="w-screen h-svh fixed inset-0" />

    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img :src="showImgSrc" />
    </div>
    <div
      class="touch-area fixed left-0 right-0 top-1/4 h-1/2 select-non"
      @touchstart.self.prevent="onTouchStart"
      @contextmenu.prevent="disableContextMenu"
    >
      <div
        v-for="(touch, index) in touches"
        :key="index"
        class="touch-point"
        :style="{ left: `${touch.x}px`, top: `${touch.y}px` }"
      ></div>
      <!-- <div v-if="isShowDone">
        <img :src="taskoneimg" class="w-screen h-svh fixed inset-0" />
      </div> -->
    </div>
    <Done
      v-if="isShowDone"
      :isShowDone="isShowDone"
      @update:isShowDone="isShowDone = $event"
    />

    <div class="fixed top-2 left-2 w-[40px] h-[40px]">
      <img :src="back" @click="backclicked" />
    </div>
  </div>
</template>



<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import taskoneimg from "../assets/es/03Area-02/02bg.jpg";
import icon1 from "../assets/es/03Area-01/icon1.png";
import noicon1 from "../assets/es/03Area-01/noicon1.png";
import back from "../assets/es/03Area-01/back.png";
import { useRouter } from "vue-router";

import Done from "./Done.vue";

import { storeToRefs } from "pinia"; //引入pinia转换
import homeInfoStore from "../store/home";

const homeInfo = homeInfoStore();
const { taskone, tasktwo, email } = storeToRefs(homeInfo); // 响应式

const touches = ref([]);

const showImgSrc = ref(noicon1);

const isShowDone = ref(false);
const router = useRouter();

defineProps({
  name: String,
});
onBeforeMount(() => {
  window.scroll(0, 0);
  //判断是否已经盖过章
  handleUserData();
});

const handleUserData = () => {
  let one = taskone.value;
  let two = tasktwo.value;

  if (one + two == 2) {
    console.log("两个任务都完成了");
    showImgSrc.value = icon1;

    setTimeout(() => {
      isShowDone.value = true;
    }, 1250);
  } else if (two == 1) {
    console.log("任务2 已经完成");
    showImgSrc.value = icon1;
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

  event.preventDefault();

  const touchArea = document.querySelector(".touch-area");
  const touchAreaRect = touchArea.getBoundingClientRect();

  touches.value = Array.from(event.targetTouches).map((touch) => ({
    x: touch.clientX - touchAreaRect.left,
    y: touch.clientY - touchAreaRect.top,
  }));

  if (touches.value.length == 3) {
    handleTouchEnd();
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
  user.taskone = homeInfo.taskone; //修改对应的值
  user.tasktwo = 1; //修改对应的值

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
  console.log("ddddd");
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