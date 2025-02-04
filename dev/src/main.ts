import "./assets/css/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "leaflet/dist/leaflet.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import VChart from "vue-echarts";
import messages from "@intlify/unplugin-vue-i18n/messages";
import App from "./App.vue";

const app = createApp(App);

// Register ECharts component
app.component("v-chart", VChart);

// Create Pinia instance
const pinia = createPinia();
app.use(pinia);

// Get the browser language
const browserLanguage = navigator.language.split("-")[0];
const locale = browserLanguage === "ua" ? "ua" : "en";
// Create I18n instance
const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  locale,
  messages,
  allowHtml: true,
});
app.use(i18n);

app.mount("#app");
