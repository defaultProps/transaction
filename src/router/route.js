import todoList from '@/view/todoList/index.vue'
import thus from '@/view/thus/'
import login from '@/view/login/'
import manage from '@/view/manage/'
import dashboard from '@/view/dashboard/'
import initStore from '@/view/initStore/'
import feature from '@/view/feature/'
import product from '@/view/product/'

/**
 * @meta: auth: 用户级别 0无需登录，1普通用户，2管理员， showheaderBar 是否显示左侧顶部栏
 */
let routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/uxo",
    redirect: '/todoList'
  },
  {
    path: "/todoList",
    component: todoList,
    meta: {
      title: "代办事项",
      auth: 1,
      showheaderBar: true
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
    path: "/thus",
    component: thus,
    meta: {
      title: "兴趣使然的模块",
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
];

export default routes;
