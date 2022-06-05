import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    username: localStorage.username,
    avatar_url: localStorage.avatar_url || "https://s3.bmp.ovh/imgs/2022/05/27/edcb768f48e287c6_thumb.png",
  },
  getters: {},
  mutations: {
    setUserInfo(state,user) {
      this.state.username = user.username || ""
      this.state.avatar_url = user.avatar_url || this.state.avatar_url
    }
  },
  actions: {},
  modules: {}
})
