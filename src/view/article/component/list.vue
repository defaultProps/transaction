<template>
  <div id="article-list">
    <div class="top-bar">
      <ul class="select-ul" :class=[type]>
        <el-select v-model="timeHots"
                   filterable
                   allow-create
                   size="small"
                   default-first-option
                   class="select uxo-el-select"
                   placeholder="请选择">
          <el-option v-for="item in TIMEHOTS_OPTIONS"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </ul>
      <ul class="select-ul pull-right">
        <el-select v-model="currentAuth" filterable allow-create size="small" style="width: 86px" default-first-option
                   class="uxo-el-select" placeholder="">
          <el-option v-for="item in AUTH_OPTIONS" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </ul>
    </div>
    <div class="content-warpper">
      <div>
        <div class="content-list" v-for="(item, index) in articles" :key="index">
          <el-row :gutter="10">
            <el-col :span="item.img ? 20 : 24">
              <router-link tag="li" :to="{path:`/community/article/${item.articleID}`, params: {name: item.author}}">
                <div class="title">
                  <el-tooltip class="item" effect="dark" content="级别不足" placement="top-start" v-show="item.level <= $store.state.user.level">
                    <i class="iconfont xu-pass"></i>
                  </el-tooltip>
                  {{item.title}}
                </div>
                <div class="content">{{item.content | filterContent}}</div>
              </router-link>
            </el-col>
            <el-col :span="item.img ? 4 : 0">
              <div class="article-img" :style="{'background-image': 'url('+item.img+')'}"></div>
            </el-col>
          </el-row>
          <div class="others-info">
            <ul class="action-list">
              <li class="likeBtn"><i class="iconfont xu-zan"></i><span>{{12}}</span></li>
              <li class="likeBtn"><i class="iconfont xu-pinglun1"></i><span>{{12}}条评论</span></li>
              <li class="likeBtn"><router-link class="author" tag="span" :to="{path: `/community/user/${item.authorID}`, params: {id: item.authorID}}">{{item.author}}</router-link></li>
              <!-- <li class="likeBtn"><span class="publish">{{item.publish | equitionTime}}</span></li> -->
              <li class="likeBtn last-left" :class="[item.type]"><span>{{item.type | filterType}}</span></li>
              <li class="likeBtn"><i class="iconfont xu-pinglun1"></i><span>关注</span></li>
              <li class="likeBtn"><i class="iconfont xu-pinglun1"></i><span>收藏</span></li>
              <li class="likeBtn"><i class="iconfont xu-more"></i><span></span></li>
            </ul>
          </div>
        </div>
        <div class="loading-article">
          <el-button v-if="isLoading" icon="el-icon-loading" size="mini">加载中......</el-button>
          <el-button v-else @click="getArticleLists()" size="mini">点击加载更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TIMEHOTS_OPTIONS = [
  {value: "3", label: "最近3天内"},
  {value: "7", label: "最近7天内"},
  {value: "30", label: "最近30天内"},
  {value: "365", label: "最近一年内"}
]
const AUTH_OPTIONS = [
  {label: "权限内", value: "self"},
  {label: "全部", value: "all"}
]

export default {
  data () {
    return {
      TIMEHOTS_OPTIONS,
      AUTH_OPTIONS,
      timeHots: "3",
      sortBy: 'desc',
      currentAuth: 'self', // 文章展示类型权限
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
    timeHots: "getArticleLists",
    $route: {
      handler () {
        this.getArticleLists("tag")
      },
      deep: true,
      immediate: true
    }
  },
  filters: {
    filterContent (val) {
      return val.slice(0, 270).replace(/<\/?.+?\/?>/g, "")
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
  mounted() {
    this.getArticleLists()
    // window.addEventListener("scroll", this.handleScroll, false)
    // this.handleScroll()
  },
  methods: {
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
				let isNewTags = ["tag", "hot", "list", "new"]

				console.log(obj)

        this.articles = isNewTags.indexOf(tag) >= 0 ? obj.list : this.articles.concat(obj.list)
        ++this.currentPage
        this.isLoading = false
      })
    },
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let bodyScrollHeight = document.body.scrollHeight
      let distance = 100

      this.isShowTopBtn = scrollTop > 1000
      if (scrollTop + windowHeight >= bodyScrollHeight - distance && !this.isLoading && this.currentPage % 2 !== 0) {
        this.isLoading = true
        this.getArticleLists()
      }
    }
  },
  destroyed () {
    window.removeEventListener("scroll", this.handleScroll, false)
  }
}
</script>
<style lang="scss" scoped>
</style>
