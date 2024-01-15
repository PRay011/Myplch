<template>
  <div class="container">
    <div class="form" :style="[show_list ? 'box-shadow: 3px 0px 4px -2px rgba(64, 60, 67, 0.16);' : '']">
      <button>
        <svg
          width="17"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="search"
        >
          <path
            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
            stroke="currentColor"
            stroke-width="1.333"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <input
        class="input"
        placeholder="Type your text"
        required=""
        v-model="searchContent"
        @blur="showList(false)"
        @focus="showList(true)"
        @keyup.enter="search($event)"
        type="text"
      />
      <button class="reset" @mousedown="reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
    <div
      class="listbox"
      :style="[show_list ? 'display:block;' : 'display:none']"
    >
      <div
        class="box"
        v-for="item in hot_list"
        :key="item.id"
        @mousedown="getHotWord(item.name)"
      >
        <text v-if="item.id == 1" class="first">{{ item.id }}</text>
        <text v-else-if="item.id == 2" class="second">{{ item.id }}</text>
        <text v-else-if="item.id == 3" class="third">{{ item.id }}</text>
        <text v-else class="default">{{ item.id }}</text>
        <text class="word_name">{{ item.name }}</text>
        <span class="word_count">{{ item.value }}</span>
      </div>
    </div>
  </div>
  <!-- index -->
</template>
<script>
import { defineComponent } from "vue";
import { hotWords } from "../api/search";
export default defineComponent({
  name: "search",
  data() {
    return {
      show_list: false,
      searchContent: "",
      timer: "",
      choose_hot: true,
      hot_list: [],
    };
  },
  mounted() {
    this.ready();
  },
  methods: {
    ready() {
      if (this.$route.query.searchContent)
        this.searchContent = this.$route.query.searchContent;
      this.getHotWords();
    },
    showList(show) {
      if (show) this.show_list = true;
      else this.show_list = false;
    },
    getHotWord(hotWord) {
      this.searchContent = hotWord;
      this.choose_hot = false;
      this.search();
    },
    reset() {
      this.searchContent = "";
      this.choose_hot = false;
    },
    search(event) {
      //去除所有空格之后判断输入是否只有空格或者为空

      let whetherBlank = this.searchContent.replace(/\s+/g, "");
      if (whetherBlank != "") {
        if (this.choose_hot) event.target.blur();
        this.show_list = false;
        this.choose_hot = true;
        this.timer = setTimeout(() => {
          this.$router.push({
            path: "/myplch",
            query: {
              searchContent: this.searchContent,
            },
          });
        }, 500);
      }
    },
    getHotWords() {
      hotWords()
        .then((res) => {
          this.hot_list = res.data;
          let count = 1;
          this.hot_list.forEach((word) => {
            word.id = count++;
          });
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

<style scoped>
@import "../assets/components/css/search.scss";
</style>
