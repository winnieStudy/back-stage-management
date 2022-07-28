<template>
  <div>
    <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    active-text-color="#ffd04b">
    <el-menu-item v-for="(item, index1) in noChildren" :key="index1" :index="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <template slot="title">{{item.label}}</template>    
    </el-menu-item>
    <el-submenu v-for="item2 in hasChildren" :key="item2.path" :index="item2.path" >
      <template slot="title">
        <i :class="'el-icon-' + item2.icon"></i>
        <span>{{item2.label}}</span>
      </template>
      <el-menu-item-group >
        <el-menu-item v-for="(item3) in item2.children" :key="item3.path" :index="item3.path" @click="clickMenu(item3)">
          <i :class="'el-icon-' + item3.icon"></i>{{item3.label}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default ({
  data() {
    return {
      // isCollapse: false,
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    ...mapState('tab',['isCollapse'])
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
    clickMenu(item) {
      this.$router.push({
        name: item.name
      }),
      this.$store.commit('tab/selectMenu', item)
    }
  }
})
</script>
<style scoped lang="scss">
  
</style>
