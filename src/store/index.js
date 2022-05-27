import { createStore } from 'vuex'

export default createStore({
  state: {
    username: "Test",
    avator_url: "https://s3.bmp.ovh/imgs/2022/05/27/edcb768f48e287c6_thumb.png"
  },
  getters: {
    setUserInfo(user){
      this.state.username = user.username
      this.state.avator_url = user.avator_url
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
