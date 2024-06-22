<template>
  <re-table
    align="center"
    border
    :options="{ rowFillText: '-' }"
    :columns="columns"
    :data="tableData"
    width="200px"
  ></re-table>
</template>

<script>
import { data } from '../../../../dataSource/table-data'
import { getColumns } from './constant'

export default {
  name: 'DefaultTable',
  data() {
    return {
      columns: getColumns(this),
      tableData: data,
      pagination: {
        page: 1,
        pages: 50,
        total: 0
      }
    }
  }
}
</script>
