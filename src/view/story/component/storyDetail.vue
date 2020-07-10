<template>
  <div id="sprint-detail">
    <div class="header">
      <div class="link">
        <router-link tag="a" v-show="details.tag" :to="details.tag.link" class="tag">{{details.tag.name}}</router-link> /
        <router-link tag="a" :to="`/story/${details.link}`" :class="[details.status]">{{details.link}}</router-link>
        </div>
      <el-button type="text" icon="el-icon-close" class="btn-del" @click="hc_closeDetail()"></el-button>
    </div>
    <v-edit class="title" :content="details.title" :uid="details.link"></v-edit>
    <div class="points">
      <span class="point-name">预估:</span>
      <v-edit class="title" :content="details.points" :uid="details.link"></v-edit>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        details: {
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
          this.details = JSON.parse(JSON.stringify(v))
        }
      }
    },
    props: {
      sprintdetailData: [Object]
    },
    created() {
      if (this.sprintdetailData) {
        this.details = JSON.parse(JSON.stringify(this.sprintdetailData))
      }
    },
    methods: {
      hc_closeDetail() {
        this.$emit('closeDetail')
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
