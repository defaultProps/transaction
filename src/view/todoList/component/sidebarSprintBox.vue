<template>
  <div id="storyStatusNavtgation"
       class="scroll-style-none">
    <div class="nav-main">
      <div class="module scroll-style-none">
        <div class="module-title">
          执行状态
          <el-button type="primary"
                     size="mini"
                     @click="visibleProgressState = !visibleProgressState">
            <i :class="[visibleProgressState ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
          </el-button>
        </div>
        <ul v-show="visibleProgressState"
            class="scroll-style-none">
          <li v-for="list of progressStateList"
              :key="list.id"
              :class="[list.dropping ? 'dropping': '', list.link]"
              @dragleave="handleDragleave(list)"
              @dragover.prevent="handleDragover(list)"
              @drop="handleDrop(list)">
            <span :class="[list.link]">{{ list.name }}</span>
          </li>
        </ul>
      </div>
      <div class="module module-type scroll-style-none">
        <div class="module-title">
          模块类型
          <el-button-group>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="handleClickModuleDialog()"></el-button>
            <el-button type="primary"
                       size="mini"
                       @click="visibleModule = !visibleModule">
              <i :class="[visibleModule ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
            </el-button>
          </el-button-group>
        </div>
        <ul v-show="visibleModule"
            class="scroll-style-none module-ul">
          <li v-for="list of moduleList"
              :key="list.id"
              :class="{'dropping': list.dropping}"
              @dragleave="handleDragleave(list)"
              @dragover.prevent="handleDragover(list)"
              @drop="handleDrop(list)">
            <span>{{ list.name }}</span>
          </li>
        </ul>
      </div>
      <div class="module navgation">
        <div class="module-title">
          附加链接
          <el-button-group>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="handleClickNavgationDialog()"></el-button>
            <el-button type="primary"
                       size="mini"
                       @click="visiblenavgation = !visiblenavgation">
              <i :class="[visiblenavgation ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
            </el-button>
          </el-button-group>
        </div>
        <ul v-show="visiblenavgation"
            class="scroll-style-none">
          <li v-for="p of thridPartyLinks"
              :key="p.name"
              :title="p.name"
              @click="handlelinkClick(p.link)">
            <i class="iconfont icon-fenxiang"></i>
            {{ p.name }}
          </li>
        </ul>
        <div v-if="!thridPartyLinks"
             class="empty-box">
          <img src="@/assets/noInfo.png"
               alt="暂无数据"
               class="noinfo">
          暂无数据
        </div>
      </div>
    </div>
    <v-dialog-navigation-module-box :visibleDialogModule="visibleDialogModule"
                                    @closeVisibleDialogModule="closeVisibleDialogModule"></v-dialog-navigation-module-box>
  </div>
</template>
<script>
import dialogNavigationModule from './dialogNavigationModule'
import { sprintAxios } from '@/axios'
import { mapState } from 'vuex'

export default {
  components: {
    'v-dialog-navigation-module-box': dialogNavigationModule
  },
  data() {
    return {
      thridPartyLinks: [],
      moduleList: [],
      progressStateList: [],

      visibleProgressState: true,
      visibleModule: true,
      visiblenavgation: true,
      visibleDialogModule: false // 模块类型 - 编辑弹框
    }
  },
  computed: mapState({
    draggableObj: state => state.sprint.draggableObj
  }),
  inject: ['handleClickimplement'],
  mounted() {
    this.getThridPartyLinks()
    this.getModuleList()
    this.getProgressStateList()
  },
  methods: {
    // 获取执行状态列表
    getProgressStateList() {
      sprintAxios.getProgressStateList().then(obj => {
        let sortVal = ['not-start', 'doing', 'finish', 'close']
        let progressStateList = obj.progressStateList.map(v => ({ ...v, dropping: false, type: 'progressState' })) || []

        progressStateList.sort((a, b) => sortVal.indexOf(a.link) - sortVal.indexOf(b.link))

        this.progressStateList = progressStateList
        this.$store.commit('progressStateList', progressStateList)
        this.visibleProgressState = true
      })
    },
    getModuleList() {
      sprintAxios.getModuleList().then(obj => {
        this.moduleList = obj.moduleList.map(v => ({ ...v, dropping: false, type: 'module' })) || []
        this.$store.commit('moduleList', this.moduleList)
        this.visibleModule = true
      })
    },
    closeVisibleDialogModule() {
      this.visibleDialogModule = false
    },
    handleClickModuleDialog() {
      this.visibleDialogModule = true
    },
    handleClickNavgationDialog() {

    },
    handlelinkClick(link) {
      window.open(link)
    },
    getThridPartyLinks() {
      sprintAxios.thridPartyLinks().then(obj => {
        this.thridPartyLinks = obj.links
      })
    },
    handleDragleave(obj) {
      this.$set(obj, 'dropping', false)
    },
    handleDragover(obj) {
      if (!obj.dropping) {
        this.$set(obj, 'dropping', true)
      }
    },
    handleDrop(obj) {
      this.$set(obj, 'dropping', false)
      this.handleClickimplement(obj, this.draggableObj)
    }
  }
}
</script>
<style lang="scss" scoped>
#storyStatusNavtgation {
  box-sizing: border-box;
  overflow-y: scroll;
  border-right: 1px solid #0006;
  .nav-main {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    text-align: left;
    background: #fff;
    .module {
      .module-title {
        position: sticky;
        top: -1px;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        height: 34px;
        padding: 3px 7px 3px 10px;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        background: #3282b8;
        user-select: none;
        .module-edit {
          padding: 3px 4px;
          color: #3282b8;
        }
      }
      ul {
        &.module-ul {
          li {
            user-select: none;
            &::before {
              background: #0006;
              content: "";
            }
          }
        }
        li {
          position: relative;
          box-sizing: border-box;
          height: 35px;
          overflow: hidden;
          font-size: 14px;
          line-height: 35px;
          white-space: nowrap;
          text-indent: 10px;
          text-overflow: ellipsis;
          word-break: break-all;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          cursor: default;
          user-select: none;
          &.dropping {
            color: #3282b8;
            background: #ebeef5;

            &::before {
              background: #3282b8;
            }
          }
          &::before {
            position: absolute;
            top: 0;
            right: 0;
            width: 3px;
            height: 100%;
            text-indent: -9999em;
            background: #0006;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            content: "";
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
          &.close {
            &::before {
              background-color: #205081;
            }
          }
        }
      }
      &.navgation {
        ul {
          overflow-y: scroll;
          li {
            position: relative;
            margin: 2px 0;
            font-size: 14px;
            cursor: pointer;
            &::after {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #0065ff;
              transform: scale(0);
              transform-origin: left;
              transition: all 0.35s;
              content: "";
            }
            &:hover {
              color: #0065ff;
              background: #f6f6f6;
              &::after {
                transform: scale(1);
              }
            }
            .iconfont {
              color: #0065ff;
              font-size: 14px;
            }
          }
        }
      }
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 180px;
      overflow: hidden;
      color: #999;
      font-size: 12px;
      img {
        height: 47px;
      }
    }
  }
}
</style>
