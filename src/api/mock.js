import Mock from 'mockjs'

// import homeApi from './mockServerData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
// Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// Mock.mock('/api/user/getUser', userApi.getUserList)

Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)
// 权限相关
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)