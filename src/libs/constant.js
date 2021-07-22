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
  { name: '事务面板', link: '/todoList', color: '#5243aa', icon: '' },
  {
    name: '编辑器', link: 'markdown-ide', color: '#5243aa', icon: '',
    children: [
      { name: 'MD编辑器', link: '/markdown-ide', color: '#5243aa', icon: '' },
      { name: '低代码编辑器', link: '/uxo-low-code', color: '#5243aa', icon: '' }
    ]
  },
  {
    name: '设计概览', link: 'design', color: '#598ed4', icon: '',
    children: [
      { name: '文档集合', link: '/design-docs', color: '#5243aa', icon: 'el-icon-folder-checked' },
      { name: '功能列表', link: '/feature', color: '#5243aa', icon: 'el-icon-c-scale-to-original' }
    ]
  }
]

// 路由前缀
export const BASE_ROUTER_FRONTEND = '/uxo2'

export const TODO_LIST_FUNCTION_DOCS = [
  { label: '功能列表', value: 'functionList' },
  { lable: '', value: '' }
]

export const DESIGN_DOCS = () => {
  const result = []
  const componentDocFiles = [
    {
      path: '@/docs/markdownDocs',
      fileNames: require.context('@/docs/markdownDocs', true, /.md$/).keys().map(v => v.replace('./', '').replace('.md', ''))
    }
  ]

  componentDocFiles.forEach(docs => {
    docs.fileNames.forEach(fileName => {
      result.push({
        fileName,
        path: `${fileName}`,
        assetsPath: `${docs.path}/${fileName}.md`
      })
    })
  })

  return result
}
