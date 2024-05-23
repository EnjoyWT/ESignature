import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolveP = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:  {
    alias: {
      "@":resolveP('src'),
      "@assets":resolveP('src/assets'),
      "@components":resolveP('src/components')
    }
    
  },
  server: {
    host: '0.0.0.0', // 或者你的本地 IP 地址
  },
})
