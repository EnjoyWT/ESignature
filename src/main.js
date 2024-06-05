import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router"
import pinia from "./store/index"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


if (process.env.NODE_ENV === 'development') {
    import('vconsole').then(({ default: VConsole }) => {
      // eslint-disable-next-line no-new
      new VConsole();
    });
  }


const app = createApp(App)

pinia.use(piniaPluginPersistedstate);

app.use(router)
app.use(pinia)
app.mount('#app')
