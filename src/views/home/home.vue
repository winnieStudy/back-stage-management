<template>
  <el-row :gutter="20" style="margin-top: 10px; ">
    <el-col :span="8">
      <el-card shadow="hover" style="margin-bottom: 20px;">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">{{name}}</p>
            <p class="access">{{access}}</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间：<span>{{time}}</span></p>
          <p>上次登录地点：<span>{{local}}</span></p>
        </div>
      </el-card> 
      <el-table :data="tableData">
        <el-table-column v-for="item in column" :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16">
      <el-row style="background: #fff;">
        <div class="num">
          <el-card v-for="(item, index) in carData" :key="index" :body-style="{display: 'flex', padding: 0}" class="el-card">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
            <div class="detail">
              <p class="num1">￥{{item.value}}</p>
              <p class="name1">{{item.name}}</p>
            </div>
          </el-card>
        </div>
      </el-row>
      <el-row style="background: #fff; margin-top: 20px;">
        <el-col :span="24" style="height: 150px ;">
          <my-echarts name="echartsLine" :options="optionsLine" :xAxisData="optionsLine.xAxisData" />
        </el-col>
      </el-row>
      <el-row style="background: #fff; margin-top: 20px;">
        <el-col :span="12" style="height: 200px ;">
            <my-echarts name="echartsBar" :options="optionsBar" :xAxisData="optionsBar.xAxisData" />
        </el-col>
        <el-col :span="12" style="height: 200px ;">
          <my-echarts name="echartsPie" :options="optionsPie" :xAxisData="optionsPie.xAxisData" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import moment from 'moment'
import myEcharts from '../../components/MyEcharts.vue'
import {getTableData, getLineData, getBarData, getPieData} from '../../common/home.js'
export default ({
  components: {myEcharts},
  computed: {
    optionsLine() {
      return {
        yAxisMinInterval: 20,
        yAxisUpName1: '图一折线图',
        topLegendDistance: '0',
        yAxisPosition: true,
        type: 'category',
        labelRotate: '20',
        xGrid: '7%',
        data: this.orderData.map((item) => Object.keys(item))[0],
        xAxisData: this.orderDataRow,
        series: this.orderData.map((item, index) => ({
            type: 'line',
            options: {
              name: Object.keys(item)[index],
              data: Object.values(item)
            }
        }))
      }
    },
    optionsBar() {
      return {
        yAxisMinInterval: 20,
        yAxisUpName1: '图二柱状图',
        topLegendDistance: '10',
        yAxisPosition: true,
        data: ['新增用户', '活跃用户'],
        xGrid: '12%',
        yGrid: '15%',
        type: 'category',
        xAxisData: this.userData.map(item => item.date),
        series: [
          {
            type: 'bar',
            options: {
              name: '新增用户',
              data: this.new
            }
          },
          {
            type: 'bar',
            options: {
              name: '活跃用户',
              data: this.new
            }
          }
        ]
      }
    },
    optionsPie() {
      return {
        yAxisMinInterval: 20,
        yAxisUpName1: '图三饼图',
        topLegendDistance: '0',
        yAxisShow: 'false',
        xAxisShow: 'false',
        trigger: 'item',
        data: this.videoData.map(item => item.name),
        series: this.videoData.map(item => ({
          type: 'pie',
          options: {
            name: item.name,
            data: this.videoData
          }
        }))
    }
  }
  }, 
  data() {
    return {
      userImg: require('../../assets/1.jpeg'),
      access: '超级管理员',
      name: 'Admin',
      time: moment().format('YYYY-MM-DD'),
      local: '河南',
      column: [
        {prop: "course", label:"课程", width:"80"},
        {prop: "buy", label:"今日购买", width:"100"},
        {prop: "momentBuy", label:"本月购买", width:"100"},
        {prop: "totalBuy", label:"总购买", width:"100"}
      ],
      tableData: [],   //表格数据
      carData: [
         {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        }
      ],
      orderDataRow: [],
      orderData: [],
      // orderDataLegend: []
      userData: [],
      new: [],
      videoData: []
    }
  },
  methods: {
    //获取表格数据
    getTableData() {
      getTableData().then(res => this.tableData = res).catch(error => this.$message.error(error))
    },
    //获取折线图数据
    getLineData() {
      getLineData().then(res => {
        this.orderDataRow = res.data1.map(item => moment(item).format('YYYY-MM-DD'))
        this.orderData = res.data2
      }).catch(error => this.$message.error(error))
    },
    //获取柱状图数据
    getBarData() {
      getBarData().then(res => {
        this.userData = res.map(item => item)
        this.new = this.userData.map(item => item.new)
      }).catch(error => this.$message.error(error))
    },
    //获取饼图数据
    getPieData() {
      getPieData().then(res => {
        this.videoData = res
      }).catch(error => this.$message.error(error))
    }
  },
  mounted() {
    this.getTableData()
    this.getLineData()
    this.getBarData()
    this.getPieData()
  }
})
</script>
<style scoped lang="scss">
  .user{
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .userInfo{
        margin-left: 30px;
      .name{
        font-size: 18px;
        font-weight: 550;
        margin-bottom: 8px;
      }
      .access{
        margin-top: 0px;
      }
    }
  }
  .loginInfo{
    p{
      span{
        margin-left: 40px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-card{
      width: 200px;
      height: 80px;
      margin-bottom: 10px;
      i {
        height: 80px;
        line-height: 80px;
      }
      .detail{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .num1 {
          font-weight: 700px;
          font-size: 22px;
          margin: 0 5px;
          padding: 0;
        }
        .name1 {
          font-size: 12px;
          margin: 0 5px;
          padding: 0;
        }
      }
    }
  }
</style>
