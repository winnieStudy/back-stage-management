<template>
  <div class="echartsWrapper" :id="id"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'columnDiagram',
    props: {
      name: {
        type: String,
        required: true
      },
      options: {
        type: Object,
        required: true
      },
      xAxisData: {
        type: Array,
      }
    },
    data() {
      return {
        instance: null
      };
    },
    computed: {
      id() {
        return 'echarts_' + this.name
      },
    },
    watch: {
      options() {
        this.instance.clear()
        this.setOption()
      }
    },
    methods: {
      resizeChart() {
        this.instance.resize()
      },
      setOption() {
        this.instance.setOption({
          title: {
            text: this.options.title || null,
            top: this.options.topTitleDistance ? this.options.topTitleDistance : undefined,
            left: this.options.leftTitleDistance ? this.options.leftTitleDistance : undefined,
            textStyle: {
              fontWeight: 'bold',
              fontSize: this.options.titleFontSize || 14
            }
          },
          grid: {
            x: this.options.xGrid ? this.options.xGrid : '8%',
            y: this.options.yGrid ? this.options.yGrid : '20%',
            x2: this.options.x2Grid ? this.options.x2Grid : '10%',
            y2: this.options.y2Grid ? this.options.y2Grid : '20%'
          },
          //图例组件
          legend: {
            type: 'scroll',
            orient: this.options.legendVertical ? 'vertical' : 'horizontal', //图例列表布局
            right: this.options.legendVertical ? 20 : undefined,
            bottom: this.options.legendVertical ? undefined : 0,
            top: this.options.topLegendDistance ? this.options.topLegendDistance : undefined,
            // right: this.options.rightLegendDistance ? this.options.rightLegendDistance : undefined,
            icon: 'circle',
            //柱状图和折线图，标签提示，需与series的name对应
            data: this.options.data ? this.options.data : null
          },
          //提示框组件
          toolTip: {
            trigger: this.options.trigger ? this.options.trigger : 'axis',
            axisPointer: {
              type: this.options.axisTooltipType || 'line',  //指示器类型
              shadowStyle: this.options.axisTooltipType ? {color: 'rgba(219,227,229,0.3)'} : undefined
            }, //坐标轴致使其配置项
            backgroundColor: '#ffffff',
            borderColor: 'rgba(108,137,137,0.2)',
            borderWidth: 1,
            padding: 12,
            textStyle: {
              color: '#333545',
              fontSize: 9,
              lineHeight: 18
            },
            formatter: this.options.formatter ? this.options.formatter : null   //提示框浮层内容格式器
          },
          xAxis: [
            {
              type: this.options.type ? this.options.type : 'value', //数值轴
              show: this.options.xAxisShow ? false : true,
              name: this.options.xAxisName ? this.options.xAxisName : undefined,
              data: this.xAxisData,
              axisTick: { 
                show: true   //显示坐标轴刻度
              },
              axisLabel: {  //坐标轴刻度标签的相关配置
                formatter: value => value,
                color: "#5D7092",
                rotate: this.options.labelRotate || 0
              },
              axisLine: {
                lineStyle: {
                  color: '#5D7092'
                }
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              //第1个y轴单位
              show: this.options.yAxisShow ? false : true,
              name: this.options.yAxisUpName1 ? this.options.yAxisUpName1 : undefined,
              minInterval: this.options.yAxisMinInterval ? this.options.yAxisMinInterval : undefined,
              axisLabel: {
                formatter: value => value,
                color: "#5D7092",
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#5D7092'
                }
              },
              //坐标轴在 grid 区域中的分隔线
              splitLine: {
                show: true,
                lineStyle: {
                  type: this.options.yAxisSplitLine || 'dashed'
                }
              },
            },
            {//第2个y轴单位
              type: 'value',
              //只有一列的情况下，可以强制定制坐标轴的显示位置,此时只有一列y轴
              position: this.options.yAxisPosition ? 'left' : undefined,
              show: this.options.yAxisShow ? false : true,
              name: this.options.yAxisUpName2 ? this.options.yAxisUpName2 : undefined,
              minInterval: this.options.yAxisMinInterval ? this.options.yAxisMinInterval : undefined,
              axisLabel: {
                formatter: value => value,
                color: "#5D7092",
              },
              axisLine: {
                lineStyle: {
                  color: '#5D7092'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: this.options.yAxisSplitLine || 'solid'
                }
              },
            }
          ],
          series: this.options.series.map(item => {
            // type: 'bar',
            // // type: 'bar',
            // //柱状图传name值
            // name: item.options.name,
            // data: item.options.data,
            // barWidth: item.barBarWidth || '30%',
            // itemStyle: {
            //   //柱条的颜色
            //   color: item.options.color,
            //   barBorderRadius: item.options.borderBarRadius || 0
            // }
            if(item.type == 'bar') {
              return  {
                type: 'bar',
                //柱状图传name值
                name: item.options.name,
                data: item.options.data,
                barWidth: item.barBarWidth || '30%',
                itemStyle: {
                  //柱条的颜色
                  color: item.options.color,
                  borderRadius: item.options.borderBarRadius || 0
                }
              }
              } else if(item.type === 'line') {
                return {
                  type: 'line',
                  stack: item.stack ? undefined : 'Total',  //是否为多重折叠折线图
                  name: item.options.name,
                  data: item.options.data,
                }
              } else {
                return {
                  type: 'pie',
                  name: item.options.name,
                  data: item.options.data,
                }
              }
          })
        })
      }
   },
   mounted() {
     this.instance = echarts.init(document.getElementById(this.id), 'light')
     this.setOption()
     this.resizeChart()
     window.addEventListener('resize', this.resizeChart)
   },
   destroyed() {
      window.removeEventListener('resize', this.resizeChart)
    },
  }
</script>

<style scoped>
  .echartsWrapper {
    width: 100%;
    height: 100%;
    padding: 5px;
  }
</style>