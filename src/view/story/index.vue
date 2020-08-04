<template>
	<div id="moduleStory">
		<el-row class="story-backlog" id="storyBacklog">
			<el-col :span="3" class="storyNavigation">
				<v-storyStatusNavigation @dropDownStatus="dropDownStatus"></v-storyStatusNavigation>
			</el-col>
			<el-col :span="sprintLen" class="scroll-style-theme1" id="backlogDetailWrapper">
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<div size="mini" :class="[activeSprint.visible ? 'el-icon-arrow-down' : 'el-icon-arrow-right']" class="trigger-sprint" @click="activeSprint.visible = !activeSprint.visible"></div>
							<span class="title">{{activeSprint.title}}</span>
							<span class="issus-count">{{activeSprint.total}} 问题</span>
							<span class="status">open</span>
							<span class="date">{{activeSprint. createTime}} <i class="iconfont icon-weibiaoti29"></i> {{activeSprint.endTime}}</span>
						</div>
						<span class="status count">{{activeSprint.points}}</span>
					</div>
					<v-draggleList v-show="activeSprint.visible"
													v-loading="sprintLoading"
													:list="activeSprint.issueList"
													:highlightSelectedList="highlightSelectedList"
													:dropDraggleObj="dropDraggleObj"
													group="backlog"
													:sprintType="'active'"
													@endDraggable="endDraggable"
													@handleDetail="handleDetail"></v-draggleList>
				</div>
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<span class="title">Backlog</span>
							<span class="issus-count">{{backlogTotal}} 问题</span>
						</div>
						<div>
							<el-button type="primary" size="mini" icon="el-icon-setting" class="btn config-btn">配置域上传<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
							<el-button type="primary" size="mini" class="btn" @click="hc_addissue()">new Sprint</el-button>
							<el-button type="primary" size="mini" class="btn" @click="dialogTableVisible = true">new Issue</el-button>
						</div>
					</div>
					<v-draggleList v-loading="backlogLoading"
										     handle=".handle"
												 :sprintType="'backlog'"
												 :list="backlogSprint.issueList"
												 :highlightSelectedList="highlightSelectedList"
												 :group="{ name: 'backlog', pull: true, put: true }"></v-draggleList>
				</div>
			</el-col>
			<!-- 分离detail分离至top parent -->
			<el-col id="sprintDetailWrapper" :span="detailLen">
				<v-sprintDetail class="detail-container"
											  :sprintdetailData="sprintdetailData"
												@closeDetail="closeDetail"></v-sprintDetail>
			</el-col>
		</el-row>
		<v-dialogNewIssus :dialogTableVisible="dialogTableVisible" @handleClose="handleClose"></v-dialogNewIssus>
	</div>
</template>
<script>
import draggleList from './component/storyList'
import storyStatusNavigation from './component/storyStatusNavigation'
import sprintDetail from './component/storyDetail'
import dialogNewIssus from './component/dialogNewIssus'

export default {
	data() {
		return {
			dialogTableVisible: false,
			sprintData: [],
			selecType: null,
			backlogSprint: [],
			activeSprint: {
				issueList: []
			},
			sprintLen: 21,
			backlogTotal: 0,
			backlogLoading: false,
			sprintLoading: false,
			activeCollapse: 0,
			affairVal: '',
			dropDraggleObj: null, // sprint列表拖动到左侧导航栏时的数据
			sprintdetailData: null
		}
	},
	computed: {
		detailLen: function() {
			return 21 - this.sprintLen;
		}
	},
	components: {
		'v-storyStatusNavigation': storyStatusNavigation,
		'v-draggleList': draggleList,
		'v-sprintDetail': sprintDetail,
		'v-dialogNewIssus': dialogNewIssus
	},
	created() {
		this.getbacklogList()
		this.getsprintList()
	},
	methods: {
		dropDownStatus(dropDownStatusObj) {
			this.dropDraggleObj = dropDownStatusObj
		},
		handleClose() {
			this.dialogTableVisible = false;
		},
		hc_addissue() {
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
			document.getElementById('backlogDetailWrapper').style.width = this.sprintLen / 24 * 100 + '%'
			document.getElementById('sprintDetailWrapper').style.width = '0%'
			this.highlightSelectedList()
		},
		handleDetail(v) {
			if (this.sprintLen === 21) {
				this.sprintLen = 15;
				document.getElementById('backlogDetailWrapper').style.width = this.sprintLen / 24 * 100 + '%'
				document.getElementById('sprintDetailWrapper').style.width = this.detailLen / 24 * 100 + '%'
			}

			this.sprintdetailData = v;
			this.highlightSelectedList(v.link)
		},
		// css & 拖动列表高亮
		highlightSelectedList(key) {
			let allDraggableList = document.querySelectorAll(`.item[data-key`);

			allDraggableList.forEach(el => {
				el.classList.remove('light')
			})

			if (document.querySelector(`.item[data-key="${key}"]`)) {
				document.querySelector(`.item[data-key="${key}"]`).classList.add('light')
			}
		},
		getsprintList() {
			this.$axios.sprints.sprintList({type: 'sprint'}).then(activeSprint => {
				let points = 0;

				activeSprint.issueList.forEach(v => {
					points += v.point
				})
				this.activeSprint = {...activeSprint, visible: true, points, total: activeSprint.issueList.length}
			})
		},
		getbacklogList() {
			this.backlogLoading = true
			this.$axios.sprints.backlogList({type: 'backlog'}).then(backlogSprint => {
				this.backlogLoading = false
				this.backlogTotal = backlogSprint.issueList.length;
				this.backlogSprint = backlogSprint
			})
		}
	}
}
</script>
<style lang="scss">
$color-highColor: #172b4d;;
$bg-big:  #f4f5f7;

#moduleStory {
	.story-backlog {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		top: 40px;
		// filter: blur(3px);
		box-sizing: border-box;
		#backlogDetailWrapper {
			height: 100%;
			overflow-y: scroll;
			box-sizing: border-box;
			.backlog {
				margin: 0 0 20px;
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
						border-radius: 4px;
						height: 14px;
						width: 14px;
						font-size: 14px;
						cursor: pointer;
						position: relative;
						display: inline-block;
						background-color: rgba(0, 0, 0, 0.5);
						color: #fff;
						margin-right: 3px;
					}
					.title {
						font-weight: 600;
						font-size: 16px;
						color: #172b4d;
						padding: 0 10px 0 0;
						max-width: 40px;
					}
					.item-meta {
						width: 60px;
					}
					.issus-count {
						font-size: 14px;
						font-weight: 600;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
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
						background-color: #00875a;
						border-color: #00875a;
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
		.storyNavigation {
			height: 100%;
			box-sizing: border-box;
		}
		#sprintDetailWrapper {
			height: 100%;
			height: 100%;
			box-sizing: border-box;
		}
	}
}
</style>
