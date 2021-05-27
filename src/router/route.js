import todoList from '@/view/todoList/index.vue'
import login from '@/view/login/index.vue'
import manage from '@/view/manage/index.vue'
import dashboard from '@/view/dashboard/index.vue'
import initStore from '@/view/initStore/index.vue'
import feature from '@/view/feature/index.vue'
import product from '@/view/product/index.vue'
import designDocs from '@/view/designDocs/index.vue'
import { DESIGN_DOCS } from '@/libs/constant.js'
import markdownide from '@/view/markdownide'
/**
 * @meta: {
 *  authority: user level 'tourist'（游客）无需登录，'ordinary' 普通用户，'admin' 管理员
 *  showheaderBar:  是否显示左侧顶部栏
 * }
 */
let routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/todoList",
    component: todoList,
    meta: {
      title: "事务面板",
      authority: 1,
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
      authority: 0,
      showheaderBar: false
    }
  },
  {
    path: "/initStore",
    component: initStore,
    meta: {
      title: "初始配置",
      authority: 0,
      showheaderBar: false
    }
  },
  {
    path: "/product",
    component: product,
    meta: {
      title: "产品",
      authority: 0,
      showheaderBar: false
    }
  },
  {
    path: "/dashboard",
    component: dashboard,
    meta: {
      title: "仪表盘",
      authority: 0,
      showheaderBar: true
    }
  },
  {
    path: '/design-docs',
    component: designDocs,
    children: DESIGN_DOCS().map(cr => {
      console.log(cr.path)
      return {
        path: `${cr.path}`,
        component: require(`@/markdownDocs/${cr.fileName}.md`).default,
        meta: {
          title: '设计文档',
          authority: 0,
          showheaderBar: true
        }
      }
    }),
    meta: {
      title: '设计文档',
      authority: 0,
      showheaderBar: true
    }
  },
  {
    path: '/feature',
    component: feature,
    meta: {
      title: '功能列表',
      authority: 0,
      showheaderBar: true
    }
  },
  {
    path: "/manage",
    component: manage,
    meta: {
      title: "用户管理",
      authority: 0,
      showheaderBar: true
    }
  }
]

export default routes
