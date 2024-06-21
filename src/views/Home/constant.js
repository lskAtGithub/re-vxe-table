const getColumns = (vm) => {
  console.log(vm)
  return [
    { field: 'name', title: '名字' },
    { field: 'age', title: '年龄' },
    { field: 'sex', title: '性别' }
  ]
}

export { getColumns }
