import { defineStore } from "pinia";
import { ref, computed, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

const useRadarChartStore = defineStore("radar-chart", () => {
  const { t } = useI18n();
  // Data fetched from API
  const indicatorData = ref<Record<string, any>>({});
  const answers = reactive<Record<string, Record<number, number | null>>>({}); // Store user answers
  // Fetch Indicator Data
  const fetchIndicatorData = async () => {
    try {
      const res = await fetch("api/capacity");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      indicatorData.value = data;
    } catch (error) {
      console.error("Failed to load initial data: ", error);
    }
  };
  // Resilience Scores
  const socialScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const economicScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const institutionalScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const physicalScore = ref([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const capacityWeight: Record<string, number[]> = {
    Social: [12, 8, 3, 14, 12, 17, 8, 9, 10],
    Economic: [2, 2, 2, 2, 3, 0, 0, 2, 2],
    Institutional: [13, 7, 4, 2, 12, 4, 8, 8, 5],
    Physical: [7, 4, 6, 5, 1, 3, 3, 5, 2],
  };
  // Dynamically calculate weighted scores for each capacity
  const calculateScores = () => {
    const capacities = [
      "robustness",
      "redundancy",
      "diversity",
      "integration",
      "resourcefulness",
      "inclusiveness",
      "reflectiveness",
      "flexibility",
      "transparency",
    ];
    // Reset all scores
    socialScore.value.fill(0);
    economicScore.value.fill(0);
    institutionalScore.value.fill(0);
    physicalScore.value.fill(0);
    // Iterate through each indicator in the data
    Object.keys(indicatorData.value).forEach((key) => {
      const indicator = indicatorData.value[key];
      const dimension = indicator["dimension"] as string;

      // Get dimension's corresponding score array
      const dimensionScore =
        dimension === "Social"
          ? socialScore
          : dimension === "Economic"
          ? economicScore
          : dimension === "Institutional"
          ? institutionalScore
          : physicalScore;

      // Fetch user answers for this indicator
      const userAnswers = answers[key];
      // Skip if there are no answers for this indicator
      if (!userAnswers) return;

      // Calculate scores for each capacity
      capacities.forEach((capacity, index) => {
        if (indicator[capacity] === 0) return; // Skip if capacity is not applicable
        // Sum up scores for all answered questions in this capacity
        let capacityScoreSum = 0;

        Object.entries(userAnswers).forEach(([questionId, score]) => {
          if (score !== null) {
            capacityScoreSum += score;
          }
        });
        // Calculate the final score for this capacity
        dimensionScore.value[index] +=
          (capacityScoreSum * 100) / (3 * capacityWeight[dimension][index]);
        console.log("capacity:", capacity, "\nscore:", capacityScoreSum);
      });
    });
    console.log(
      "Scores calculated: ",
      socialScore.value,
      economicScore.value,
      institutionalScore.value,
      physicalScore.value,
    );
  };
  const totalCapacity = [34, 21, 15, 23, 28, 24, 19, 24, 19];
  // Average array for the "Total" radar chart
  const totalArray = computed(() => {
    return socialScore.value.map((_, i) => {
      const totalScore =
        socialScore.value[i] * capacityWeight["Social"][i] +
        economicScore.value[i] * capacityWeight["Economic"][i] +
        institutionalScore.value[i] * capacityWeight["Institutional"][i] +
        physicalScore.value[i] * capacityWeight["Physical"][i];

      console.log(
        "total Score:",
        totalScore,
        "\ntotal Capacity:",
        totalScore / totalCapacity[i],
      );
      console.log(
        Math.max(
          ...(socialScore.value,
          economicScore.value,
          institutionalScore.value,
          physicalScore.value),
        ) / 5,
      );
      // Calculate and return the total
      return totalScore / totalCapacity[i];
    });
  });

  // Answer Intialization
  const initializeAnswer = (indicatorKey: string, questionNumber: number[]) => {
    if (!answers[indicatorKey]) {
      // Initialize the questions object for this indicator
      answers[indicatorKey] = {};
      // Set default for all questions
      for (let i = 1; i <= questionNumber.length; i++) {
        answers[indicatorKey][i] = null; // Default score
      }
    }
  };

  // Radar chart configuration
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
        name: computed(() => t("sidebar.indicatorPanel.radarChart.name.dimension")),
        type: "radar",
        data: [
          {
            value: socialScore,
            name: computed(() => t("sidebar.indicatorPanel.radarChart.social")),
            itemStyle: { color: "#91CC75" },
          },
          {
            value: economicScore,
            name: computed(() => t("sidebar.indicatorPanel.radarChart.economic")),
            itemStyle: { color: "#FAC858" },
          },
          {
            value: institutionalScore,
            name: computed(() => t("sidebar.indicatorPanel.radarChart.institutional")),
            itemStyle: { color: "#EE6666" },
          },
          {
            value: physicalScore,
            name: computed(() => t("sidebar.indicatorPanel.radarChart.physical")),
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
        name: computed(() => t("sidebar.indicatorPanel.radarChart.name.total")),
        type: "radar",
        data: [
          {
            value: totalArray,
            name: computed(() => t("sidebar.indicatorPanel.radarChart.type.total")),
            itemStyle: { color: "#9A60B4" },
          },
        ],
      },
    ],
  };

  return {
    fetchIndicatorData,
    initializeAnswer,
    calculateScores,
    answers,
    radarChartType,
    radarOptionDimension,
    radarOptionTotal,
  };
});
export default useRadarChartStore;
