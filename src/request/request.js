import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
import store from '@/store/index'
import moment from "moment";
// import {message as Message} from "element-ui"

//根据环境变量区分接口的默认地址
let baseUrl = axios.defaults.baseURL
let closeGlobalErrorTip = false

switch(process.env.NODE_ENV) {
  case "development":
    baseUrl = "http://localhost:8080/api/"
  break;
  case "test":
    baseUrl = "http://localhost:8080"
  break;
  case "production":
    baseUrl = ""
  break;
}

//设置超时时间和跨域请求时是否携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

//设置请求传递数据的格式(看服务器要求什么格式)
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
    config => {
    let  token = localStorage.getItem('token')
    token && (config.headers.Authoirzation = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.defaults.validateStatus(status => {
  return /^(2|3)\d{2}$/.test(status)
})

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let {response} = error
    if(response) {
      //服务器有返回结果
      switch(response.status) {
        case '401':   //当前请求需要身份验证（一般是未登录）
          break;
        case '403':   //当前请求资源的权限被禁止
          break;
          case '404':
            break;
      }
    } else {
      //服务器没有返回结果
      if(!window.navigator.onLine) {
        //断网处理
        return
      } else {
        return Promise.reject(error)
      }
    }
  }
)

function unifiedResponseInterceptorHandle(data, status) {
  if ([4010001, 401].includes(status)) { // 退出登录特殊处理
    if (!sessionStorage.getItem('lastLogoutTime')) {
      sessionStorage.setItem('lastLogoutTime', moment().format('YYYY-MM-DD HH:mm:ss'))
      localStorage.removeItem('logisticToken');
      store.commit('SET_REFRESH_TOKEN_INTERVAL')
      // Message.error('登录已失效').then(() => window.location.href = httpURL)
    }
  } else {
    // errorHandle(data, status, message)
  }
}

function request(method) { 
  return function (query) {
    let url
    let data
    let headerAdditional = {}
    let responseType
    closeGlobalErrorTip
    if (typeof query === "string") {
      url = query
      data = null
    } else {
      url = query.url
      data = query.data
      headerAdditional = query.headerAdditional
      responseType = query.responseType
      if (data && data.closeGlobalErrorTip === true) {
        closeGlobalErrorTip = true
      }
    }
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        params: (method === "get" || method === "delete") ? data : null,
        data: (method === "get" || method === "delete") ? null : data,
        baseUrl: baseUrl,
        contentType: "application/json",
        responseType: responseType,
        headers: {
          Authorization: localStorage.getItem("logisticToken"),
          ...headerAdditional,
        }
      }).then(res => {
        /*if (res === undefined) {
          return Message.warning(`接口地址：${query.url} 请求超过 5s……需要后台视情况进行优化！！！`, 10);
        } else {*/
          const status = res.status
          if (status == 200) {
            resolve(res.data)
          } else {
            unifiedResponseInterceptorHandle(res.data, status, res.message)
          }
        // }
      }).catch(res => {
        unifiedResponseInterceptorHandle(res.data, res.status, res.message, reject)
        reject(res)
      });
    })
  }
}
Vue.prototype.$get = request("GET")
Vue.prototype.$post = request("POST")
Vue.prototype.$put = request("PUT")
Vue.prototype.$del = request("DELETE")
// Vue.prototype.uploadUrl = uploadUrl
// Vue.prototype.appCode = appCode
export default request