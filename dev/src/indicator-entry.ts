import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import IndicatorChart from "./components/IndicatorChart.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";

const indicatorChart = createApp(IndicatorChart);
const pinia = createPinia();
indicatorChart.use(pinia);
indicatorChart.mount("#indicator");
