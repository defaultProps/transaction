export let progressStateList = [
  {name: "未开始", link: "not-start"},
  {name: "处理中", link: "doing"},
  {name: "已完成", link: "finish"}
];

export let modulesList = [
  {name: '大块文章', link: 'article', color: '#598ed4', icon: ''},
  {name: '日常学习', link: 'study', color: '#598ed4', icon: ''},
	{name: '事务分发', link: 'story', color: '#5243aa', icon: ''},
	{name: '生活乐趣', link: 'thus', color: '#ffab00', icon: ''},
	{name: '旅游指南', link: 'dashboard', color: '#598ed4', icon: ''},
	{name: '农贸市场', link: 'existence', color: '#5243aa', icon: ''},
	{name: '健身运动', link: 'Sketch', color: '#ffab00', icon: ''},
	{name: '厨房日记', link: 'check', color: '#598ed4', icon: ''},
	{name: '宇宙探索', link: 'universe', color: '#5243aa', icon: ''},
	{name: '游戏人生', link: 'games', color: '#598ed4', icon: ''}
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
