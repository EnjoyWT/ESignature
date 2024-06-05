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
    updateAt:"",
    hEmail:"",
    count:0
  }),
  actions: {
    setUser(user) {
      this.id = user.id;
      this.email = user.email;
      this.taskone = user.taskone;
      this.tasktwo = user.tasktwo;
      this.createAt = user.createAt;
      this.updateAt = user.updateAt;
      this.hEmail = user.hEmail;

  },
  setCount(c){
    this.count = c
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
            console.log(res.data)
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
      },
      updateUser(user, callback){
        console.log(user)
        homeService.updateTask(user)
        .then(res => {
          this.setUser(res.data);
          console.log(res.data)

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