import story from '@/view/todoList/index.vue'
import login from '@/view/login/index.vue'
import manage from '@/view/manage/index.vue'
import dashboard from '@/view/dashboard/index.vue'
import initStore from '@/view/initStore/index.vue'
import feature from '@/view/feature/index.vue'
import product from '@/view/product/index.vue'
import markdownide from '@/view/markdownide'

/**
 * @meta: auth: 用户级别 0无需登录，1普通用户，2管理员， showheaderBar 是否显示左侧顶部栏
 */
let routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/story",
    component: story,
    meta: {
      title: "事务面板",
      auth: 1,
      showheaderBar: true
    }
  },
  {
    path: "/markdown-ide",
    component: markdownide,
    meta: {
      title: "markdown IDE",
      auth: 1,
      showheaderBar: false
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      title: "事务管理 - 登录",
      auth: 0,
      showheaderBar: false
    }
  },
  {
    path: "/initStore",
    component: initStore,
    meta: {
      title: "初始配置",
      auth: 0,
      showheaderBar: false
    }
  },
  {
    path: "/product",
    component: product,
    meta: {
      title: "产品",
      auth: 0,
      showheaderBar: false
    }
  },
  {
    path: "/dashboard",
    component: dashboard,
    meta: {
      title: "仪表盘",
      auth: 0,
      showheaderBar: true
    }
  },
  {
    path: '/feature',
    component: feature,
    meta: {
      title: '功能列表',
      auth: 0,
      showheaderBar: true
    }
  },
  {
    path: "/manage",
    component: manage,
    meta: {
      title: "用户管理",
      auth: 0,
      showheaderBar: true
    }
  }
]

export default routes
