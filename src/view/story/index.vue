<template>
	<div id="story">
		<el-row class="story-backlog">
			<el-col :span="3" class="between-space">
				<div class="nav-relation">
					<div class="nav-main">
						<div class="nav-header"></div>
						<el-input placeholder="事务号查询INHOPE-" v-model="affairVal" size="mini" class="input-affiar">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
						<ul class="nav-ul">
							<div class="header-title">执行状态<el-button size="mini" icon="el-icon-edit" class="btn-edit" type="warning"></el-button></div>
							<ul v-for="p of progressStateList"
									:key="p.link"
									@dragleave="dragleave(p)"
									@dragover="dragover($event, p)"
									@drop="drop(p)"
									:class="{'dropStatus': p.dropStatus}"
									class="status-implement">
								<li :class="['info-status', p.link]">{{p.name}}</li>
							</ul>
							<div class="type-list header-title">模块类型<el-button size="mini" icon="el-icon-edit" class="btn-edit" type="warning"></el-button></div>
							<div class="item-type-ul scroll-style-none">
								<div v-for="p of modulesList"
										 :key="p.link"
										 @dragleave="dragleave(p)"
									   @dragover="dragover($event, p)"
										 class="status-implement"
										 :class="{'dropStatus': p.dropStatus}"
										 @drop='drop(p)'>
									<li :class="['info-status', p.link]">{{p.name}}</li>
								</div>
							</div>
							<div class="type-list header-title">已关闭Sprint<el-button size="mini" icon="el-icon-edit" class="btn-edit" type="warning"></el-button></div>
							<ul class="item-type-sprint scroll-style-none">
								<li v-for="el of sprints" :key="el.id" class="item-sprint" id="item-sprint">
									<span class="title">{{el.title}}</span>
									<div>
										<span class="issus-count">{{el.count}} </span>
										问题
									</div>
								</li>
							</ul>
						</ul>
					</div>
				</div>
			</el-col>
			<el-col :span="sprintLen" class="backlog-wrap scroll-style-theme1">
				<template v-for="el of sprints">
					<div class="backlog" v-if="el.status === 'doing'" :key="el.id">
						<div class="backlog-title">
							<div>
								<el-button type="text" size="mini" class="trigger-sprint" @click="el.visible = !el.visible"><i :class="[el.visible ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i></el-button>
								<span class="title">{{el.title}}</span>
								<span class="issus-count">{{el.count}} 问题</span>
								<span class="status" :class="[el.status]">{{el.status === 'doing' ? 'open' : 'close'}}</span>
								<span class="date">{{el. createTime}} <i class="iconfont icon-weibiaoti29"></i> {{el. endTime}}</span>
							</div>
							<span class="status count">{{el.pointsTotal}}</span>
						</div>
						<v-draggleList v-show="el.visible"
													 v-loading="sprintLoading"
													 :list="el.issueList"
													 group="backlog"
													 :dropDraggleObj="dropDraggleObj"
													 @endDraggable="endDraggable"
													 @handleDetail="handleDetail"></v-draggleList>
					</div>
				</template>
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<span class="title">Backlog</span>
							<span class="issus-count">{{backlogTotal}} 问题</span>
						</div>
						<div>
							<el-button type="warning" size="mini" class="btn" @click="hc_addIssue()">new Issue</el-button>
							<el-button type="warning" size="mini" class="btn" @click="dialogTableVisible = true">new Sprint</el-button>
						</div>
					</div>
					<v-draggleList v-loading="backlogLoading" :list="backlogList" handle=".handle" :group="{ name: 'backlog', pull: true, put: false }"></v-draggleList>
				</div>
			</el-col>
			<el-col class="sprint-detail" :span="21 - sprintLen" v-if="sprintLen !== 21">
				<v-sprint-detail class="detail-container" :sprintdetailData="sprintdetailData" @closeDetail="closeDetail"></v-sprint-detail>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import draggleList from './component/storyList'
