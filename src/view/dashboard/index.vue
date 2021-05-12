<template>
  <div id="dashboard">
    <div class="container-dashboard">
      <div v-for="(item, index) of Array(4)"
           :key="item"
           class="uxo-grid">
        <div :id="'uxoHighCharts-' + index"
             class="highCharts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { dashboardAxios } from '@/axios'

export default {
  data() {
    return {
      dashboard: []
    }
  },
  mounted() {
    this.getdashboardList()

    var options = {
      chart: {
        gridLineWidth: 0,
        backgroundColor: '#EBEEF5'
      },
      subtitle: {
        text: 'highcharts',
        align: 'left'
      },
      title: {
        text: '事务流程图',
        align: 'left',
        float: true,
        fontSize: '12'
      },
      tooltip: {

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        line: {
          lineWidth: 5,
          point: {
            pointInterval: 12
          }
        },
        series: {
          marker: {
            radius: 6
          }
        }
      },
      xAxis: {
        labels: {
          enabled: false
        },
        categories: [12, 12, 12],
        gridLineWidth: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        tickWidth: 0
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
        gridLineWidth: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0,
        tickWidth: 0
      },
      series: [
        {
          data: [12, 12, 12, 12, 12]
        }
      ]
    }

    window.Highcharts.chart('uxoHighCharts-0', options);
  },
  methods: {
    getdashboardList() {
      dashboardAxios.getdashboardList().then(v => {
        this.dashboard = v
      })
    }
  }
}
</script>
<style lang="scss">
.highcharts-credits {
  display: none;
}
</style>
<style lang="scss" scoped>
#dashboard {
  box-sizing: border-box;
  min-width: 1200px;
  margin: 10px auto;
  padding: 10px 30px;
  overflow: scroll;
  .container-dashboard {
    display: grid;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-template-rows: repeat(4, 250px);
    grid-template-columns: repeat(auto-fill, 1200px);
    justify-content: center;
  }
  .uxo-grid {
    display: inline-block;
    box-sizing: border-box;
    background: #f4f5f7;
    border-radius: 3px;
    .highCharts {
      box-sizing: border-box;
      width: calc(100% - 350px);
      height: 100%;
    }
  }
}
.support {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  padding: 10px;
  a {
    margin: 0 10px;
    color: #333333;
    font-size: 1.8rem;
    backface-visibility: hidden;
    transition: all 150ms ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
