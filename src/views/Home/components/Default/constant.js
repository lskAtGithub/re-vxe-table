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
    { field: 'role', title: '身份', slotName: 'role' },
  ]
}

export { getColumns }
