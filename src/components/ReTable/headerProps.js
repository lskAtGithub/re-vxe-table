export default {
  // 标题
  title: {
    type: String,
    default: () => ''
  },
  // 组件类型
  type: {
    type: String,
    validator: (value) => {
      return ['input', 'select'].includes(value)
    }
  },
  // 循环的数据, 当类型为 select 时有用到
  options: {
    type: Array,
    default: () => []
  },
  // 组件实例如果需要绑定值name
  model: {
    type: String,
    default: () => ''
  },
  // 当前组件实例上绑定的属性
  prop: {
    type: Object,
    default: () => ({})
  },
  // 当前组件实例中子实例上绑定的属性
  childProp: {
    type: Object,
    default: () => ({})
  },
  // 当前表头row包含的对象
  scope: {
    type: Object,
    default: () => ({})
  },
  // 需要绑定到组件上的类型
  attrs: {
    type: Object,
    default: () => ({})
  }
}
