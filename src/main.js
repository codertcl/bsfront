import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element'

Vue.config.productionTip = false
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

//请求拦截添加token信息
//需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌 才能获取数据
axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('userToken')
    return config
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
