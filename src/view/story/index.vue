<template>
	<div id="story">
		<el-row class="story-backlog">
			<el-col :span="12" class="backlog-wrap" >
				<div class="backlog">
					<div class="backlog-title">
						<span class="title">Backlog</span>
						<span class="issus-count">{{backlogTotal}} 问题</span>
						<el-button type="primary" plain size="mini" class="btn-header">new Sprint</el-button>
						<el-button type="primary" plain size="mini" class="btn-header">new Issue</el-button>
					</div>
					<v-draggleList :list="backlogList" :group="{ name: 'backlog', pull: true, put: false }"></v-draggleList>
				</div>
			</el-col>
			<el-col :span="1" class="between-space">1</el-col>
			<el-col :span="11" class="springt-wrap">
				<el-collapse accordion>
					<div class="springt" v-for="el of sprints" :key="el.id">
						<el-collapse-item>
							<template slot="title">
								<div class="springt-title">
									<div>
										<span class="title">{{el.title}}</span>
										<span class="issus-count">{{el.count}} 问题</span>
										<span class="status" :class="[el.status]">{{el.status === 'doing' ? 'open' : 'close'}}</span>
									</div>
									<div>
										<span class="status count">{{el.pointsTotal}}</span>
									</div>
								</div>
							</template>
							<ul class="sprint-ul">
								<v-draggleList :list="el.issueList" :group="el.status == 'doing' ? 'backlog': 'disaledMove'"></v-draggleList>
							</ul>
						</el-collapse-item>
					</div>
				</el-collapse>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import draggleList from './component/list'

export default {
	data() {
		return {
			backlogList: [],
			sprints: [],
			backlogTotal: 0
		}
	},
	components: {
		'v-draggleList': draggleList
	},
	created() {
		this.getbacklogList()
		this.getsprintList()
	},
	methods: {
		getsprintList() {
			this.$axios.sprints.sprintList({type: 'sprint'}).then(v => {
				this.sprints = v.sprintList
			})
		},
		getbacklogList() {
			this.$axios.sprints.backlogList({type: 'backlog'}).then(v => {
				this.backlogList = v.sprintList
				this.backlogTotal = v.total
			})
		},
		removeAt(idx) {
      this.list.splice(idx, 1);
    },
    addPeople: function() {
    }
	}
}
</script>
<style lang="scss">
#story {
	margin: auto;
	position: fixed;
	top: 50px;
	left: 0px;
	right: 5px;
	bottom: 10px;
	.story-backlog {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 50px;
		top: 0;
		.backlog-wrap {
			height: 100%;
			.backlog {
				background: #f4f5f7;
				padding: 10px;
				height: 100%;
				.backlog-title {
					height: 40px;
					font-size: 14px;
					.title {
						font-weight: 600;
						font-size: 14px;
						color: #172b4d;
						padding: 0 10px 0 0;
					}
					.issus-count {
						font-size: 13px;
						font-weight: 600;
					}
					.btn-header {
						padding: 2px 3px;
						height: 25px;
						float: right;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.backlog-list {
					height: calc(100% - 40px);
					padding-right: 10px;
					overflow-y: scroll;
					&::-webkit-scrollbar {
						width: 3px;
						height: 3px;
					}
					&::-webkit-scrollbar-thumb {
							border-radius: 10px;
							box-shadow: inset 0 0 5px #f93;
							background: #535353;
					}
					&::-webkit-scrollbar-track {
						box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
						border-radius: 10px;
						background: #ededed;
					}
					.item {
						background: #fff;
						overflow: hidden;
						height: 32px;
						box-shadow: 0 0 1px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
						line-height: 32px;
						font-size: 15px;
						margin-bottom: 2px;
						padding: 0 4px;
						display: flex;
						box-sizing: border-box;
						align-items: center;
						text-indent: 5px;
						cursor: move;
						position: relative;
						white-space: nowrap;
						border-top-left-radius: 4px;
						border-bottom-left-radius: 4px;
						&:hover {
							background: #f6f6f6;
						}
						&::before {
							content: '';
							position: absolute;
							left: 0;
							height: 100%;
							position: absolute;
							text-indent: -9999em;
							top: 0;
							width: 3px;
							background-color: #f93;
							border-top-left-radius: 3px;
							border-bottom-left-radius: 3px;
						}
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							flex: 1;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.type {
							color: #0065ff;
							display: inline-block;
							&.bug {
								color: #d81e06;
							}
						}
						.level {
							color: #E6A23C;
							&.level-1 {
								color: #F56C6C;
							}
						}
						.key-link {
							color: #0052cc;
							font-size: 15px;
							font-weight: 500;
						}
						.points {
							padding: 0;
							width: 25px;
							height: 25px;
							font-size: 12px;
							transform: scale(0.75);
						}
					}
				}
			}
		}
		.between-space {
			height: 100%;
			padding: 0 5px 10px 0 !important;
			padding: 0 4px;
			border-left: 1px solid #f4f5f7;
			border-right: 1px solid #f4f5f7;
			box-sizing: border-box;
		}
		.springt-wrap {
			height: 100%;
			padding-right: 10px !important;
			overflow-y: scroll;
			max-height: 100%;
			background: #f6f6f6;
			.springt {
				background: #f4f5f7;
				padding-left: 4px;
				box-shadow: 0 0 1px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
				margin-bottom: 10px;
				box-sizing: border-box;
				align-items: center;
				text-indent: 5px;
				cursor: move;
				position: relative;
				border-top: 1px solid #f6f6f6;
				white-space: nowrap;
				.el-collapse-item {
					.el-collapse-item__header {
						background: #f4f5f7 !important;
						.springt-title {
							height: 40px;
							font-size: 14px;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.triggerSprint {
								transform: rotate(-90deg) scale(0.8);
								background-color: #909399;
								border-color: #909399;
								color: #fff;
								padding: 0;
								font-size: 12px;
							}
							.btn-points {
								font-size: 12px;
								font-weight: 600;
								color: #fff;
								border-radius: 3px;
								background: #E6A23C;
								width: 32px;
								height: 20px;
								display: inline-block;
							}
							.title {
								font-weight: 600;
								font-size: 14px;
								color: #172b4d;
								padding: 0 10px 0 0;
							}
							.issus-count {
								font-size: 13px;
								font-weight: 600;
							}
							.btn-header {
								padding: 2px 3px;
								height: 25px;
								float: right;
								font-size: 12px;
							}
							.status {
								color: #fff;
								padding: 1px 2px;
								font-size: 12px;
								border-radius: 4px;
								box-sizing: border-box;
								height: 20px;
								font-weight: 600;
								background-color: #909399;
								border-color: #909399;
								&.doing {
									background-color: #00875a;
									border-color: #00875a;
								}
								&.count {
									background-color: #E6A23C;
									border-color: #E6A23C;
								}
							}
						}
					}
					.el-collapse-item__content {
						padding-bottom: 0;
					}
				}
				.sprint-ul {
					max-height: 400px;
					overflow-y: scroll;
				}
			}
		}
	}
	.springt-wrap, .sprint-ul{
		.el-collapse {
			border: none !important;
		}
		&::-webkit-scrollbar {
			width: 3px;
			height: 5px;
		}
		&::-webkit-scrollbar-thumb {
				border-radius: 10px;
				box-shadow: inset 0 0 5px #f93;
				background: #535353;
		}
		&::-webkit-scrollbar-track {
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: #ededed;
		}
	}
}
</style>
