import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, removeItem, setItem} from '../utils/storage.js'

Vue.use(Vuex)
//使用常量可以避免输入属性名错误导致的bug
const TOKEN = 'userToken'
export default new Vuex.Store({
  state: {
    //当前登录用户的登录状态(token) 先从本地来获取
    token: getItem(TOKEN),
    user: null,//当前用户信息
  },
  getters: {
    // getToken(state) {
    //     return state.token
    // },
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      //  为避免数据刷新丢失，把数据存储到本地sessionStorage
      setItem(TOKEN, data)
    },
    removeToken(state) {
      state.token = ''
      removeItem(TOKEN)
    },
    setUser(state, data) {
      state.user = data
      //  为避免数据刷新丢失，把数据存储到本地sessionStorage
      setItem('user', data)
    },
    removeUser(state) {
      state.user = ''
      removeItem('user')
    },
  },
  actions: {},
  modules: {}
})
