<template>
  <div>
    <!-- 头部信息 -->
    <div style="margin-bottom: 10px; overflow: hidden">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="float: left"
        @click="showModal"
        >新增</el-button
      >
      <el-button style="float: right" type="primary" @click="search"
        >搜索</el-button
      >
      <el-input
        style="width: 200px; float: right"
        placeholder="请输入"
        v-model="searchData"
      ></el-input>
    </div>
    <!-- 首页表格 -->
    <div class="tableOne">
      <el-table :data="tableData" stripe v-loading="tableLoading">
        <el-table-column
          v-for="(item, index) in column"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 32px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 15, 20]"
          :page-size="pagination.pagesize"
          layout="total, sizes, prev, pager, next"
          :total="pagination.total"
          class="tablePager"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="operatyType === 'add' ? '新增用户' : '更新用户'"
      :visible="addDialogShow"
      :before-close="closeDialog"
    >
      <common-form
        :label="formLabel"
        :form="formData"
        :inline="true"
        ref="form"
      ></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" v-preventReClick>取 消</el-button>
        <el-button type="primary" @click="confirm" v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import commonForm from "../../components/commonForm.vue";
import {
  getTableData,
  searchTable,
  deleteTableItem,
} from "../../common/user.js";

export default {
  components: { commonForm },
  data() {
    return {
     
      tableData: [], //表格数据
      tableLoading: false,
      imageUrl: "",
      //分页
      pagination: {
        pagesize: 20,
        total: 0,
        currentPage: 1,
      },
      //表格列
      column: [
        { prop: "name", label: "姓名", width: "80" },
        { prop: "age", label: "年龄", width: "100" },
        { prop: "sex", label: "性别", width: "100" },
        { prop: "birth", label: "出生日期", width: "100" },
        { prop: "addr", label: "地址", width: "120" },
      ],
      formLabel: [
        {
          type: "Input",
          model: "name",
          prop: "name",
          label: "姓名",
          placeholder: "请输入",
        },
        {
          type: "InputNumber",
          model: "age",
          prop: "age",
          label: "年龄",
          placeholder: "请输入",
          min: 0,
        },
        {
          type: "Select",
          model: "sex",
          prop: "sex",
          label: "性别",
          placeholder: "请选择",
          opts: [
            { label: "男", value: "0" },
            { label: "女", value: "1" },
          ],
        },
        {
          type: "Date",
          model: "birth",
          prop: "birth",
          label: "出生日期",
          placeholder: "请输入",
        },
        {
          type: "Input",
          model: "addr",
          prop: "addr",
          label: "地址",
          placeholder: "请输入",
        },
      ],
      formData: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      operatyType: "add", //用来判断是新增还是编辑
      addDialogShow: false,
      searchData: "", //搜索关键字
      // 表单校验
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [
          { required: true, message: "请选择出生日期", trigger: "change" },
        ],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    //关闭弹窗
    closeDialog() {
      this.addDialogShow = false;
    },
    //表格每页条数发生改变
    handleSizeChange(val) {
      this.pagination.pagesize = val;
      this.getTableData();
    },
    //切换表格页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    //编辑表格中数据
    handleEdit(index, row) {
      this.formData = {};
      this.operatyType = "edit";
      this.addDialogShow = true;
    },
    //删除表格中数据
    handleDelete(index, row) {
      console.log(index, row);
      deleteTableItem(row.id).then(() => {
        this.getTableData();
        this.$message("删除成功");
      });
    },
    //获取表格数据
    getTableData() {
      this.tableLoading = true;
      getTableData(this.pagination.pagesize, this.pagination.currentPage)
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
          this.tableLoading = false;
        })
        .catch((error) => error)
        .finally(() => {
          this.tableLoading = false;
        });
    },
    //展示新增新增弹窗
    showModal() {
      this.formData = {};
      this.operatyType = "add";
      this.addDialogShow = true;
    },
    //提交表单
    confirm() {
      if (Boolean(this.formData.name) === false) {
        this.$message("请填写姓名");
        return;
      } else {
        //使用Mockjs
        if (this.operatyType === "edit") {
          this.$http.post("/user/edit", this.formData).then((res) => {
            if (res.code == 20000) {
              this.addDialogShow = false;
              this.getTableData();
            }
          });
        } else {
          this.$http.post("/user/add", this.formData).then((res) => {
            if (res.code == 20000) {
              console.log(res);
              this.addDialogShow = false;
              this.getTableData();
            }
          });
        }
      }
      //不使用MockJs时这样写比较方便
      // if(this.operatyType === 'edit') {
      //   updateTable('edit', this.formData).then(() => {
      //     this.addDialogShow = false
      //     this.getTableData()
      //   }).catch(error => error)
      // } else {
      //   updateTable('add', this.formData).then((res) => {
      //     this.addDialogShow = false
      //     this.getTableData()
      //   }).catch(error => error)
      // }
    },
    //搜索表格
    search() {
      searchTable(this.searchData)
        .then(() => {
          (this.pagination.currentPage = 1), this.getTableData();
          this.searchData = "";
        })
        .catch((error) => error)
        .finally(() => (this.searchData = ""));
    },
  },
};
</script>
<style scoped lang="scss">
.tableOne {
  height: calc(100% - 62px);
  background: #fff;
  position: relative;
  .tablePager {
    position: absolute;
    right: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
