import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router"
import pinia from "./store/index"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import vConsole from 'vconsole'
const vconsole = new vConsole()

const app = createApp(App)

pinia.use(piniaPluginPersistedstate);

app.use(router)
app.use(pinia)
app.mount('#app')
