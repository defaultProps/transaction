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
import lowCodeComponent from '@/view/lowCodeComponent/index.vue'
import page404 from '@/view/404/index.vue'
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
      authority: 'ordinary',
      showheaderBar: true
    }
  },
  {
    path: '/uxo-low-code',
    component: lowCodeComponent,
    meta: {
      title: 'uxo low code',
      auth: 'ordinary',
      showheaderBar: true
    }
  },
  {
    path: "/markdown-ide",
    component: markdownide,
    meta: {
      title: "IDE",
      auth: 'ordinary',
      showheaderBar: true
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      title: "事务管理 - 登录",
      authority: 'tourist',
      showheaderBar: false
    }
  },
  {
    path: "/initStore",
    component: initStore,
    meta: {
      title: "初始配置",
      authority: 'tourist',
      showheaderBar: false
    }
  },
  {
    path: "/product",
    component: product,
    meta: {
      title: "产品",
      authority: 'tourist',
      showheaderBar: false
    }
  },
  {
    path: "/dashboard",
    component: dashboard,
    meta: {
      title: "仪表盘",
      authority: 'tourist',
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
        component: require(`@/docs/markdownDocs/${cr.fileName}.md`).default,
        meta: {
          title: '设计文档',
          authority: 'tourist',
          showheaderBar: true
        }
      }
    }),
    meta: {
      title: '设计文档',
      authority: 'tourist',
      showheaderBar: true
    }
  },
  {
    path: '/feature',
    component: feature,
    meta: {
      title: '功能列表',
      authority: 'tourist',
      showheaderBar: true
    }
  },
  {
    path: "/manage",
    component: manage,
    meta: {
      title: "用户管理",
      authority: 'tourist',
      showheaderBar: true
    }
  },
  {
    path: '/404',
    component: page404,
    meta: {
      title: "404",
      authority: 'tourist',
      showheaderBar: true
    }
  },
  {
    path: "*",
    redirect: '/404'
  }
]

export default routes
