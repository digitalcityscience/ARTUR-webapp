import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import IndicatorChart from "./components/IndicatorChart.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

const indicatorChart = createApp(IndicatorChart);
const pinia = createPinia();
indicatorChart.use(pinia);

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
indicatorChart.use(i18n);

indicatorChart.mount("#indicator");
