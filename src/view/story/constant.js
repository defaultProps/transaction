export let progressStateList = [
  {name: "未开始", value: "not-start"},
  {name: "进行中...", value: "doing"},
  {name: "已完成", value: "finish"}
];
export let backlogTypeList = [
  {name: "大块文章", link: "article"},
  {name: "事务分发", link: "story"},
  {name: "兴趣使然", link: "thus"},
  {name: "仪表盘", link: "dashboard"},
  {name: "求知欲望", link: "seekKnowledge"},
  {name: "美味厨房", link: "kitchen"},
  {name: "途观旅游", link: "tour"},
  {name: "市场楼盘", link: "loupan"},
  {name: "原始生存", link: "existence"},
  {name: "简单素描", link: "Sketch"},
  {name: "眺望宇宙", link: "universe"}
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
