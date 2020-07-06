<template>
  <div id="article-list">
    <div class="top-bar">
      <el-button type="warning" size="mini" icon="el-icon-edit" class="btn">新建文章</el-button>
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="inputVal" size="mini" class="inputval"></el-input>
    </div>
    <div class="main">
      <div class="content-list" v-for="(item, index) in articles" :key="index">
        <el-row :gutter="10">
          <el-col :span="!item.selected ? 22 : 24">
            <li @clikc.stop="hc_detail(item)">
              <div class="title">
                <img :src="item.awatar" alt="" @click.stop="hc_open(item.homePageLink)">
                <a :href="item.url" target="_blank">{{item.title}}</a>
                <el-button class="progress" type="text" size="mini" :class="[item.progerss]">{{item.progerss | filterprogerss}}</el-button>
              </div>
            </li>
          </el-col>
          <el-col :span="!item.selected ? 2 : 0"></el-col>
        </el-row>
      </div>
      <div class="loading-article">
        <el-button v-if="isLoading" icon="el-icon-loading" size="mini">加载中......</el-button>
        <el-button v-else @click="getArticleLists()" size="mini" type="text">点击加载更多</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputVal: '',
      timeHots: "3",
      sortBy: 'desc',
      type: "hot", // 热门hot、最新new、热榜list
      isLoading: true,
      currentPage: 1, // 当前加载页数
      timeout: false, // 定时器-用于切换页面是注销
      loading: "", // 遮罩层
      catalogLists: [],
      articles: [] // 文章列表
    }
  },
  watch: {
    timeHots: "getArticleLists"
  },
  filters: {
    filterprogerss(v) {
      let map = new Map([['un-start', '未开始'], ['doing', '进行中'], ['finish', '已完成']])
      return map.get(v)
    },
    filterType(val) {
			return val === 'original' ? "原创" :  val === 'reprint' ? '转载' : '翻译'
    },
    equitionTime(value) {
      let currentTime = (new Date().getTime() - new Date(value).getTime()) / 3600 / 1000

      if (currentTime < 24) {
        return currentTime === 0 ? "1" : currentTime.toFixed() + "小时前"
      } else if (currentTime.toFixed() < 24 * 30) {
        return currentTime.toFixed() === 24 ? "1" : (currentTime / 24).toFixed() - 24 + "天前"
      } else if (currentTime.toFixed() < 24 * 30 * 12) {
        return (currentTime / 24 / 30).toFixed() + "月前"
      } else {
        return (currentTime / 24 / 30 / 12).toFixed() + "年前"
      }
    }
  },
  created() {
    this.getArticleLists()
  },
  methods: {
    filterLevel(v) {
      return ['icon-1_square', 'icon-2_square', 'icon-3_square', 'icon-4_square', 'icon-5_square', 'icon-6_square', 'icon-7_square'][v]
    },
    hc_detail(v) {
      this.$set(v, 'selected', true)
    },
    hc_open(link) {
      window.open(link)
    },
    getArticleLists(tag) {
      this.isLoading = true

      let type = this.$route.path.split(/\//).pop()
      let params = {
        type: type === "community" ? "default" : type,
        pageSize: 20,
        sortBy: this.sortBy,
        currentPage: 1
			}

      this.$axios.article.list(params).then(obj => {
        this.articles = ["tag", "hot", "list", "new"].indexOf(tag) >= 0 ? obj.list : this.articles.concat(obj.list)
        ++ this.currentPage

        this.isLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
#article-list {
  position: fixed;
  left: 200px;
  top: 40px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  .top-bar {
    height: 34px;
    line-height: 34px;
    border: none;
    padding: 0 15px;
    font-size: 14px;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 20;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(left, #409EFF, #409EFF 10%,#fff 60%);
    border-bottom: 1px solid #f6f6f6;
    .btn {
      float: right;
      margin: 0 5px 0 -5px;
      color: #fff;
      padding: 4px;
    }
    .select-ul {
      display: inline-block;
      .el-input__inner {
        border: none;
        color: #409EFF;
      }
      .select {
        width: 110px !important;
      }
    }
    .inputval {
      width: 120px;
      float: right;
    }
  }
  .main {
    box-sizing: border-box;
    .content-list {
      border-bottom: 1px solid #e3e4e5;
      padding: 5px 10px 0 0;
      min-height: 10px;
      position: relative;
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
        .meta {
          background: #f6f6f6;
        }
      }
      li {
        cursor: default;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #172b4d;
        .title {
          font-weight: 600;
          padding: 6px 3px;
          display: flex;
          align-items: center;
          a {
            color: #172b4d;
            &:hover {
              color: #0747a6;
            }
          }
          img {
            width: 24px;
            height: 24px;
            margin-right: 5px;
            display:inline-block;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
          }
          .progress {
            padding: 1px 2px;
            color: #fff;
            margin-left: 10px;
            &.un-start {
              background-color: #00875a;
            }
            &.doing {
              background-color: #ffab00;
            }
            &.finish {
              background-color: #0006;
            }
          }
        }
      }
      .article-img {
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-position: bottom right;
        background: #f0f0f0;
        border-radius: 5px;
        float: right;
        background-size: cover;
      }
      .meta {
        bottom: 0;
        left: 0;
        right: 150px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 25px;
        font-size: 12px;
        background: linear-gradient(left, #f6f6f6 20%, #fff 40%,#fff);
        .action-list {
          display: flex;
          justify-content: flex-end;
          line-height: 30px;
          padding-left: 10px;
          box-sizing: border-box;
          color: #909090;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          li {
            padding-right: 14px;
          }
        }
      }
    }
    .loading-article {
      text-align: center;
      padding: 10px 0;
    }
  }
}
</style>
