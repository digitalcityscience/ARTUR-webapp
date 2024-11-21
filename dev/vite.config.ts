import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import dotenv from "dotenv";
import vue from "@vitejs/plugin-vue";

// Comment out this line when deploying
dotenv.config({ path: "../.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: "public",
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: `http://${process.env.SERVER_HOST}:3000`,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq) => {
            console.log(`Proxying request to: ${proxyReq.path}`);
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
