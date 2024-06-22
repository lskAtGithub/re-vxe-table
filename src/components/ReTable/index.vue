<template>
  <div class="re-table-container">
    <!-- 表格 -->
    <div class="re-vxe-table-container">
      <vxe-table
        v-bind="$attrs"
        v-on="$listeners"
        :highlight-hover-row="highlightHoverRow"
      >
        <vxe-table-column
          v-for="(item, index) in columns"
          :key="index"
          v-bind="item"
        >
          <template
            #header="{}"
            v-if="item.header && typeof item.header === 'Object'"
          >
            <column-header
              :item="item"
              v-bind="$attrs"
              v-on="$listeners"
            ></column-header>
          </template>

          <!-- 插槽 -->
          <template v-slot="scope" v-if="item.slotName">
            <slot :name="item.slotName" :slot-scope="scope"></slot>
          </template>
          <!-- 传入 format 函数来决定显示的数据 -->
          <template
            v-slot="{ row, $rowIndex }"
            v-else-if="item.format && typeof item.format == 'function'"
          >
            {{ item.format(row, $rowIndex) }}
          </template>
          <!-- 默认显示 -->
          <template v-else v-slot="{ row }">
            {{
              isNotUndefined(row[item.field])
                ? row[item.field]
                : options.rowFillText
            }}
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页器 -->
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
import ColumnHeader from './ColumnHeader.vue'

import { isNotUndefined } from './utils.js'

const defaultPageSizes = [10, 20, 50, 100]
const defaultPageLayout = 'total, sizes, prev, pager, next, jumper'

export default {
  name: 'ReTable',
  components: { ColumnHeader },
  props: {
    options: {
      type: Object,
      default: () => ({
        // 如果返回值为null或者undefined时的占位符，一般使用短横杠，这里默认为空字符串
        rowFillText: ''
      })
    },
    /**
     * 以下是表格的 props
     */
    columns: {
      type: Array,
      default: () => []
    },
    // 移入是否显示高亮
    highlightHoverRow: {
      type: Boolean,
      default: () => true
    },
    // 是否通过国际化去解析传入的标题
    isI18nTitle: {
      type: Boolean,
      default: () => true
    },

    /**
     * 以下是分页器的 props
     */
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
      return (
        isNotUndefined(this.pagination) &&
        isNotUndefined(this.getPaginationValue('currentPage'))
      )
    }
  },
  data() {
    return {
      defaultPageSizes,
      defaultPageLayout,
      onlyKey: 'index'
    }
  },
  methods: {
    // 辅助函数
    isNotUndefined,
    getPaginationValue(prop) {
      return this.pagination[this.paginationNodes[prop]]
    },
    // 方法函数
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
    // 可通过 ref 调用的函数
  }
}
</script>

<style scoped></style>
