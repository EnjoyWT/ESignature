import { defineStore } from "pinia"
const useHomeInfoStore = defineStore('myStorecount', {
  // defineStore('homeInfo',{})  homeInfo就是这个仓库的名称name
  state: () => ({
    count:0
  }),
  actions: {
 
  setCount(c){
    this.count = c
  },
     // 加载持久化的状态
     loadPersistedState() {
        const key = `myStorecount`;
        const persistedState = localStorage.getItem(key);
        if (persistedState) {
          this.$patch(JSON.parse(persistedState));
        }
      },
      // 保存状态到 localStorage
      savePersistedState() {
        const key = `myStorecount`;
        localStorage.setItem(key, JSON.stringify(this.$state));
      },
      
  }
})
 
export default useHomeInfoStore