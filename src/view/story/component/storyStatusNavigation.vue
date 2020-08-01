<template>
  <div id="storyStatusNavtgation">
    <div class="nav-main">
      <div class="module">
        <div class="module-title">执行状态</div>
        <ul>
          <li v-for="p of progressStateList"
              :key="p.link"
              @dragleave="dragleave(p)"
              @dragover="dragover($event, p)"
              @drop="drop(p)"
              :class="[p.dropStatus ? 'dropStatus': '', p.link]">
            <span :class="[p.link]">{{p.name}}</span>
          </li>
        </ul>
      </div>
      <div class="module">
        <div class="module-title">
          模块类型
          <el-button size="mini" icon="el-icon-edit" class="module-edit" type="text"></el-button>
        </div>
        <ul class="scroll-style-none module-ul">
          <li v-for="p of modulesList"
              :key="p.link"
              @dragleave="dragleave(p)"
              @dragover="dragover($event, p)"
              @drop="drop(p)"
              :class="{'dropStatus': p.dropStatus}">
            <span :class="[p.link]">{{p.name}}</span>
          </li>
        </ul>
      </div>
      <div class="module navgation scroll-style-none">
        <div class="module-title">
          附加链接
          <el-button size="mini" icon="el-icon-edit" class="module-edit" type="text"></el-button>
        </div>
        <ul>
          <li v-for="p of thusList"
              :key="p.name"
              :title="p.name"
              @click="handlelinkClick(p.link)">
              <i class="iconfont icon-fenxiang"></i>
              {{p.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {modulesList, progressStateList} from './storyConstant'

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
      progressStateList,
      modulesList,
      thusList: [],
      loadingNav: false
    }
  },
  created() {
    this.getThusList()
  },
  methods: {
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
			e.preventDefault()
			this.$set(obj, 'dropStatus', true)
		},
		drop(obj) {
			this.$set(obj, 'dropStatus', false)
      this.dropDraggleObj = obj
      this.$emit('dropDownStatus', obj);
		}
  }
}
</script>
<style lang="scss">
#storyStatusNavtgation {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
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
      .module-title {
        height: 34px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 3px 7px 3px 20px;
        background: #EBEEF5;
        font-size: 14px;
      }
      ul {
        max-height: 270px;
        overflow-y: scroll;
        &.module-ul {
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
          font-size: 12px;
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
          &.dropStatus {
            background: #EBEEF5;
          }
          &::before {
            content: '';
            position: absolute;
            right: 0;
            height: 100%;
            text-indent: -9999em;
            top: 0;
            width: 3px;
            background: #00875a;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
          }
          &.not-start {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            &::before {
              background-color: #00875a;
            }
          }
          &.doing {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            &::before {
              background-color: #f93;
            }
          }
          &.finish {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
          z-index: 200;
          top: 0;
          background: #EBEEF5;
        }
        ul {
          max-height: none;
          overflow-y: scroll;
          li {
            font-weight: 600;
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
