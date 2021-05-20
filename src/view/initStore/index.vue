<template>
  <el-dialog :visible.sync="dialogVisible"
             :append-to-body="true"
             :show-close="false"
             :close-on-click-modal="false"
             :before-close="handleClose"
             width="80%"
             title="初始配置"
             custom-class="storeSprint-dialog"
             center
             top="40px">
    <div id="storeSprint">
      <div class="title-meta">
        <div class="title">自动化配置: </div>
        <div class="point init">初始化配置</div>
        <div class="point store">安全检测</div>
        <div class="point evor">环境扫描</div>
        <div class="point store">数据存储</div>
      </div>
      <div id="configLine"></div>
      <div class="config-detail">
        <p>初始化配置：</p>
        <p>- 加载localforage包</p>
        <p>- 校验浏览器是否支持本地存储indexdb</p>
        <p>- 校验用户信息</p>
      </div>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button :disabled="disabled"
                 @click="submitStore">
        {{disabled ? '取 消' : '确 认'}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { sprintAxios } from '@/axios'
import echarts from 'echarts'

export default {
  data () {
    return {
      dialogVisible: true,
      disabled: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderEchartsLine()
      this.getbacklogList()
    })
  },
  methods: {
    async submitStore () {
      this.dialogVisible = false;
      this.$router.push('/story')
    },
    renderEchartsLine () {
      let echartDom = document.getElementById('configLine');

      if (!echartDom) {
        return;
      }

      let myChart = echarts.init(echartDom);
      let series = [
        {
          data: [[1, 10], [2, 10]],
          type: 'line',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#00875a',
              lineStyle: {
                width: 8
              }
            }
          }
        },
        {
          data: [[2, 10], [3, 10]],
          type: 'line',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#005086',
              lineStyle: {
                width: 8
              }
            }
          }
        },
        {
          data: [[3, 10], [4, 10]],
          type: 'line',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#E6A23C',
              lineStyle: {
                width: 8
              }
            }
          }
        },
        {
          data: [[4, 10], [5, 10]],
          type: 'line',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#00875a',
              lineStyle: {
                width: 8
              }
            }
          }
        }
      ]

      series.forEach(item => {
        item.hoverAnimation = false;
        item.cursor = 'default'
      })

      let option = {
        grid: {
          y: 0,
          x: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 20
        },
        silent: false,
        markPoint: {
          silent: false
        },
        yAxis: {
          min: 5,
          max: 15,
          show: false
        },
        xAxis: {
          show: false,
          min: 0,
          max: 6
        },
        series
      }
      myChart.setOption(option, true);
    },
    handleClose (done) {
      this.$confirm('确认关闭？').then(_ => {
        done();
        this.$router.push('/story')
      }).catch(_ => {

      })
    },
    getbacklogList () {
      sprintAxios.initLocalForageStore().then(() => {
        setTimeout(() => {
          this.disabled = false;
        }, 500);
      })
    }
  }
}
</script>
<style lang="scss">
.storeSprint-dialog {
  .el-dialog__body {
    padding: 0 20px !important;
  }
}
</style>
<style lang="scss" scoped>
#storeSprint {
  width: 100%;
  height: 250px;
  padding: 4px;
  background: #f6f6f6;
  border: 1px solid #e3e4e5;

  .title-meta {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 14px;

    .title {
      padding-right: 9px;
    }
    .point {
      position: relative;
      margin-left: 35px;

      &::before {
        position: absolute;
        top: 3px;
        left: -18px;
        width: 15px;
        height: 15px;
        background: #4a4961;
        content: "";
      }

      &.init {
        &::before {
          background: #00875a;
        }
      }

      &.evor {
        &::before {
          background: #e6a23c;
        }
      }

      &.store {
        &::before {
          background: #005086;
        }
      }
    }
  }
  #configLine {
    width: 100%;
    height: 100px;
  }
  .config-detail {
    box-sizing: border-box;
    height: 78px;
    padding: 10px;
    color: #000;
    font-size: 14px;
    border-top: 1px solid #e3e4e5;
  }
}
</style>
