<template>
  <div id="storyStatusNavtgation" class="scroll-style-none">
    <div class="nav-main">
      <div class="module scroll-style-none">
        <div class="module-title">
          执行状态
          <el-button type="primary" size="mini" @click="visibleProgressState = !visibleProgressState">
            <i :class="[visibleProgressState ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
          </el-button>
        </div>
        <ul class="scroll-style-none" v-show="visibleProgressState">
          <li v-for="list of progressStateList" :key="list.guid" @dragleave="dragleave(list)" @dragover.prevent="dragover($event, list)" @drop="drop(list)" :class="[list.dropStatus ? 'dropStatus': '', list.link]">
            <span :class="[list.link]">{{list.name}}</span>
          </li>
        </ul>
      </div>
      <div class="module module-type scroll-style-none">
        <div class="module-title">
          模块类型
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleClickModuleDialog()"></el-button>
            <el-button type="primary" size="mini" @click="visibleModule = !visibleModule">
              <i :class="[visibleModule ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
            </el-button>
          </el-button-group>
        </div>
        <ul class="scroll-style-none module-ul" v-show="visibleModule">
          <li v-for="list of moduleList" :key="list.guid" @dragleave="dragleave(list)" @dragover.prevent="dragover($event, list)" @drop="drop(list)" :class="{'dropStatus': list.dropStatus}">
            <span>{{list.name}}</span>
          </li>
        </ul>
      </div>
      <div class="module navgation">
        <div class="module-title">
          附加链接
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleClickNavgationDialog()"></el-button>
            <el-button type="primary" size="mini" @click="visiblenavgation = !visiblenavgation">
              <i :class="[visiblenavgation ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
            </el-button>
          </el-button-group>
        </div>
        <ul class="scroll-style-none" v-show="visiblenavgation">
          <li v-for="p of thusList" :key="p.name" :title="p.name" @click="handlelinkClick(p.link)">
            <i class="iconfont icon-fenxiang"></i>
            {{p.name}}
          </li>
        </ul>
      </div>
    </div>
    <uxo-dialogNavigationModule :visibleDialogModule="visibleDialogModule" @closeVisibleDialogModule="closeVisibleDialogModule"></uxo-dialogNavigationModule>
  </div>
</template>
<script>
import dialogNavigationModule from './dialogNavigationModule'

export default {
  data () {
    return {
      thusList: [],
      moduleList: [],
      progressStateList: [],
      loadingNav: false,

      visibleProgressState: true,
      visibleModule: true,
      visiblenavgation: true,
      visibleDialogModule: false // 模块类型 - 编辑弹框
    }
  },
  components: {
    'uxo-dialogNavigationModule': dialogNavigationModule
  },
  created () {
    this.getThusList()
    this.getModuleList();
    this.getProgressStateList();
  },
  methods: {
    // 获取执行状态列表
    getProgressStateList () {
      this.$axios.sprints.getProgressStateList().then(obj => {
        let sortVal = ['not-start', 'doing', 'finish', 'close']
        let progressStateList = obj.progressStateList.map(v => ({ ...v, dropStatus: false, type: 'progressState' })) || []

        progressStateList.sort((a, b) => sortVal.indexOf(a.link) - sortVal.indexOf(b.link))

        this.progressStateList = progressStateList;
        this.$store.commit('progressStateList', progressStateList);
        this.visibleProgressState = true;
      })
    },
    getModuleList () {
      this.$axios.sprints.getModuleList().then(obj => {
        this.moduleList = obj.moduleList.map(v => ({ ...v, dropStatus: false, type: 'module' })) || []
        this.$store.commit('moduleList', this.moduleList);
        this.visibleModule = true;
      })
    },
    closeVisibleDialogModule () {
      this.visibleDialogModule = false;
    },
    handleClickModuleDialog () {
      this.visibleDialogModule = true;
    },
    handleClickNavgationDialog () {

    },
    handlelinkClick (link) {
      window.open(link)
    },
    getThusList () {
      this.loadingNav = true;
      this.$axios.thus.list().then(v => {
        setTimeout(() => {
          this.thusList = v
          this.loadingNav = false;
        }, 600);
      })
    },
    dragleave (obj) {
      this.$set(obj, 'dropStatus', false)
    },
    dragover (e, obj) {
      if (!obj.dropStatus) {
        this.$set(obj, 'dropStatus', true)
      }
    },
    drop (obj) {
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
  padding-bottom: 40px;
  overflow-y: scroll;
  box-sizing: border-box;
  border-right: 1px solid #0006;
  .nav-main {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 100%;
    text-align: left;
    box-sizing: border-box;
    position: relative;
    .module {
      .module-title {
        height: 34px;
        box-sizing: border-box;
        display: flex;
        position: sticky;
        top: 0px;
        z-index: 2000;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 3px 7px 3px 10px;
        background: #409eff;
        font-weight: 600;
        color: #fff;
        user-select: none;
        background: #3282b8;
        font-size: 16px;
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
              content: "";
              background: #0006;
            }
          }
        }
        li {
          background: #fff;
          user-select: none;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          user-select: none;
          box-sizing: border-box;
          align-items: center;
          text-indent: 10px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          cursor: default;
          &.dropStatus {
            background: #ebeef5;
            color: #3282b8;
            &::before {
              background: #3282b8;
            }
          }
          &::before {
            content: "";
            position: absolute;
            right: 0;
            height: 100%;
            text-indent: -9999em;
            top: 0;
            width: 3px;
            background: #0006;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
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
            font-size: 14px;
            cursor: pointer;
            position: relative;
            margin: 2px 0;
            font-weight: 600;
            &::after {
              content: "";
              width: 100%;
              height: 2px;
              position: absolute;
              bottom: 0;
              left: 0;
              background: #0065ff; /*当前标签继承的文字颜色，这里让伪元素的背景色与父元素的文字颜色相同*/
              transition: all 0.35s;
              transform-origin: left;
              transform: scale(0);
            }
            &:hover {
              background: #f6f6f6;
              // text-decoration: underline;
              color: #0065ff;
              &::after {
                transform: scale(1);
              }
            }
            .iconfont {
              color: #0065ff;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
