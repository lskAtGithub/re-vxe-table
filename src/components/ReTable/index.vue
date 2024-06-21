<template>
  <div class="re-table-container">
    <div class="re-vxe-table-container">
      <vxe-table v-bind="$attrs" v-on="$listeners">
        <vxe-table-column
          v-for="(item, index) in columns"
          :key="item.field || item.title || 'vxeTableColumn' + index"
          v-bind="item"
        >
          <!-- 插槽 -->
          <template v-slot="scope" v-if="item.slotName">
            <slot :name="item.slotName" :slot-scope="scope"></slot>
          </template>
          <!-- 根据判断做出显示 -->
          <template
            v-slot="{ row }"
            v-else-if="item.format && typeof item.format == 'function'"
          >
            {{ item.format(row) }}
          </template>
          <!-- 默认显示 -->
          <template v-else v-slot="{ row }">
            {{ row[item.field] || options.rowFillText }}
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="re-pagination-container" v-if="hasPagination">
      <el-pagination
        :current-page="pagination[paginationNodes.currentPage]"
        :page-sizes="pagination[paginationNodes.pageSizes] || defaultPageSizes"
        :page-size="pagination[paginationNodes.size]"
        :total="pagination[paginationNodes.total]"
        :layout="pagination.layout || defaultPageLayout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const defaultPageSizes = [10, 20, 50, 100]
const defaultPageLayout = 'total, sizes, prev, pager, next, jumper'
const isNotUndefined = (value) => value !== undefined

export default {
  name: 'ReTable',
  props: {
    options: {
      type: Object,
      default: () => ({
        rowFillText: ''
      })
    },
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object || null,
      default: () => null
    },
    paginationNodes: {
      type: Object,
      default: () => {
        return {
          currentPage: 'currentPage',
          pageSize: 'pageSize',
          pageSizes: 'pageSizes',
          total: 'total'
        }
      }
    }
  },
  computed: {
    hasPagination() {
      return isNotUndefined(this.pagination) && this.pagination
    }
  },
  data() {
    return {
      defaultPageSizes,
      defaultPageLayout
    }
  },
  methods: {
    handleCurrentChange(e) {
      const result = {
        [this.paginationNodes.currentPage]: e
      }
      this.$emit('changePaging', result)
    },
    handleSizeChange(e) {
      const result = {
        [this.paginationNodes.pageSize]: e
      }
      this.$emit('changePaging', result)
    }
  }
}
</script>

<style scoped></style>
