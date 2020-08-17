<template>
	<div id="dashboard">
		<div class="container-dashboard">
			<div class="uxo-grid" v-for="(item, index) of Array(4)" :key="item">
				<div class="highCharts" :id="'uxoHighCharts-' + index"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dashboard: []
		}
	},
	created() {
		this.getdashboardList()
	},
	mounted() {
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
		var chart = Highcharts.chart('uxoHighCharts-0', options);
	},
	methods: {
		getdashboardList() {
			this.$axios.dashboard.getdashboardList().then(v => {
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
	min-width: 1200px;
	margin: 10px auto;
	overflow: scroll;
	padding: 10px 30px;
	box-sizing: border-box;
	.container-dashboard {
		display: grid;
		grid-template-columns: repeat(auto-fill, 1200px);
		grid-template-rows: repeat(4, 250px);
		grid-row-gap: 20px;
		grid-column-gap: 20px;
		justify-content: center;
	}
  .uxo-grid {
		display: inline-block;
		background: #f4f5f7;
		box-sizing: border-box;
		border-radius: 3px;
		.highCharts {
			width: calc(100% - 350px);
			height: 100%;
			box-sizing: border-box;
		}
	}
}
</style>
