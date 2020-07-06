<template>
  <div id="sprint-detail">
    <div class="header">
      <div class="link">
        <router-link tag="a" v-show="detailObj.tag" :to="detailObj.tag.link" class="tag">{{detailObj.tag.name}}</router-link> /
        <a :class="[detailObj.status]">{{detailObj.link}}</a>
        </div>
      <el-button type="text" icon="el-icon-close" class="btn-del"></el-button>
    </div>
    <v-edit class="title" :content="detailObj.title"></v-edit>
    <div class="points">
      <span class="point-name">预估:</span>
      <span>{{detailObj.points}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        detailObj: {
          name: '',
					link: '',
					type: '',
					level: '',
					title: '',
					fixed: '',
					progressState: '',
					tag: {name: '', link: ''},
					points: ''
        }
      }
    },
    watch: {
      'sprintdetailData': function(v) {
        if (v) {
          this.detailObj = JSON.parse(JSON.stringify(v))
        }
      }
    },
    props: {
      sprintdetailData: [Object]
    },
    created() {
      if (this.sprintdetailData) {
        this.detailObj = JSON.parse(JSON.stringify(this.sprintdetailData))
      }
    }
  }
</script>
<style lang="scss">
#sprint-detail {
  font-size: 14px;
  color: #172b4d;
  padding: 4px;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    margin: 3px 0;
  }
  .points {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .point-name {
      margin-right: 10px;
    }
  }
}
</style>
