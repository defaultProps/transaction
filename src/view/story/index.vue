<template>
	<div id="moduleStory">
		<el-row class="story-backlog" id="storyBacklog">
			<el-col :span="3" class="storyNavigation" v-show="visibleNavigation">
				<v-storyStatusNavigation
					:modulesList="modulesList"
					:progressStateList="progressStateList"
					@dropDownStatus="dropDownStatus"></v-storyStatusNavigation>
			</el-col>
			<el-button size="small" class="triggernavgation" @click="handleClickvisibleNavigation">
				<i :class="[visibleNavigation ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"></i>
			</el-button>
			<el-col :span="sprintLen" class="scroll-style-theme1" id="backlogDetailWrapper">
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<span size="mini" :class="{'visibleSprint': visibleSprint}" @click="visibleSprint = !visibleSprint" class="header-expander">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="10"><g fill="none" fill-rule="evenodd"><path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#344563"></path></g></svg>
							</span>
							<span class="title">当前活跃Sprint</span>
							<span class="issus-count">{{activeSprint.issueList.length}} 问题</span>
							<span class="date">{{activeSprint. createTime}} <i class="iconfont icon-weibiaoti29"></i> {{activeSprint.endTime}}</span>
						</div>
					</div>
					<v-draggleList :issueList="activeSprint.issueList"
													:dropDraggleObj="dropDraggleObj"
													group="backlog"
													v-show="visibleSprint"
													:sprintType="'active'"
													@endDraggable="endDraggable"
													@handleDetail="handleDetail"></v-draggleList>
				</div>
				<div class="backlog">
					<div class="backlog-title">
						<div>
							<span class="title">Backlog</span>
							<span class="issus-count">{{backlogSprint.length}} 问题</span>
						</div>
						<div>
							<el-button size="mini" @click="dialogTableVisible = true" icon="el-icon-circle-plus" type="primary">新建Issue</el-button>
						</div>
					</div>
					<v-draggleList handle=".handle"
												 :sprintType="'backlog'"
												 @handleDetail="handleDetail"
												 :dropDraggleObj="dropDraggleObj"
												 @endDraggable="endDraggable"
												 :issueList="backlogSprint"
												 :group="{ name: 'backlog', pull: true, put: true }"></v-draggleList>
				</div>
			</el-col>
			<!-- 分离detail分离至top parent -->
			<el-col id="sprintDetailWrapper" :span="detailLen">
				<v-sprintDetail class="detail-container"
											  :sprintLink="activeLightLink"
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
import { modulesList, progressStateList } from './component//storyConstant'

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
			modulesList,
			progressStateList,
			visibleSprint: true,
			dialogTableVisible: false,
			sprintData: [],
			selecType: null,
			backlogSprint: [],
			activeSprint: {
				issueList: []
			},
			visibleNavigation: true, // 是否显示左侧状态栏
			backlogLoading: false,
			sprintLoading: false,
			activeCollapse: 0,
			activeLightLink: '', // 当前高亮选中link
			affairVal: '',
			sprintLen: 21,
			dropDraggleObj: null // sprint列表拖动到左侧导航栏时的数据
		}
	},
	computed: {
		detailLen: function() {
			return  (this.visibleNavigation ? 21 : 24) - this.sprintLen;
		}
	},
	provide() {
		return {
			modulesList: this.modulesList,
			progressStateList: this.progressStateList,
			highlightSelectedList: this.highlightSelectedList
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
		// 请求数据
		endDraggable(obj) {
			this.highlightSelectedList(this.activeLightLink);
			if (this.dropDraggleObj) {
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
		closeDetail(hasDraggle) {
			this.activeLightLink = null;
			this.highlightSelectedList()
			this.renderlayout(hasDraggle)
		},
		handleDetail(v) {
			this.activeLightLink = v.guid;
			this.renderlayout()
			this.highlightSelectedList(this.activeLightLink)
		},
		// css - 排版 - 左侧导航关闭
		handleClickvisibleNavigation() {
			this.visibleNavigation = !this.visibleNavigation;
			this.renderlayout();
		},
		renderlayout(hasDraggle = true) {
			if (this.visibleNavigation) {
				this.sprintLen = this.activeLightLink ? 15 : 21;
			} else {
				this.sprintLen = this.activeLightLink ? 18 : 24;
			}
			console.log(this.visibleNavigation, this.activeLightLink, this.sprintLen)
			if (hasDraggle) {
				document.getElementById('backlogDetailWrapper').style.width = this.sprintLen / 24 * 100 + '%'
				document.getElementById('sprintDetailWrapper').style.width = this.detailLen / 24 * 100 + '%'
			}
		},
		// css & 拖动列表高亮
		highlightSelectedList(key) {
			let dom = document.querySelector(`.item[data-key="${key}"]`);
			let allDraggableList = document.querySelectorAll(`.item[data-key]`);

			allDraggableList.forEach(el => {
				el.classList.remove('light')
			})

			if (key && dom) {
				dom.classList.add('light')
			}
		},
		getsprintList() {
			this.$axios.sprints.activeSprintList({type: 'sprint'}).then(activeSprint => {
				this.activeSprint = activeSprint;
			})
		},
		getbacklogList() {
			this.backlogLoading = true
			this.$axios.sprints.backlogSprintList({type: 'backlog'}).then(backlogSprint => {
				this.backlogLoading = false
				this.backlogSprint = backlogSprint.issueList
			})
		}
	}
}
</script>
<style lang="scss">
$color-highColor: #172b4d;;
$bg-big:  #f4f5f7;

#moduleStory {
	.triggernavgation {
    float: right;
    color: #172b4d;;
    font-size: 16px;
    font-weight: 600;
    background: #EBEEF5;
		position: fixed;
		bottom: 5px;
		left: 5px;
		z-index: 100;
  }
	.story-backlog {
		position: fixed;
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
					height: 45px;
					font-size: 16px;
					padding: 0 10px;
					position: sticky;
					top: 0;
					z-index: 19;
					background: #f4f5f7;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.header-expander {
						padding: 2px 3px;
						cursor: pointer;
						position: relative;
						display: inline-block;
						background-color: #f4f5f7;
						color: #fff;
						margin-right: 3px;
						transform: rotate(-90deg);
						&.visibleSprint {
							transform: rotate(0);
						}
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
							margin-left: 10px;
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
