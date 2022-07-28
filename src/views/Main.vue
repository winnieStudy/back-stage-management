<template>
  <div class="home">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <Aside />
      </el-aside>
      <el-container>
        <el-header style="background: #333;">
          <Header />
        </el-header>
        <tag />
        <el-main stype="padding: 0;">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/aside.vue'
import Header from '../components/header.vue'
import Tag from '../components/tag.vue'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: {Aside, Header, Tag},
  computed: {
    ...mapState('tab', ['tabList'])
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    }
  }
}
</script>
<style scoped lang="scss">
   .el-aside {
    overflow-x: hidden;
    min-height: 100vh;
    background: #545c64;
    // position: fixed;
    // top: 0px;
    // left: 0;
    // bottom: 0;
    // z-index: 999;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background: #eee
  }
</style>