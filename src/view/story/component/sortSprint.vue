<template>
  <div id="sortSprint">
    <el-button v-popover:type size="mini" type="text" icon="el-icon-info" class="type"></el-button>
    <el-button v-popover:level size="mini" type="text" icon="el-icon-info" class="level"></el-button>
    <el-button v-popover:title size="mini" type="text" class="title">标题</el-button>
    <el-button v-popover:modules size="mini" type="text" class="modules">模块</el-button>
    <el-button v-popover:status size="mini" type="text" icon="el-icon-sort-down el-icon--right" class="status" @click="$emit('sortable', 'executiveMode')">状态</el-button>
    <el-popover
      ref="type"
      placement="bottom"
      v-model="visibleType">
      <div id="sortSprintMain">
        <div class="work">
          <el-button type="text">工作:</el-button>
          <el-button size="mini" type="text" class="currentIcon"><i :class="[currentworkIcon, 'iconfont']" :style="{'color': issusTypeArr[0].color}"></i></el-button>
          <!-- <el-button icon="el-icon-refresh" size="mini" type="info" class="btn" @click="selectIcon('work')"></el-button> -->
        </div>
        <div class="life">
          <el-button type="text">生活:</el-button>
          <el-button size="mini" type="text" class="currentIcon"><i :class="[currentLifeIcon, 'iconfont']" :style="{'color': issusTypeArr[1].color}"></i></el-button>
          <!-- <el-button icon="el-icon-refresh" size="mini" type="info" class="btn" @click="selectIcon('life')"></el-button> -->
        </div>
      </div>
      <!-- <div class="footer">
        <el-button size="mini" type="text" @click="visibleType = false" class="btn">取消</el-button>
        <el-button type="primary" size="mini" @click="visibleType = false" class="btn">确定</el-button>
      </div> -->
    </el-popover>
    <el-popover
      ref="level"
      placement="bottom"
      width="160"
      v-model="visibleLevel"
      >
      <div id="sortSprintMain">
        <div class="work" v-for="(item, index) in levelArr" :key="index">
          <el-button type="text">{{item.label}}:</el-button>
          <el-button size="mini" type="text" class="currentIcon">
            <i v-for="(p, i) in item.options" :key="i" :class="[p.icon, 'iconfont']" :style="{'color': p.color}"></i>
          </el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { issusTypeArr, levelArr } from './storyConstant'
export default {
  data() {
    return {
      issusTypeArr,
      levelArr,
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
      if (issueType == 'work') {
        if (this.flagWorkIconIndex >= issusTypeArr[0].moreIcon.length) {
          this.flagWorkIconIndex = 0;
        }

        this.currentworkIcon = issusTypeArr[0].moreIcon[this.flagWorkIconIndex]
        this.flagWorkIconIndex ++;
      }

      if (issueType == 'life') {
        if (this.flaglifeIconIndex >= issusTypeArr[1].moreIcon.length) {
          this.flaglifeIconIndex = 0;
        }

        this.currentLifeIcon = issusTypeArr[1].moreIcon[this.flaglifeIconIndex]
        this.flaglifeIconIndex ++;
      }
    }
  }
}
</script>
<style lang="scss">
#sortSprint {
  display: flex;
  .type, .level {
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
  .modules, .status {
    width: 56px;
  }
}
#sortSprintMain {
  .work, .life {
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
    font-size: 12px;
    margin: 5px;
  }
}
.footer {
  text-align: right;
  margin: 5px 0 0;
  .btn {
    padding: 0 3px;
    height: 20px;
    font-size: 12px;
    margin: 5px;
  }
}
</style>
