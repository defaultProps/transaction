<template>
	<div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      title="初始配置"
      custom-class="storeSprint-dialog"
      :show-close="false"
      center
      :before-close="handleClose">
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

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" size="mini" :disabled="true">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
      dialogVisible: true
		}
	},
	mounted() {
    this.$nextTick(() => {
      this.renderEchartsLine()
    })
	},
	methods: {
    renderEchartsLine() {
      let echartDom = document.getElementById('configLine');

      if (!echartDom) {
        return;
      }

      let myChart = this.$echarts.init(echartDom);
      let series = [{
        data: [50, 50, 50, 50],
        type: 'line',
        itemStyle: {
          normal: {
            color: '#005086',
            lineStyle: {
              width: 8
            }
          }
        },
        symbolSize: 8
      }]

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
          type: 'value',
          position: 'left',
          max: 100,
          min: 0,
          show: false
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4'],
          show: false,
          min: 0
        },
        series
      }
      myChart.setOption(option, true);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$router.push('/story')
        })
        .catch(_ => {});
    },
    getbacklogList() {
			this.$axios.sprints.storeSprint();
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
    font-size: 12px;
    margin-bottom: 20px;
    .title {
      padding-right: 5px;
    }
    .point {
      margin-left: 35px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 11px;
        height: 11px;
        top: 3px;
        background: #4a4961;
        left: -15px;
      }
      &.init {
        &::before {
          background: #67C23A;
        }
      }
      &.evor {
        &::before {
          background: #E6A23C;
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
    width: 516px;
    height: 100px;
  }
  .config-detail {
    height: 78px;
    border-top: 1px solid #e3e4e5;
  }
}
</style>
