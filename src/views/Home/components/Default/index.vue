<template>
  <re-table
    align="center"
    border
    :options="{ rowFillText: '-' }"
    :columns="columns"
    :data="tableData"
    :autoFunc="handleInit"
    :pagination="searchParams"
  >
    <template #role="scope">
      <div style="color: red" @click="getScope(scope)">
        this is role slot: 
      </div>
    </template>
  </re-table>
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
      searchParams: {
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
      Object.assign(this.searchParams, params)
    },
    getScope(scope) {
      console.log(scope)
    }
  }
}
</script>
