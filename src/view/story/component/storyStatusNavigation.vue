<template>
  <div id="storyStatusNavtgation">
    <div class="nav-main">
      <div class="module">
        <div class="module-title">执行状态</div>
        <ul class="scroll-style-none">
          <li
            v-for="list of progressStateList"
            :key="list.guid"
            @dragleave="dragleave(list)"
            @dragover.prevent="dragover($event, list)"
            @drop="drop(list)"
            :class="[list.dropStatus ? 'dropStatus': '', list.link]">
            <span :class="[list.link]">{{list.name}}</span>
          </li>
        </ul>
      </div>
      <div class="module module-type">
        <div class="module-title">
          模块类型
          <el-button size="mini" icon="el-icon-edit" class="module-edit" @click="handleClickModuleDialog"></el-button>
        </div>
        <ul class="scroll-style-none module-ul">
          <li
            v-for="list of moduleList"
            :key="list.guid"
            @dragleave="dragleave(list)"
            @dragover.prevent="dragover($event, list)"
            @drop="drop(list)"
            :class="{'dropStatus': list.dropStatus}">
            <span>{{list.name}}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="module navgation scroll-style-none">
        <div class="module-title">
          附加链接
          <el-button size="mini" icon="el-icon-edit" class="module-edit" type="text"></el-button>
        </div>
        <ul class="scroll-style-none">
          <li v-for="p of thusList"
              :key="p.name"
              :title="p.name"
              @click="handlelinkClick(p.link)">
              <i class="iconfont icon-fenxiang"></i>
              {{p.name}}
          </li>
        </ul>
      </div> -->
    </div>
    <uxo-dialogNavigationModule :visibleDialogModule="visibleDialogModule" @closeVisibleDialogModule="closeVisibleDialogModule"></uxo-dialogNavigationModule>
  </div>
</template>
<script>
import dialogNavigationModule from './dialogNavigationModule'

export default {
  data() {
    return {
      thusList: [],
      moduleList: [],
      progressStateList: [],
      loadingNav: false,
      visibleDialogModule: false // 模块类型 - 编辑弹框
    }
  },
  components: {
    'uxo-dialogNavigationModule': dialogNavigationModule
  },
  created() {
    this.getThusList()
    this.getModuleList();
    this.getProgressStateList();
  },
  methods: {
    // 获取执行状态列表
    getProgressStateList() {
			this.$axios.sprints.getProgressStateList().then(obj => {
        let sortVal = ['not-start', 'doing', 'finish', 'close']
        let progressStateList = obj.progressStateList.map(v => ({...v, dropStatus: false, type: 'progressState'})) || []

        progressStateList.sort((a, b) => sortVal.indexOf(a.link) - sortVal.indexOf(b.link))

        this.progressStateList = progressStateList;
        this.$store.commit('progressStateList', progressStateList);
			})
		},
    getModuleList() {
			this.$axios.sprints.getModuleList().then(obj => {
        this.moduleList = obj.moduleList.map(v => ({...v, dropStatus: false, type: 'module'})) || []
         this.$store.commit('moduleList', this.moduleList);
			})
		},
    closeVisibleDialogModule() {
      this.visibleDialogModule = false;
    },
    handleClickModuleDialog() {
      this.visibleDialogModule = true;
    },
    handlelinkClick(link) {
			window.open(link)
		},
    getThusList() {
			this.loadingNav = true;
			this.$axios.thus.list().then(v => {
				setTimeout(() => {
					this.thusList = v
					this.loadingNav = false;
				}, 600);
			})
		},
    dragleave(obj) {
			this.$set(obj, 'dropStatus', false)
		},
		dragover(e, obj) {
      if (!obj.dropStatus) {
        this.$set(obj, 'dropStatus', true)
      }
		},
		drop(obj) {
      this.$set(obj, 'dropStatus', false)
      this.$emit('dropDownStatus', obj)
		}
  }
}
</script>
<style lang="scss" scoped>
#storyStatusNavtgation {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 40px;
  box-sizing: border-box;
  border-right: 1px solid rgba(9,30,66,0.31);
  .nav-main {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    .module {
      &.module-type {
        flex: 1;
        overflow-y: scroll;
      }
      .module-title {
        height: 34px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 3px 7px 3px 20px;
        background: #409EFF;
        font-weight: 600;
        color: #fff;
        background: #3282b8;
        font-size: 14px;
        .module-edit {
          padding: 3px 4px;
          color: #3282b8;
        }
      }
      ul {
        overflow-y: scroll;
        &.module-ul {
           height: calc(100% - 40px);
          li {
            &::before {
              content: '';
              background: #0006;
            }
          }
        }
        li {
          background: #fff;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          margin-bottom: 0;
          user-select: text;
          box-sizing: border-box;
          align-items: center;
          text-indent: 10px;
          position: relative;
          border-top: 1px solid #f6f6f6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          cursor: default;
          &:last-child {
            border-bottom: 1px solid #f6f6f6;
          }
          &.dropStatus {
            background: #EBEEF5;
            &::before {
              background: #ffab00;
            }
          }
          &::before {
            content: '';
            position: absolute;
            right: 0;
            height: 100%;
            text-indent: -9999em;
            top: 0;
            width: 3px;
            background: #0006;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
          }
          &.not-start {
            &::before {
              background-color: #00875a;
            }
          }
          &.doing {
            &::before {
              background-color: #ffab00;
            }
          }
          &.finish {
            &::before {
              background-color: #0006;
            }
          }
        }
      }
      &.navgation {
        text-overflow: ellipsis;
        word-break: break-all;
        border-top: 1px solid #e6e6e6;
        flex: 1;
        overflow-y: scroll;
        .module-title {
          position: sticky;
          z-index: 100;
          top: 0;
        }
        ul {
          max-height: none;
          overflow-y: scroll;
          li {
            font-size: 12px;
            cursor: pointer;
            &:hover {
              background: #f6f6f6;
              text-decoration: underline;
              color: #0065ff;
            }
            .iconfont {
              color: #0065ff;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
