import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api/mock.js'
import preventReClick from './vDirective.vue/preventClick.js'
import http from 'axios'

Vue.use(ElementUI)

Vue.prototype.$http = http

import moment from 'moment'//导入文件
moment.locale('zh-cn');//需要汉化
// Vue.prototype.$moment = moment;//赋值使用

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
