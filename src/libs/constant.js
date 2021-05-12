export const QUILL_TOOLBAROPTIONS = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }]
    ]
  },
  theme: 'snow'
}

export const QUILL_DETAIL_TOOLBAROPTIONS = {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'header': 1 }, { 'header': 2 }]
    ]
  },
  theme: 'snow'
}

// header-bar
export const HEADER_MENU_BAR_LIST = [
  { name: '事务面板', link: 'todoList', color: '#5243aa', icon: '' },
  {
    name: '设计概览', link: 'design', color: '#598ed4', icon: '',
    children: [
      { name: '功能列表', link: 'feature', color: '#5243aa', icon: 'el-icon-c-scale-to-original' },
      { name: '技术攻关', link: 'design-docs', color: '#5243aa', icon: 'el-icon-folder-checked' },
      { name: 'uxo-code', link: 'uxoCode', color: '#5243aa', icon: 'el-icon-folder-checked' }
    ]
  }
]

// 路由前缀
export const BASE_ROUTER_FRONTEND = '/uxo2'

export const LOW_CODE_DESIGN_DOCS = [
  {
    label: '组件渲染', value: 'component-render',
    children: [
      { label: '按钮', value: 'el-button', tag: 'el-button', icon: 'el-icon-info' },
      { label: '下拉菜单', value: 'el-select', tag: '', icon: 'el-icon-info' },
      { label: '基础输入框', value: 'el-input', tag: '', icon: 'el-icon-info' },
      { label: '级联选择', value: 'el-cascader', tag: '', icon: 'el-icon-info' },
      { label: '日期选择', value: 'component-render', tag: '', icon: 'el-icon-info' },
      { label: '单选框', value: 'component-render', tag: '', icon: 'el-icon-info' },
      { label: '多选框', value: 'component-render', tag: '', icon: 'el-icon-info' }
    ]
  }
]
