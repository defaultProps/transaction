<template>
	<div id="story">
		<el-row class="story-backlog">
			<el-col :span="4" class="between-space">
				<div class="nav-relation">
					<div class="nav-main">
						<div class="nav-header"></div>
						<el-input placeholder="请输入事务号" v-model="affairVal" size="mini" class="input-affiar">
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
						<ul class="nav-ul">
							<div class="status">执行状态</div>
							<div v-for="p of progressStateList" :key="p.value" class="status-implement">
								<div :class="['info-status', p.value]"><i :class="['iconfont', p.icon]"></i>{{p.name}}</div>
							</div>
							<div class="type-list status">模块类型</div>
							<div class="item-type-ul scroll-style-none">
								<div v-for="p of backlogTypeList" :key="p.value">
									<li :class="['info-status', p.link]">{{p.name}}</li>
								</div>
							</div>
							<div class="type-list status">已关闭Sprint</div>
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
			<el-col :span="sprintLen" class="backlog-wrap">
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
						<v-draggleList v-show="el.visible" v-loading="sprintLoading" :list="el.issueList" group="backlog" @handleDetail="handleDetail"></v-draggleList>
					</div>
				</template>
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<span class="title">Backlog</span>
							<span class="issus-count">{{backlogTotal}} 问题</span>
						</div>
						<div>
							<el-button type="warning" size="mini" class="btn">new Issue</el-button>
							<el-button type="warning" size="mini" class="btn" @click="dialogTableVisible = true">new Sprint</el-button>
						</div>
					</div>
					<v-draggleList v-loading="backlogLoading" :list="backlogList" handle=".handle" :group="{ name: 'backlog', pull: true, put: false }"></v-draggleList>
				</div>
			</el-col>
			<el-col class="sprint-detail" :span="20 - sprintLen" v-if="sprintLen !== 20">
				<v-sprint-detail class="detail-container" :sprintdetailData="sprintdetailData"></v-sprint-detail>
			</el-col>
			<el-dialog title="issue" :visible.sync="dialogTableVisible">
				<el-table :data="sprintData">
					<el-table-column property="date" label="日期" width="150"></el-table-column>
					<el-table-column property="name" label="姓名" width="200"></el-table-column>
					<el-table-column property="address" label="地址"></el-table-column>
				</el-table>
			</el-dialog>
		</el-row>
	</div>
</template>
<script>
import draggleList from './component/list'
import draggable from 'vuedraggable'
import sprintDetail from './component/detail'

export default {
	data() {
		let progressStateList = [
			{name: '未开始', value: 'not-start', icon: 'el-icon-platform-eleme'},
			{name: '进行中...', value: 'doing', icon: 'el-icon-loading'},
			{name: '已完成', value: 'finish', icon: 'el-icon-mouse'}
		];
		let backlogTypeList = [
			{name: '大块文章', link: 'article'},
			{name: '事务分发', link: 'story'},
			{name: '兴趣使然', link: 'thus'},
			{name: '仪表盘', link: 'dashboard'},
			{name: '求知欲望', link: 'seekKnowledge'},
			{name: '美味厨房', link: 'kitchen'},
			{name: '途观旅游', link: 'tour'},
			{name: '市场楼盘', link: 'loupan'},
			{name: '原始生存', link: 'existence'},
			{name: '简单素描', link: 'Sketch'},
			{name: '眺望宇宙', link: 'universe'}
		]
		let sortGroup = [{
			label: '按类型排序',
			options: [{
				value: 'needs',
				label: '需求'
			}, {
				value: 'bug',
				label: 'BUG'
			}]
		}, {
			label: '按优先级排序',
			options: [{
				value: 'desc',
				label: '倒序'
			}, {
				value: 'dsc',
				label: '正序'
			}]
		}, {
			label: '按点排序',
			options: [{
				value: 'desc-point',
				label: '倒序'
			}, {
				value: 'dsc-point',
				label: '正序'
			}]
		}]
		return {
			sprintData: [],
			sortGroup,
			selecType: null,
			backlogList: [],
			sprints: [],
			sprintLen: 20,
			backlogTypeList,
			progressStateList,
			backlogTotal: 0,
			backlogLoading: false,
			sprintLoading: false,
			activeCollapse: 0,
			affairVal: '',
			sprintdetailData: null
		}
	},
	components: {
		'v-draggleList': draggleList,
		'xx-draggable': draggable,
		'v-sprint-detail': sprintDetail
	},
	created() {
		this.getbacklogList()
		this.getsprintList()
	},
	methods: {
		handleDetail(v) {
			this.sprintLen = 14;
			this.sprintdetailData = v;
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
			.backlog {
				background: #f4f5f7;
				padding: 10px;
				margin-bottom: 30px;
				&:last-child{
					margin-bottom: 0;
				}
				.backlog-title {
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					line-height: 40px;
					padding-right: 20px;
					position: sticky;
					top: 0;
					z-index: 1000;
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
					z-index: 1000;
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
					}
					.nav-ul {
						height: calc(100% - 40px);
						cursor: default;
						font-weight: 600;
						border-top: 1px solid rgba(0, 0, 0, 0.1);
						.status {
							text-align: left;
							padding: 5px 0;
							background-color: rgba(0, 0, 0, 0.1);
						}
						.status-implement {
							height: 35px;
							line-height: 35px;
							text-indent: 4px;
							font-weight: 400;
							font-size: 14px;
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
								&::before {
									background-color: #f93;
								}
							}
							&.doing {
								&::before {
									background-color: #00875a;
								}
							}
							&.finish {
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
			.detail-container {
				height: 100%;
			}
		}
	}
}
</style>
