import { defineStore } from "pinia"
import homeService from "../api/home"
const useHomeInfoStore = defineStore('homeInfo', {
  // defineStore('homeInfo',{})  homeInfo就是这个仓库的名称name
  state: () => ({
    id: '', // 用户标识符
    email: '',
    taskone: 0,
    tasktwo: 0,
    createAt:"",
    updateAt:""
  }),
  actions: {
    setUser(user) {
      this.userId = user.userId;
      this.username = user.username;
      this.age = user.age;
      this.like = user.like;
      this.obj = user.obj;
      this.hobby = user.hobby;
  },
     // 加载持久化的状态
     loadPersistedState() {
        const key = `myStore-${this.userId}`;
        const persistedState = localStorage.getItem(key);
        if (persistedState) {
          this.$patch(JSON.parse(persistedState));
        }
      },
      // 保存状态到 localStorage
      savePersistedState() {
        const key = `myStore-${this.userId}`;
        localStorage.setItem(key, JSON.stringify(this.$state));
      },
      async getRemoteUser(userId){
        try {
            const response = await homeService.getUser(userId);
            console.log(response.data)
            //做数据校验
            this.setUser(response.data)
          } catch (error) {
            console.error(error);
          }
      },
     
      createUser(email, callback) {
        homeService.getUser(email)
          .then(res => {
            this.setUser(res.data);
            if (callback) {
              callback(null, res.data);
            }
          })
          .catch(error => {
            console.error(error);
            if (callback) {
              callback(error);
            }
          });
      }
      
  }
})
 
export default useHomeInfoStore