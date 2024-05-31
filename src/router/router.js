import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Map from '../components/Map.vue'
import TaskOne from "../components/TaskOne.vue"
import TaskTwo from "../components/TaskTwo.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/map',
   component: Map},
   { path: '/taskone',
   component: TaskOne},
   { path: '/tasktwo',
   component: TaskTwo}

] 

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
