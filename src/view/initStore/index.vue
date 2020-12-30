<template>
  <el-dialog :visible.sync="dialogVisible" width="80%" title="初始配置" :append-to-body="true" custom-class="storeSprint-dialog" :show-close="false" center top="40px" :close-on-click-modal="false" :before-close="handleClose">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="submitStore" :disabled="disabled">
        {{disabled ? '取 消' : '确 认'}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
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

      let myChart = this.$echarts.init(echartDom);
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

      });
    },
    getbacklogList () {
      this.$axios.sprints.storeSprint().then(() => {
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
  height: 250px;
  width: 100%;
  padding: 4px;
  border: 1px solid #e3e4e5;
  background: #f6f6f6;
  .title-meta {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    .title {
      padding-right: 9px;
    }
    .point {
      margin-left: 35px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        top: 3px;
        background: #4a4961;
        left: -18px;
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
    height: 78px;
    font-size: 14px;
    padding: 10px;
    color: #000;
    box-sizing: border-box;
    border-top: 1px solid #e3e4e5;
  }
}
</style>
