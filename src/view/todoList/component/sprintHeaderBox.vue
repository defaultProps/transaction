<template>
  <div id="sortSprint">
    <el-button v-popover:type
               size="small"
               type="text"
               icon="el-icon-info"
               class="type"></el-button>
    <el-button v-popover:level
               size="small"
               type="text"
               icon="el-icon-info"
               class="level"></el-button>
    <el-button v-popover:title
               size="small"
               type="text"
               class="title">标题</el-button>
    <el-button v-popover:modules
               size="small"
               type="text"
               class="modules">模块</el-button>
    <el-button v-popover:status
               size="small"
               type="text"
               icon="el-icon-sort-down el-icon--right"
               class="status"
               @click="$emit('sortable', 'executiveMode')">状态</el-button>
    <el-popover ref="type"
                v-model="visibleType"
                placement="bottom">
      <div id="sortSprintMain">
        <div class="work">
          <el-button type="text">工作:</el-button>
          <el-button size="small"
                     type="text"
                     class="currentIcon">
            <i :class="[currentworkIcon, 'iconfont']"
               :style="{'color': issusTypeArr[0].color}"></i>
          </el-button>
          <el-button icon="el-icon-refresh"
                     size="small"
                     type="info"
                     class="btn"
                     @click="selectIcon('work')"></el-button>
        </div>
        <div class="life">
          <el-button type="text">生活:</el-button>
          <el-button size="small"
                     type="text"
                     class="currentIcon">
            <i :class="[currentLifeIcon, 'iconfont']"
               :style="{'color': issusTypeArr[1].color}"></i>
          </el-button>
          <el-button icon="el-icon-refresh"
                     size="small"
                     type="info"
                     class="btn"
                     @click="selectIcon('life')"></el-button>
        </div>
      </div>
    </el-popover>
    <el-popover ref="level"
                v-model="visibleLevel"
                placement="bottom"
                width="160">
      <div id="sortSprintMain">
        <div v-for="(item, index) in levelList"
             :key="index"
             class="work">
          <el-button type="text">{{ item.label }}:</el-button>
          <el-button size="small"
                     type="text"
                     class="currentIcon">
            <i v-for="(p, i) in item.options"
               :key="i"
               :class="[p.icon, 'iconfont']"
               :style="{'color': p.color}"></i>
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { issusTypeArr, levelList } from './storyConstant'
export default {
  data() {
    return {
      issusTypeArr,
      levelList,
      currentworkIcon: '',
      currentLifeIcon: '',
      visibleType: false,
      visibleLevel: false,
      flagWorkIconIndex: 0,
      flaglifeIconIndex: 0
    }
  },
  created() {
    this.currentworkIcon = issusTypeArr[0].icon;
    this.currentLifeIcon = issusTypeArr[1].icon;
  },
  methods: {
    selectIcon(issueType) {
      if (issueType === 'work') {
        if (this.flagWorkIconIndex >= issusTypeArr[0].moreIcon.length) {
          this.flagWorkIconIndex = 0;
        }

        this.currentworkIcon = issusTypeArr[0].moreIcon[this.flagWorkIconIndex]
        this.flagWorkIconIndex++;
      }

      if (issueType === 'life') {
        if (this.flaglifeIconIndex >= issusTypeArr[1].moreIcon.length) {
          this.flaglifeIconIndex = 0;
        }

        this.currentLifeIcon = issusTypeArr[1].moreIcon[this.flaglifeIconIndex]
        this.flaglifeIconIndex++;
      }
    }
  }
}
</script>
<style lang="scss">
#sortSprint {
  display: flex;
  .type,
  .level {
    width: 25px;
  }
  .level {
    margin-left: 0;
  }
  .link {
    max-width: 100px;
    min-width: 70px;
  }
  .title {
    flex: 1;
    text-align: left;
  }
  .modules,
  .status {
    width: 56px;
  }
}
#sortSprintMain {
  .work,
  .life {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .currentIcon {
    flex: 1;
    text-align: left;
  }
  .btn {
    padding: 3px;
    height: 20px;
    float: right;
    font-size: 14px;
    margin: 5px;
  }
}
</style>
