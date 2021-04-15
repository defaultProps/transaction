import localforage from 'localforage'

export default {
  backlogSprint: function () {
    localforage.getItem('somekey').then(function (value) {
      // 当离线仓库中的值被载入时，此处代码运行
      console.log(value)
    }).catch(function (err) {
      // 当出错时，此处代码运行
      console.log(err)
    })
  }
}
