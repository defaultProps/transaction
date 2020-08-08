import Mock from "mockjs"
import localforage from 'localforage';

let tags = [
  {name: '大块文章', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '日常学习', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '工作上班', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
	{name: '生活乐趣', guid: Mock.mock('@guid'), color: '#ffab00', icon: ''},
	{name: '旅游指南', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '个人开源', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
	{name: '健身运动', guid: Mock.mock('@guid'), color: '#ffab00', icon: ''},
	{name: '厨房日记', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
	{name: '宇宙探索', guid: Mock.mock('@guid'), color: '#5243aa', icon: ''},
  {name: '游戏人生', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '绘画兴趣', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '思考意义', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '情感心事', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''},
  {name: '其他模块', guid: Mock.mock('@guid'), color: '#598ed4', icon: ''}
]

const backlogSprints = [
  {
    title: '针对个人体型和身体素质合理筛选健身运动、指导视频并设计一套长期的基础健身计划方案',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '搜集国内外的各类蔬菜并运用于厨房营养搭配中',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[5],
    guid: Mock.mock('@guid')
  },
  {
    title: '初始一个项目hourse，设计家庭房屋设计图',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '准备素描工具和选取学习教程',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#生活乐趣 | 根据国内外养殖业的行情设计一套在线查询网站',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '#初始一个项目animals， 搜集各类有趣生物信息',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  },
  {
    title: '初始一个项目， 搜集心理学、哲学',
    urgencyLevel: 3,
    issueDesc: '',
    issueType: 'life',
    issueRemark: '',
    createTime: '',
    updateTime: '',
    tag: tags[6],
    guid: Mock.mock('@guid')
  }
]

export default function () {
  localforage.clear()

  let sprintStore = localforage.createInstance({
    name: 'todo-sprint'
  })

  // let manage = localforage.createInstance({
  //   name: 'todo-manage'
  // })

  backlogSprints.forEach(sprint => {
    sprintStore.setItem(sprint.guid, sprint).then(function(value) {

    }).catch(function(err) {
      console.log(err);
    });
  })
}