import sprintDetail from './component/storyDetail'
import {modulesList, progressStateList, sortGroup} from './storyConstant'
export default {
	data() {
		progressStateList.forEach(item => {
			item.dropStatus = false
			item.type = 'implement'
		})
		modulesList.forEach(item => {
			item.type = 'module'
		})

		return {
			dialogTableVisible: false,
			sprintData: [],
			sortGroup,
			selecType: null,
			backlogList: [],
			sprints: [],
			sprintLen: 21,
			modulesList,
			progressStateList,
			backlogTotal: 0,
			backlogLoading: false,
			sprintLoading: false,
			activeCollapse: 0,
			affairVal: '',
			dropDraggleObj: null, // sprint列表拖动到左侧导航栏时的数据
			sprintdetailData: null
		}
	},
	components: {
		'v-draggleList': draggleList,
		'v-sprint-detail': sprintDetail
	},
	created() {
		this.getbacklogList()
		this.getsprintList()
	},
	methods: {
		hc_addIssue() {
			this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
				callback: action => {
					this.$message({
						type: 'info',
						message: `action: ${action}`
					});
				}
			})
		},
		// 请求数据
		endDraggable(obj) {
			if (this.dropDraggleObj) {
				// this.$axios.sprint.
				setTimeout(() => {
					this.dropDraggleObj = null;
				}, 4000);
			}
		},
		dragleave(obj) {
			this.$set(obj, 'dropStatus', false)
		},
		dragover(e, obj) {
			e.preventDefault()
			this.$set(obj, 'dropStatus', true)
		},
		drop(obj) {
			this.$set(obj, 'dropStatus', false)
			this.dropDraggleObj = obj
		},
		closeDetail() {
			this.sprintLen = 21;
		},
		handleDetail(v) {
			this.sprintLen = 14;
			this.sprintdetailData = v;
			this.highlightSelectedList(v.link)
		},
		// css & 拖动列表高亮
		highlightSelectedList(key) {
			let currentDOM = document.querySelector(`.item[data-key="${key}"]`);
			let allDraggableList = document.querySelectorAll(`.item[data-key`);

			allDraggableList.forEach(el => {
				el.classList.remove('light')
			})
			currentDOM.classList.add('light')
		},
		getsprintList() {
			this.$axios.sprints.sprintList({type: 'sprint'}).then(v => {
				this.sprints = v.sprintList.map(v => ({...v, visible: true}))
			})
		},
		getbacklogList() {
			this.backlogLoading = true
			this.$axios.sprints.backlogList({type: 'backlog'}).then(v => {
				setTimeout(() => {
					this.backlogList = v.sprintList.map(v => ({
						...v,
						selected: false
					}))
					this.backlogTotal = v.total
					this.backlogLoading = false
				}, 500);
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
$color-highColor: #172b4d;;
$bg-big:  #f4f5f7;

#story {
	margin: auto;
	position: fixed;
	top: 40px;
	left: 0px;
	right: 5px;
	bottom: 0px;
	.story-backlog {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		top: 0;
		.backlog-wrap {
			height: 100%;
			overflow-y: scroll;
			box-sizing: border-box;
			.backlog {
				margin: 0 0 20px;
				padding: 0 10px;
				&:last-child{
					margin-bottom: 0;
				}
				.backlog-title {
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					line-height: 40px;
					padding: 0 10px;
					position: sticky;
					top: 0;
					z-index: 19;
					background: #f4f5f7;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.trigger-sprint {
						padding: 0px;
						background-color: rgba(0, 0, 0, 0.5);
						color: #fff;
						margin-right: 3px;
					}
					.title {
						font-weight: 600;
						font-size: 16px;
						color: #172b4d;
						padding: 0 10px 0 0;
					}
					.issus-count {
						font-size: 14px;
						font-weight: 600;
					}
					.date {
						font-size: 14px;
					}
					.status {
						color: #fff;
						padding: 1px 2px;
						font-size: 12px;
						border-radius: 4px;
						box-sizing: border-box;
						height: 20px;
						text-align: left;
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
							line-height: 16px;
							height: 16px;
							font-size: 12px;
							padding: 0 7px;
							border-radius: 3px;
						}
					}
					.backlog-select {
						width: 100px;
						float: right;
						padding: 0;
						font-weight: 600;
						font-size: 14px;
						color: #409EFF !important;
						background: transparent;
						.el-input__inner {
							color: #409EFF !important;
							background: #ecf5ff;
							border-color: #b3d8ff;
							outline:none;
						}
					}
					.btn {
						padding: 1px 3px;
						height: 25px;
						float: right;
						font-size: 12px;
						margin: 5px;
						color: #fff;
					}
				}
			}
			.sprint {
				margin-bottom: 30px;
				background: #f4f5f7;
				padding: 10px;
				box-sizing: border-box;
				.sprintlist {
					position: sticky;
					top: 0;
					z-index: 20;
				}
				.sprint-ul {
					box-sizing: border-box;
					.count {
						float: right;
					}
				}
			}
		}
		.between-space {
			height: 100%;
			box-sizing: border-box;
			.nav-relation {
				height: 100%;
				box-sizing: border-box;
				overflow: hidden;
				text-align: left;
				border-right: 1px solid rgba(9,30,66,0.31);
				.nav-main {
					background: #fff;
					height: 100%;
					text-align: left;
					box-sizing: border-box;
					.input-affiar {
						font-size: 12px;
						padding: 5px;
						box-sizing: border-box;
						.btn-search {
							color: #fff;
							height: 24px;
							font-size: 12px;
						}
					}
					.nav-ul {
						height: calc(100% - 40px);
						cursor: default;
						font-weight: 600;
						border-top: 1px solid rgba(0, 0, 0, 0.1);
						.btn-edit {
							padding: 3px;
							color: #fff;
						}
						.header-title {
							text-align: left;
							padding: 3px 4px;
							background-color: rgba(0, 0, 0, 0.1);
							display: flex;
							font-size: 15px;
							justify-content: space-between;
							box-sizing: border-box;
							align-items: center;
						}
						.status-implement {
							height: 40px;
							line-height: 40px;
							text-indent: 4px;
							font-weight: 400;
							font-size: 14px;
							border: 2px solid transparent;
							border-right: none;
							&.dropStatus {
								border: 2px dotted #00875a;
							}
						}
						.item-type-ul {
							height: 200px;
							overflow-y: scroll;
						}
						.item-type-sprint {
							height: calc(100% - 415px);
							overflow-y: scroll;
							.item-sprint {
								font-size: 12px;
								display: flex;
								justify-content: space-between;
								align-items: center;
								padding: 0 4px;
								.issus-count {
									padding: 0 2px;
									text-align: center;
									background: #E6A23C;
									border-radius: 4px;
									text-align: center;
									box-sizing: border-box;
									color: #fff;
									font-size: 12px;
									margin-right: 3px;
								}
							}
						}
						li {
							width: 100%;
							position: relative;
							list-style: none;
							height: 40px;
							line-height: 40px;
							text-align: left;
							font-size: 14px;
							cursor: default;
							text-indent: 10px;
							font-weight: 400;
							border-bottom: 1px solid rgba(0, 0, 0, 0.1);
							&::before {
								content: '';
								position: absolute;
								right: 0;
								height: 100%;
								position: absolute;
								text-indent: -9999em;
								top: 0;
								width: 3px;
								border-top-left-radius: 3px;
								border-bottom-left-radius: 3px;
							}
							&.not-start {
								border-bottom: 1px solid rgba(0, 0, 0, 0.1);
								&::before {
									background-color: #f93;
								}
							}
							&.doing {
								border-bottom: 1px solid rgba(0, 0, 0, 0.1);
								&::before {
									background-color: #00875a;
								}
							}
							&.finish {
								border-bottom: 1px solid rgba(0, 0, 0, 0.1);
								&::before {
									background-color: #0065ff;
								}
							}
							&.article {
								&::before {
									background-color: rgb(89,142,212);
								}
							}
							&.story {
								&::before {
									background-color: #5243aa;
								}
							}
							&.thus {
								&::before {
									background-color: #ffab00;
								}
							}
							&.dashboard {
								&::before {
									background-color: #383e56;
								}
							}
							&.seekKnowledge {
								&::before {
									background-color: #f69e7b;
								}
							}
							&.kitchen {
								&::before {
									background-color: #d4b5b0;
								}
							}
							&.tour {
								&::before {
									background-color: #99d8d0;
								}
							}
							&.loupan {
								&::before {
									background-color: #fc9d9d;
								}
							}
							&.existence {
								&::before {
									background-color: #436f8a;
								}
							}
							&.Sketch {
								&::before {
									background-color: #184d47;
								}
							}
							&.universe {
								&::before {
									background-color: #fa7d09;
								}
							}
						}
					}
				}
			}
		}
		.sprint-detail {
			height: 100%;
			height: 100%;
			padding-left: 10px;
			box-sizing: border-box;
		}
	}
}
</style>
