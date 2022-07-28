<template>
  <header>
    <div class="l-content">
      <el-button plain size="mini" icon="el-icon-menu" @click="changeCollapse"/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tabList" :key="item.path" :to="{ path: item.path }">{{item.lable}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown size="mini" trigger="click">
        <img :src="userImg" class="img" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>     
    </div>
  </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'headers',
  data() {
    return {
      userImg: require('../assets/1.jpeg')
    }
  },
  methods: {
    ...mapMutations('tab',['changeCollapse'])
  },
  computed: {
    // ...mapState(['isCollapse'])
    ...mapState('tab', ['tabList'])
  }
}
</script>
<style scoped lang="scss">
  .l-content {
    line-height: 60px;
    margin: 0;
    padding-left: 10px;
    float: left;
  }
  .r-content {
    float: right;
    // display: flex;
    // align-items: center;
    height: 60px;
    .img {
      margin-top: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
</style>
