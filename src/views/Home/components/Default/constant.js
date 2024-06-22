const getColumns = () => {
  return [
    { field: 'name', title: '名字', format: (row, index) => row.name + index },
    { field: 'age', title: '年龄' },
    { field: 'sex', title: '性别' },
    { field: 'role', title: '身份' },
    { field: 'cardId', title: '身份证号码' },
    { field: 'address', title: '地址' },
    { field: 'level', title: '级别' },
    { field: 'desc', title: '说明' },
    { field: 'likes', title: '爱好' }
  ]
}

export { getColumns }
