import Mock from "mockjs"

const HEADER_NAV = ['事务分发', '仪表盘', '大块文章', '旅游指南', '农贸市场', '健身运动', '厨房日记', '宇宙探索', '游戏人生'].map(v => ({label: v, value: Mock.mock('@guid')}));

export default function () {
  function closeSprint() {
    let issueList = [];
    let total = 23;
    let pointsTotal = Math.ceil(Math.random() * 20) + 20;

    for (let i = 0; i < total; i++) {
      issueList.push({
        id: Mock.mock('@guid'),
        title: Mock.mock('@cword(4, 9)'),
        count: pointsTotal
      })
    }
    return {
      total,
      issueList
    }
  }

  function backlogSprint() {
    let pointsTotal = 0;
    let total = 40;
    let issueList = [];

    for (let i = 0; i < total; i++) {
      let point = Math.ceil(Math.random() * 30)
      issueList.push({
        link: `INHOPE-${Math.ceil(Math.random() * 8000) + 1000}`, // 链接
        point, // 预估
        level: Math.ceil(Math.random() * 5), // 紧急度
        type: Math.random() > 0.5 ? 'job' : 'life', // issus类型 生活、工作
        title: Mock.mock('@csentence(20, 40)'), // 标题
        desc: Mock.mock('@csentence(100, 200)'), // 描述
        createTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
        updateTime: Mock.mock('@datetime("yyyy年MM月dd日 HH:mm:ss")'),
        tag: HEADER_NAV[Math.floor(Math.random() * HEADER_NAV.length)], // 模块
        progressState: ['doing', 'not-start', 'finish'][Math.floor(Math.random() * 3)] // 执行状态
      })
      pointsTotal += point;
    }

    return {
      total,
      issueList,
      pointsTotal
    }
  }

  // 加载数据
  closeSprint();
  backlogSprint();
}
