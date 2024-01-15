<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { test } from "../api/test";

export default defineComponent({
  name: "test",
  data() {
    return {
      data: "",
    };
  },
  components: {},
  mounted() {
    this.ready();
  },
  methods: {
    ready() {},
    getTest() {
      let that = this;
      test()
        .then((res: any) => {
          
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/style/scss/test.scss";
</style>
