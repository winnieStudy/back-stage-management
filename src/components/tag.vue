<template>
  <div class="tags">
    <el-tag style="margin: 10px 0 0 10px; cursor: pointer;" v-for="(item, index) in tabList" :key="index" :closable="item.name !== 'home'" :effect="$route.name == item.name ? 'dark' : 'plain'" size="small" @click="tagItemClick(item)" @close="closeItemTag(item, index)">
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState('tab', ['tabList'])
  },
  methods: {
    closeItemTag(item, index) {
      if(item.name != this.$route.name) {
        this.tabList.splice(index, 1)
       return  
      }
      if(this.tabList.length - 1 === index) {
        this.$router.push({path: this.tabList[index - 1].path})
        this.tabList.splice(index, 1)
      } else {
        this.$router.push({
          path: this.tabList[index].path
        })
      }
    },
    tagItemClick(item) {
      this.$router.push({path: item.path})
    },
    
  }
}
</script>
<style scoped lang="scss">
  .tags{
    background: #eee;
  }
</style>
