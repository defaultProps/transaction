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
							<div v-for="p of implementStatusList" :key="p.value" class="item">
								<li :class="['info-status', p.value]">{{p.name}}</li>
							</div>
							<div class="type-list status">模块类型</div>
							<div class="item-type-ul">
								<div v-for="p of backlogTypeList" :key="p.value">
									<li :class="['info-status', p.link]">{{p.name}}</li>
								</div>
							</div>
							<div class="type-list status">已关闭Sprint</div>
							<ul class="item-type-sprint">
								<li v-for="el of sprints" :key="el.id" class="item-sprint">
									<span class="title">{{el.title}}</span>
									<span class="issus-count">{{el.count}} </span>问题
								</li>
							</ul>
						</ul>
					</div>
				</div>
			</el-col>
			<el-col :span="20" class="backlog-wrap">
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
						<v-draggleList v-show="el.visible" v-loading="sprintLoading" :list="el.issueList" group="backlog"></v-draggleList>
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
							<el-button type="warning" size="mini" class="btn">new Sprint</el-button>
						</div>
					</div>
					<v-draggleList v-loading="backlogLoading" :list="backlogList" handle=".handle" :group="{ name: 'backlog', pull: true, put: false }"></v-draggleList>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import draggleList from './component/list'
import draggable from 'vuedraggable'

export default {
	data() {
		let implementStatusList = [
			{name: '未开始', value: 'not-start'},
			{name: '进行中...', value: 'doing'},
			{name: '已完成', value: 'finish'}
		];
		let backlogTypeList = [
			{name: '大块文章', link: 'article'},
			{name: '繁琐事务', link: 'story'},
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
			sortGroup,
			selecType: null,
			backlogList: [],
			sprints: [],
			backlogTypeList,
			implementStatusList,
			backlogTotal: 0,
			backlogLoading: false,
			sprintLoading: false,
			activeCollapse: 0,
			affairVal: ''
		}
	},
	components: {
		'v-draggleList': draggleList,
		'xx-draggable': draggable
	},
	created() {
		this.getbacklogList()
		this.getsprintList()
	},
	methods: {
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
						visible: true
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
						border-top: 1px solid rgba(9,30,66,0.31);
						.status {
							text-align: center;
							padding: 5px 0;
							background: #0747a6;
							color: #fff;
						}
						.item-type-ul {
							height: 200px;
							overflow-y: scroll;
						}
						.item-type-sprint {
							height: calc(100% - 415px);
							overflow-y: scroll;
							.item-sprint {
								.issus-count {
									padding: 1px;
									background: #E6A23C;
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
							border-bottom: 1px solid rgba(9,30,66,0.31);
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
									background-color: #ffab00;
								}
							}
							&.seekKnowledge {
								&::before {
									background-color: #ffab00;
								}
							}
							&.kitchen {
								&::before {
									background-color: #ffab00;
								}
							}
							&.tour {
								&::before {
									background-color: #ffab00;
								}
							}
							&.loupan {
								&::before {
									background-color: #ffab00;
								}
							}
							&.existence {
								&::before {
									background-color: #ffab00;
								}
							}
							&.Sketch {
								&::before {
									background-color: #ffab00;
								}
							}
							&.universe {
								&::before {
									background-color: #ffab00;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
