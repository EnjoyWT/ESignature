// UserService.js
import axios from '../utils/request';


const homeService = {
  getUser(email) {
    return axios.post(`/api/create`,{"email":email});
  },

  updateTask(user){
    return axios.post(`/api/update`,user);
  },

};

export default homeService;
