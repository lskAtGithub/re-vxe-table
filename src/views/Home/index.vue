<template>
  <div class="container">
    <re-table :columns="columns" :data="tableData"></re-table>
  </div>
</template>

<script>
import ReTable from '../../components/ReTable/index.vue'
import { data } from '../../dataSource/table-data'
import { columns } from './constant'

export default {
  name: 'HomeRoute',
  components: { ReTable },
  data() {
    return {
      tableData: [],
      columns,
      pagination: {
        page: 1,
        pages: 50,
        total: 0
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableData = data
    }, 3000)
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin: 50px auto 20px;
}
</style>
