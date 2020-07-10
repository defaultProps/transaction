export let progressStateList = [
  {name: "未开始", link: "not-start"},
  {name: "处理中", link: "doing"},
  {name: "已完成", link: "finish"}
];
export let modulesList = [
  {name: '大块文章', link: 'article', color: '#598ed4', icon: ''},
	{name: '事务分发', link: 'story', color: '#5243aa', icon: ''},
	{name: '兴趣使然', link: 'thus', color: '#ffab00', icon: ''},
	{name: '仪表盘', link: 'dashboard', color: '#d81e06', icon: ''},
	{name: '原始生存', link: 'existence', color: '#436f8a', icon: ''},
	{name: '简单素描', link: 'Sketch', color: '#fa7d09', icon: ''}
]
export let sortGroup = [
  {
    label: "按类型排序",
    options: [
      {
        value: "needs",
        label: "需求"
      },
      {
        value: "bug",
        label: "BUG"
      }
    ]
  },
  {
    label: "按优先级排序",
    options: [
      {
        value: "desc",
        label: "倒序"
      },
      {
        value: "dsc",
        label: "正序"
      }
    ]
  },
  {
    label: "按点排序",
    options: [
      {
        value: "desc-point",
        label: "倒序"
      },
      {
        value: "dsc-point",
        label: "正序"
      }
    ]
  }
]
