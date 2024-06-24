<template>
  <div class="re-table-container">
    <!-- 表格 -->
    <div class="re-vxe-table-container">
      <vxe-table
        v-bind="$attrs"
        v-on="$listeners"
        :highlight-hover-row="highlightHoverRow"
        :menuConfig="menuConfig"
        :tooltipConfig="tooltipConfig"
      >
        <vxe-table-column
          v-for="(item, index) in columns"
          :key="index"
          v-bind="item"
        >
          <template #header="scope" v-if="item.header && item.header.type">
            <column-header
              :title="item.title"
              :type="item.header.type"
              :attrs="item.header.attrs || {}"
              :options="item.header.options || []"
              :scope="scope"
              @change-value="
                (value) =>
                  handleChange({
                    [isNotUndefined(item.header.model)
                      ? item.header.model
                      : item.field]: value
                  })
              "
            ></column-header>
          </template>

          <!-- 插槽 -->
          <template v-slot="scope" v-if="item.slotName">
            <slot :name="item.slotName" :slot-scope="scope"></slot>
          </template>
          <!-- 标签 -->
          <template
            v-slot="{ row }"
            v-else-if="item.tag"
          >
            <el-tag v-bind="item.tagOption">{{ row[item.field] }}</el-tag>
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

          <!-- 无数据 -->
          <template v-slot:empty>
            <span>{{ $t('FundingManagement.Withdrawal.no_data') }}</span>
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

const defaultPageSizes = [10, 20, 30, 50]
const defaultPageLayout = 'total, sizes, prev, pager, next, jumper'

export default {
  name: 'ReTable',
  components: { ColumnHeader },
  props: {
    /**
     * 如果传入了这个函数,
     * mounted时会调用该函数,
     * 分页变化时会调用该函数,
     * 如果表头有查询,表头变动会调用该函数,
     * 函数参数为一个对象,包含以上数据变化后的值
     */
    autoFunc: {
      type: Function || undefined
    },
    options: {
      type: Object,
      default: () => ({
        // 如果返回值为null或者undefined时的占位符，一般使用短横杠，这里默认为空字符串
        rowFillText: ''
      })
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    },
    tooltipConfig: {
      type: Object,
      default: () => ({})
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
  mounted() {
    let params = {}
    if (this.pagination) {
      params = this.pagination
    }
    this.hasRunAutoFunc(params)
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
      return !!this.pagination[this.paginationNodes[prop]]
    },
    hasRunAutoFunc(params) {
      if (this.autoFunc && typeof this.autoFunc === 'function') {
        this.autoFunc(params)
      }
    },
    // 方法函数
    handleCurrentChange(e) {
      const result = {
        [this.paginationNodes.currentPage]: e
      }
      this.hasRunAutoFunc(result)
      this.$emit('changePaging', result)
    },
    handleSizeChange(e) {
      const result = {
        [this.paginationNodes.pageSize]: e
      }
      this.hasRunAutoFunc(result)
      this.$emit('changePaging', result)
    },
    handleChange(params) {
      this.hasRunAutoFunc(params)
    }
    // 可通过 ref 调用的函数
  }
}
</script>

<style scoped>
.re-pagination-container {
  text-align: right;
  margin-top: 16px;
}
</style>
