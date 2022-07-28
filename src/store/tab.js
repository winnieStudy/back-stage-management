const state = {
  isCollapse: false,
  tabList: [
    {
      path: '/',
      name: 'home',
      label: '首页',
      icon: 's-home',
    }
  ],
  currentMenu: null
}
const mutations = {
  changeCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  selectMenu(state, val) {
    if(val.name != 'home') {
      state.currentMenu = val
      if(state.tabList.some(item => item.name === val.name)) {
        state.currentMenu = null
      } else {
        state.tabList.push(val)
      }
    }
  }
}
const actions = {

}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}