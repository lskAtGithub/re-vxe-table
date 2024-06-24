const getColumns = (vm) => {
  return [
    { type: 'seq', title: '序号', width: 50 },
    {
      field: 'name',
      title: '名字',
      format: (row, index) => row.name + index,
      header: { type: 'input' }
    },
    { field: 'age', title: '年龄', header: { type: 'input', model: 'age' } },
    {
      field: 'sex',
      title: '性别',
      tag: true,
      tagOption: {},
      header: { type: 'select', options: vm.sexList, model: 'sexValue' }
    },
    { field: 'role', title: '身份' },
    { field: 'cardId', title: '身份证号码' },
    { field: 'address', title: '地址' },
    { field: 'level', title: '级别' },
    { field: 'desc', title: '说明' },
    { field: 'likes', title: '爱好' }
  ]
}

export { getColumns }
