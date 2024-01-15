<template>
  <div class="container">
    <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">搜索记录</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">统计时间</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">评分统计</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
  </el-container>
</el-container>
  </div>
  </template>
  
  <script>
  import homepage from "../components/homepage.vue"
  import comtable from "../components/comtable.vue"
  export default {
    name: 'home',
    components: {homepage, comtable},
    data() {
    return {
      activeIndex: '1', // 默认活动项
      currentComponent:'homepage'
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      switch (this.activeIndex) {
        case '1':
          this.currentComponent= 'homepage';
          break
        case '2':
          this.currentComponent= 'comtable';
          break
          case '3':
          this.currentComponent= 'charts';
          break
        default:
          return null;
      }
    },
  },
  }
  </script>
<style scoped>
.container{
  height: 100vh;
  display: flex;
}

.el-menu-vertical-demo{
  height: 100%;
}
</style>