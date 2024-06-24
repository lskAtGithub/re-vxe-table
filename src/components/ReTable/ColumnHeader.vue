<template>
  <div class="header-search-container">
    <div>{{ title }}</div>
    <!-- input 组件 -->
    <el-input
      v-if="type === 'input'"
      v-model="value"
      v-bind="attrs"
      :size="size"
      @input="handleInput"
    ></el-input>
    <!-- select 组件 -->
    <el-select
      v-if="type === 'select'"
      v-model="value"
      v-bind="attrs"
      :size="size"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import headerProps from './headerProps'

export default {
  name: 'ReTableColumnHeader',
  props: headerProps,
  computed: {},
  data() {
    return {
      value: '',
      size: 'mini',
      clock: null
    }
  },
  methods: {
    handleInput() {
      if (this.clock !== null) {
        clearTimeout(this.clock)
        this.clock = setTimeout(() => {
          this.clock = null
          this.$emit('change-value', this.value)
        }, 300)
      } else {
        this.clock = setTimeout(() => {
          this.clock = null
          this.$emit('change-value', this.value)
        }, 300)
      }
    },
    handleChange() {
      this.$emit('change-value', this.value)
    }
  }
}
</script>
