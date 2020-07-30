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
export let levelArr = [
  {
    label: '不紧急',
    options: [
      {
        value: 'ignore',
        label: '1',
        color: '#67C23A',
        icon: 'icon-1_square'
      },
      {
        value: 'delay',
        label: '2',
        color: '#67C23A',
        icon: 'icon-2_square'
      }
    ]
  },
  {
    label: '一般',
    options: [
      {
        value: 'glance',
        label: '3',
        color: '#E6A23C',
        icon: 'icon-3_square'
      },
      {
        value: 'lookup',
        label: '4',
        color: '#E6A23C',
        icon: 'icon-4_square'
      }
    ]
  },
  {
    label: '紧急',
    options: [
      {
        value: 'gaze',
        color: '#F56C6C',
        label: '5',
        icon: 'icon-5_square'
      },
      {
        value: 'urgent',
        label: '6',
        color: '#F56C6C',
        icon: 'icon-6_square'
      }
    ]
  }
]
export let issusTypeArr = [
  {icon: 'icon-shujuzhongjian', color: '#0065ff', label: '工作', value: 'job'},
  {icon: 'icon-shenghuo', color: '#E6A23C', label: '生活', value: 'life'}
]
export let pointsArr = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
