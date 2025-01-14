import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const useRadarChartStore = defineStore("radar-chart", () => {
  const { t } = useI18n();
  // Resilience Score
  const socialScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const economicScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const institutionalScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const physicalScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const averageArray = computed(() =>
    socialScore.value.map(
      (_: any, i: number) =>
        (socialScore.value[i] +
          economicScore.value[i] +
          institutionalScore.value[i] +
          physicalScore.value[i]) /
        4,
    ),
  );
  const radarChartType = ref<"dimension" | "total">("dimension");
  const radarOptionDimension = {
    legend: {},
    tooltip: {},
    radar: {
      splitNumber: 10,
      indicator: [
        { name: computed(() => t("echarts.capacities.Robustness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Redundancy")), max: 100 },
        { name: computed(() => t("echarts.capacities.Diversity")), max: 100 },
        { name: computed(() => t("echarts.capacities.Integration")), max: 100 },
        { name: computed(() => t("echarts.capacities.Transparency")), max: 100 },
        { name: computed(() => t("echarts.capacities.Resourcefulness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Inclusiveness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Reflectiveness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Flexibility")), max: 100 },
      ],
    },
    series: [
      {
        name: computed(() => t("sidebar.dashboardPanel.radarChart.name.dimension")),
        type: "radar",
        data: [
          {
            value: socialScore.value,
            name: computed(() => t("sidebar.dashboardPanel.radarChart.social")),
            itemStyle: { color: "#91CC75" },
          },
          {
            value: economicScore.value,
            name: computed(() => t("sidebar.dashboardPanel.radarChart.economic")),
            itemStyle: { color: "#FAC858" },
          },
          {
            value: institutionalScore.value,
            name: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
            itemStyle: { color: "#EE6666" },
          },
          {
            value: physicalScore.value,
            name: computed(() => t("sidebar.dashboardPanel.radarChart.physical")),
            itemStyle: { color: "#73C0DE" },
          },
        ],
      },
    ],
  };
  const radarOptionTotal = {
    legend: {},
    tooltip: {},
    radar: {
      splitNumber: 10,
      indicator: [
        { name: computed(() => t("echarts.capacities.Robustness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Redundancy")), max: 100 },
        { name: computed(() => t("echarts.capacities.Diversity")), max: 100 },
        { name: computed(() => t("echarts.capacities.Integration")), max: 100 },
        { name: computed(() => t("echarts.capacities.Transparency")), max: 100 },
        { name: computed(() => t("echarts.capacities.Resourcefulness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Inclusiveness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Reflectiveness")), max: 100 },
        { name: computed(() => t("echarts.capacities.Flexibility")), max: 100 },
      ],
    },
    series: [
      {
        name: computed(() => t("sidebar.dashboardPanel.radarChart.name.total")),
        type: "radar",
        data: [
          {
            value: averageArray.value,
            name: computed(() => t("sidebar.dashboardPanel.radarChart.type.total")),
            itemStyle: { color: "#9A60B4" },
          },
        ],
      },
    ],
  };
  return { radarChartType, radarOptionDimension, radarOptionTotal };
});
export default useRadarChartStore;
