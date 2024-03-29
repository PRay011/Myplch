import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  server: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: 7878,
    https: false,
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:4523/m1/2962122-0-default",
        // target: "http://127.0.0.1:10086",
        target: "http://192.168.3.209:10086",
        // target: "http://192.168.50.23:10086",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        additionalData: '@import "@/assets/style/mixin.scss";',
      },
    },
  },
});
