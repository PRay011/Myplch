<template>
  <div class="container">
    <!-- <button class="inSystem" @click="inSystem()">进入系统</button> -->
    <div class="tooltip-container" @click="inSystem()">
      <span class="tooltip">欢迎来到MYPLCH</span>
      <span class="text">进入系统</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //输入用户名之后登入系统
    inSystem() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import "../assets/style/scss/home.scss";
</style>
