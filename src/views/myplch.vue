<template>
  <div class="container">
    <div class="loading" v-show="loading" id="logo">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        class="wheel-and-hamster"
      >
        <div class="wheel"></div>
        <div class="hamster">
          <div class="hamster__body">
            <div class="hamster__head">
              <div class="hamster__ear"></div>
              <div class="hamster__eye"></div>
              <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
          </div>
        </div>
        <div class="spoke"></div>
      </div>
    </div>
    <welcomeHeader style="z-index: 999" />
    <!-- <div class="title">Myplch_content</div> -->
    <div class="content">
      <el-divider class="divider" />
      <el-tabs v-model="activeName" class="tabs" @tab-click="createCloud">
        <el-tab-pane label="竞争关键词打分" class="tabs_content" name="compete">
          <div class="compete">
            <div
              class="compete_word"
              v-for="compete_word in compete_words"
              :key="compete_word.word"
            >
              <div class="word">
                {{ compete_word.word }}
              </div>
              <div class="degree">竞争度：{{ compete_word.degree }}</div>
              <el-rate v-model="compete_word.rate" class="rate" allow-half />
            </div>
            <div class="submit">
              <button class="pushable" @click="submitRate">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">上传评分</span>
              </button>
            </div>
          </div>
          <div class="graph">
            <!-- <div class="pie">
              <div class="pie_compete" id="pie_compete"></div>
              <div class="pie_rate" id="pie_rate"></div>
            </div> -->
            <div class="line" id="lineGraph" width="500" height="500"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="词云" class="tabs_content" name="cloud">
          <div class="cloud" id="words_cloud"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick } from "vue";
import welcomeHeader from "../components/header.vue";
import "echarts-wordcloud";
import * as echarts from "echarts";
import { search } from "../api/search";
import { submitScores } from "../api/myplch";

export default defineComponent({
  name: "myplch",
  data() {
    return {
      data: "",
      activeName: "compete",
      cloud: true,
      loading: true,
      timer: "",
      searchContent: "",
      X_line: [],
      Y_compete: [],
      Y_rate: [],
      compete_words: [],
      words_cloud: [],
    };
  },
  watch: {
    $route(to, from) {
      this.ready();
    },
  },
  components: { welcomeHeader },
  mounted() {
    this.ready();
    // this.lineGraph();
  },
  methods: {
    ready() {
      this.X_line = [];
      this.Y_compete = [];
      this.Y_rate = [];
      this.compete_words = [];
      this.words_cloud = [];
      this.activeName = "compete";
      this.loading = true;
      // this.loading = false;
      this.searchContent = this.$route.query.searchContent;

      // this.lineGraph();
      this.search();
    },
    createCloud() {
      if (this.cloud) {
        this.cloud = false;
        this.timer = setTimeout(() => {
          this.wordCloudGraph();
        }, 100);
        // this.wordCloudGraph();
      }
    },
    lineGraph() {
      let chartDom = document.getElementById("lineGraph");
      echarts.init(chartDom).dispose();
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["竞争度", "评分"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.X_line,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "竞争度",
            type: "bar",
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.Y_compete,
          },
          {
            name: "评分",
            type: "bar",
            // label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.Y_rate,
            itemStyle: {
              normal: {
                color: "rgba(238,102,102)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    wordCloudGraph() {
      let chartDom = document.getElementById("words_cloud");
      echarts.init(chartDom).dispose();
      let myChart = echarts.init(chartDom);
      myChart.setOption({
        series: [
          {
            type: "wordCloud",
            data: this.words_cloud,
            shape: "circle", // 词云图显示排列为什么形状，默认 circle，cardioid 心形，diamond 菱形
            textStyle: {
              normal: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: function () {
                  // 随即配色，每次刷新页面都会显示不同颜色
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
            },
            emphasis: {
              focus: "self",
              textStyle: {
                textShadowBlur: 10,
                textShadowColor: "#333",
              },
            },
          },
        ],
      });
    },
    search() {
      // let username = JSON.parse(sessionStorage.getItem("user") || "{}");
      // let data = { username: username, seedword: this.searchContent };
      let data = { seed: this.searchContent };
      search(this.searchContent)
        .then((res) => {
          let cloud = {};
          let number = 0;
          res.data.forEach((word) => {
            number++;
            cloud = {};
            cloud.name = word.word;
            cloud.value = word.degree;
            this.words_cloud.push(cloud);
            this.words_cloud.push(cloud);
            if (number < 10) {
              this.X_line.push(word.word);
              this.Y_compete.push(word.degree);
              this.Y_rate.push(word.averageRate/2);
              this.compete_words.push(word);
            }
          });
          this.lineGraph();
          setTimeout(() => {
            this.loading = false;
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitRate() {
      let data = { seedKey: this.searchContent, scores: [] };
      let score = {};
      this.compete_words.forEach((word) => {
        if (word.rate > 0) {
          score = {};
          score.compKey = word.word;
          score.score = word.rate;
          data.scores.push(score);
        }
      });
      console.log(data);
      submitScores(data)
        .then((res) => {
          alert("打分成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/scss/myplch.scss";
</style>
