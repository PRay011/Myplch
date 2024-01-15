<template>
  <div class="header">
    <div class="header_name" @click="toIndex">Myplch</div>
    <div class="header_search">
      <search style="z-index: 999" />
    </div>
    <div class="header_content">欢迎您，{{ user.username }}</div>
    <!-- <Router-link to=""> -->
    <div class="self" @click="openCard">U</div>
    <!-- <el-avatar
      :size="60"
      class="self"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      @click="selfCard"
    /> -->
    <div class="selfCard" v-show="self_card">
      <div class="close" @click="closeCard">
        <el-icon><CloseBold /></el-icon>
      </div>
      <el-avatar
        :size="80"
        class="card_head"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <div class="card_name">nihao,{{user.username}}</div>
      <div class="card_button">
        <button class="self_button">selfCenter</button>
        <button class="logout_button" @click="logout">logout</button>
      </div>
    </div>
    <!-- </Router-link> -->

    <!-- <el-tag size="large" class="header_profile">{{ user.roleName }}</el-tag> -->
    <!-- <el-button type="danger" plain class="header_log" @click="userLogout"
      >退出登录</el-button -->
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { logout } from "../api/self";

import search from "./search.vue";

export default defineComponent({
  name: "header",
  data() {
    return {
      data: "",
      user: {
        username: "lb",
        roleId: 2,
        roleName: "系统管理员",
      },
      page_name: "首页",
      self_card: false,
    };
  },
  mounted() {
    this.ready();
  },
  components: { search },
  methods: {
    userLogout() {
      //普通管理员登录系统
      // logout()
      //   .then((res: any) => {
      //     console.log("logout success");
      //     sessionStorage.removeItem("user");
      //     this.$router.push("/authentication/login");
      //   })
      //   .catch((err: any) => {
      //     console.log(err);
      //   });
    },
    ready() {
      this.user = JSON.parse(sessionStorage.getItem("user") || "{}");
    },
    toIndex() {
      this.$router.push("/index");
    },
    logout() {
      logout()
        .then((res) => {
          this.$router.push("/login");
          sessionStorage.setItem("user", null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openCard() {
      this.self_card = true;
    },
    closeCard() {
      this.self_card = false;
    },
  },
});
</script>

<style lang="scss" scoped="scoped">
@import "../assets/components/css/header.scss";
</style>
