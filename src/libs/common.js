export default {
  date: {
    /**
     * @param {layout} String
     * @param {space} 分割符: ch默认中文
     */
    dateFormat(date, layout, space) {
      let layouts = ['all', 'YYYY-MM-DD', 'hh:mm:ss']
      let spaces = ['en', 'ch']
      let baseDate = [this._getFullyear(date), this._getMonth(date), this._getDate(date), this._getHours(date), this._getMinutes(date), this._getMilliseconds(date)]
      let enpickStart = baseDate.slice(0, 3).join('-')
      let enpickEnd = baseDate.slice(3).join(':')
      let chpickstart = baseDate[0] + '年' + baseDate[1] + '月' + baseDate[2] + '日'
      let chpickend = baseDate[3] + ':' + baseDate[4] + ':' + baseDate[6]

      if (layouts[0] === layout) {
        return spaces[0] === space ? `${enpickStart}  ${enpickEnd}` : `${chpickstart}  ${chpickend}`
      }
      if (layouts[1] === layout) {
        return spaces[0] === space ? enpickStart : chpickstart
      }
      if (layouts[2] === layout) {
        return spaces[0] === space ? enpickEnd : chpickend
      }
    },
    _getFullyear(date) {
      return date ? new Date(date).getFullYear() : new Date().getFullYear()
    },
    _getMonth(date) {
      return (date ? new Date(date).getMonth() : new Date().getMonth()) + 1
    },
    _getDate(date) {
      return date ? new Date(date).getDate() : new Date().getDate()
    },
    _getHours(date) {
      return date ? new Date(date).getHours() : new Date().getHours()
    },
    _getMinutes(date) {
      return date ? new Date(date).getMinutes() : new Date().getMinutes()
    },
    _getMilliseconds(date) {
      return date ? new Date(date).getMilliseconds() : new Date().getMilliseconds()
    }
  }
}
