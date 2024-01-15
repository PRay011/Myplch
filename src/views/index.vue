<template>
  <div class="container">
    <div class="logo_show" v-show="logo" id="logo"></div>
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
    <div class="title">Myplch</div>
    <div class="content">
      <search />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import welcomeHeader from "../components/header.vue";
import search from "../components/search.vue";
import navigationBar from "../components/navigationBar.vue";
import * as echarts from "echarts";
import { logout } from "../api/self";

export default defineComponent({
  name: "index",
  data() {
    return {
      data: "",
      logo: true,
      self_card: false,
      user: {},
    };
  },
  components: { welcomeHeader, navigationBar, search },
  mounted() {
    this.ready();
  },
  methods: {
    ready() {
      this.user = JSON.parse(sessionStorage.getItem("user") || "{}");
      let count = JSON.parse(sessionStorage.getItem("count") || "{}");
      if (count == "firstIn") {
        this.logo_animation();
        sessionStorage.setItem("count", JSON.stringify("notFirstIn"));
      } else {
        this.logo = false;
      }
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
    logo_animation() {
      let chartDom = document.getElementById("logo");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "Mypl Search",
                fontSize: 80,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#000",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 3000,
                loop: false,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
                    },
                  },
                  {
                    percent: 0.8,
                    style: {
                      fill: "transparent",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      fill: "black",
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      option && myChart.setOption(option);
      setTimeout(() => {
        this.logo = false;
        console.log(this.logo);
      }, 3000);
      // myChart.on("finished", function () {
      //   this.logo = false;
      //   console.log(this.logo);
      // });
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

<style scoped>
@import "../assets/style/scss/index.scss";
</style>
