<template>
  <re-table
    align="center"
    border
    :options="{ rowFillText: '-' }"
    :columns="columns"
    :data="tableData"
    :autoFunc="handleInit"
    :pagination="search"
  ></re-table>
</template>

<script>
import { data } from '../../../../dataSource/table-data'
import { getColumns } from './constant'

export default {
  name: 'DefaultTable',
  data() {
    return {
      columns: [],
      tableData: data,
      sexList: [],
      search: {
        name: '',
        age: '',
        sexValue: '',
        page: 1,
        pages: 50,
        total: 13
      }
    }
  },
  mounted() {
    this.columns = getColumns(this)
    const res = [
      { value: 1, label: 'man' },
      { value: 2, label: 'woman' }
    ]
    this.sexList.push(...res)
  },
  methods: {
    handleInit(params) {
      Object.assign(this.search, params)
    }
  }
}
</script>
