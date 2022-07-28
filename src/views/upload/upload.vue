<template>
  <div>
    <div style="position: relative">
      <img :src="imageUrl" alt="" v-show="imageUrl" style="width: 20px; height: 20px; object-fit: contain;">
      <i class="el-icon-close" style="position: absolute; top: 0; right: 0; color: red;" v-if="imageUrl" @click="deleteImg"></i>
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
      :show-file-list="false"
      :file-list="fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
    <el-button type="primary" @click="openDialog">点击展示弹窗</el-button>
    <el-dialog :visible="dialogVisible" title="标题1" class="my-info-dialog" center>
    <el-row type="flex" justify="space-around" style="margin-bottom: 1rem; color: #fff;">
      <el-col >监控名称<span style="margin-left: 1rem">{{name}}</span></el-col>
      <el-col>同步时间</el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-bottom: 1rem; color: #fff;">
      <el-col >监控状态<span style="margin-left: 1rem">启用</span></el-col>
      <el-col>同步时间</el-col>
    </el-row>
      <div slot="footer">
        <i type="warn">关闭</i>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: '歌华大厦北门',
      imageUrl: '',// 图片地址
      fileList: [],
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleBeforeUpload(file) {
      const fileSize = file.size / 1024 /1024 < 5
      let types = ['image/jpg', 'image/png', 'image/bmp', 'image/jpeg'];
      const imgFormat = types.includes(file.type);
      if(!fileSize) {
          this.$message('上传文件大小不能超过5MB!，请重新选择')
      }
      if(!imgFormat) {
          this.$message('上传图片只能是 JPG、PNG、BMP格式!，请重新选择')
      }
      return fileSize && imgFormat
    },
    submitUpload() {
      if(!this.imageUrl) {
        console.log('222')
      } else {
        this.$refs.upload.submit();
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    deleteImg() {
      this.imageUrl = ''
      this.fileList = []
      console.log('111',this.fileList.length)
    },
    handlePreview(file) {
      console.log(file);
    },
    openDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
 .my-info-dialog ::v-deep .el-dialog__header{
  border-bottom: 1px solid rgb(0, 82, 118);
}
 .my-info-dialog ::v-deep.el-dialog__title {
  color: #fff;
}
.my-info-dialog ::v-deep .el-dialog {
  background: rgb(0, 2, 28);
  border-radius: 2% 2% 0 0;
}
.my-info-dialog ::v-deep .el-dialog__headerbtn .el-dialog__close {
   	  background: rgb(0, 2, 28);
 }
.my-info-dialog ::v-deep .el-icon-close:before{
  color: rgb(0, 82, 118);
  background: transparent;
}
.my-info-dialog i {
  background: rgb(53, 61, 38);
  color: #fff;
}
</style>
