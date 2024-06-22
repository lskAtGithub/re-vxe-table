<template>
  <div class="container">
    <div class="chunk" v-for="(item, index) in tableComponents" :key="index">
      <h2>{{ item.title }}</h2>
      <component :is="item.componentName"></component>
    </div>
  </div>
</template>

<script>
import DefaultTable from './components/Default/index.vue'

export default {
  name: 'HomeRoute',
  components: { DefaultTable },
  data() {
    return {
      tableComponents: [
        { title: '基础表格', componentName: 'DefaultTable' },
        { title: '复杂表格', componentName: 'DefaultTable' },
        { title: '复杂表格', componentName: 'DefaultTable' },
      ]
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  padding: 30px 50px;
  background: #d2d2d2;
}
.chunk {
  background-color: #fff;
  border-radius: 5px;
  margin: 20px;
  padding: 20px 40px 60px;
}

.container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
