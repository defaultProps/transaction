 let sql = {
  insertData(issueLine = {}) {
    let {link, title, phase, activeDescription, updateDate, createDate, point, urgency} = issueLine;
    return ['insert into sprintIssus values', link, title, phase, activeDescription, updateDate, createDate, point, urgency].join(", ")
  }
}

export let sql;
