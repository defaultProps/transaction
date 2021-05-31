"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("@/view/todoList/index.vue"));

var _index2 = _interopRequireDefault(require("@/view/login/index.vue"));

var _index3 = _interopRequireDefault(require("@/view/manage/index.vue"));

var _index4 = _interopRequireDefault(require("@/view/dashboard/index.vue"));

var _index5 = _interopRequireDefault(require("@/view/initStore/index.vue"));

var _index6 = _interopRequireDefault(require("@/view/feature/index.vue"));

var _index7 = _interopRequireDefault(require("@/view/product/index.vue"));

var _index8 = _interopRequireDefault(require("@/view/designDocs/index.vue"));

var _constant = require("@/libs/constant.js");

var _markdownide = _interopRequireDefault(require("@/view/markdownide"));

var _index9 = _interopRequireDefault(require("@/view/lowCodeComponent/index.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @meta: {
 *  authority: user level 'tourist'（游客）无需登录，'ordinary' 普通用户，'admin' 管理员
 *  showheaderBar:  是否显示左侧顶部栏
 * }
 */
var routes = [{
  path: "/",
  redirect: "/login"
}, {
  path: "/todoList",
  component: _index["default"],
  meta: {
    title: "事务面板",
    authority: 1,
    showheaderBar: true
  }
}, {
  path: '/uxo-low-code',
  component: _index9["default"],
  meta: {
    title: 'uxo low code',
    auth: 1,
    showheaderBar: false
  }
}, {
  path: "/markdown-ide",
  component: _markdownide["default"],
  meta: {
    title: "IDE",
    auth: 1,
    showheaderBar: true
  }
}, {
  path: "/login",
  component: _index2["default"],
  meta: {
    title: "事务管理 - 登录",
    authority: 0,
    showheaderBar: false
  }
}, {
  path: "/initStore",
  component: _index5["default"],
  meta: {
    title: "初始配置",
    authority: 0,
    showheaderBar: false
  }
}, {
  path: "/product",
  component: _index7["default"],
  meta: {
    title: "产品",
    authority: 0,
    showheaderBar: false
  }
}, {
  path: "/dashboard",
  component: _index4["default"],
  meta: {
    title: "仪表盘",
    authority: 0,
    showheaderBar: true
  }
}, {
  path: '/design-docs',
  component: _index8["default"],
  children: (0, _constant.DESIGN_DOCS)().map(function (cr) {
    console.log(cr.path);
    return {
      path: "".concat(cr.path),
      component: require("@/docs/markdownDocs/".concat(cr.fileName, ".md"))["default"],
      meta: {
        title: '设计文档',
        authority: 0,
        showheaderBar: true
      }
    };
  }),
  meta: {
    title: '设计文档',
    authority: 0,
    showheaderBar: true
  }
}, {
  path: '/feature',
  component: _index6["default"],
  meta: {
    title: '功能列表',
    authority: 0,
    showheaderBar: true
  }
}, {
  path: "/manage",
  component: _index3["default"],
  meta: {
    title: "用户管理",
    authority: 0,
    showheaderBar: true
  }
}];
var _default = routes;
exports["default"] = _default;