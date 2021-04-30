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

export const menuList = [
  { name: '事务面板', link: 'story', color: '#5243aa', icon: '' },
  {
    name: '设计概览', link: 'design', color: '#598ed4', icon: '',
    children: [
      { name: '功能列表', link: 'feature', color: '#5243aa', icon: 'el-icon-c-scale-to-original' },
      { name: '技术攻关', link: 'technology', color: '#5243aa', icon: 'el-icon-folder-checked' }
    ]
  }
]
