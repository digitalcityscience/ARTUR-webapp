import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
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
  const capacityWeight = computed<Record<string, number[]>>(() => ({
    Social: indicatorData.value.socialWeight ?? [0, 0, 0, 0, 0, 0, 0, 0, 0],
    Economic: indicatorData.value.economicWeight ?? [0, 0, 0, 0, 0, 0, 0, 0, 0],
    Institutional: indicatorData.value.institutionalWeight ?? [0, 0, 0, 0, 0, 0, 0, 0, 0],
    Physical: indicatorData.value.physicalWeight ?? [0, 0, 0, 0, 0, 0, 0, 0, 0],
  }));
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
    Object.keys(indicatorData.value.data).forEach((key) => {
      const indicator = indicatorData.value.data[key];
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
        dimensionScore.value[index] += Math.round(
          (capacityScoreSum * 100) / (3 * capacityWeight.value[dimension][index]),
        );
      });
    });
  };
  const totalCapacity = computed<number[]>(() => {
    return capacityWeight.value.Social.map(
      (_: any, i: number) =>
        capacityWeight.value.Social[i] +
        capacityWeight.value.Economic[i] +
        capacityWeight.value.Institutional[i] +
        capacityWeight.value.Physical[i],
    );
  });
  // Average array for the "Total" radar chart
  const totalArray = computed(() => {
    return socialScore.value.map((_, i) => {
      const totalScore =
        socialScore.value[i] * capacityWeight.value["Social"][i] +
        economicScore.value[i] * capacityWeight.value["Economic"][i] +
        institutionalScore.value[i] * capacityWeight.value["Institutional"][i] +
        physicalScore.value[i] * capacityWeight.value["Physical"][i];
      // Calculate and return the total
      return Math.round(totalScore / totalCapacity.value[i]);
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
  const radarOptionDimension = computed(() => {
    return {
      legend: {},
      tooltip: {},
      toolbox: {
        feature: {
          saveAsImage: {
            show: true,
            name: t("sidebar.indicatorPanel.radarChart.name.dimension"),
            title: t("indicatorChart.buttons.download"),
          },
        },
      },
      radar: {
        splitNumber: 10,
        indicator: [
          { name: t("echarts.capacities.Robustness"), max: 100 },
          { name: t("echarts.capacities.Redundancy"), max: 100 },
          { name: t("echarts.capacities.Diversity"), max: 100 },
          { name: t("echarts.capacities.Integration"), max: 100 },
          { name: t("echarts.capacities.Transparency"), max: 100 },
          { name: t("echarts.capacities.Resourcefulness"), max: 100 },
          { name: t("echarts.capacities.Inclusiveness"), max: 100 },
          { name: t("echarts.capacities.Reflectiveness"), max: 100 },
          { name: t("echarts.capacities.Flexibility"), max: 100 },
        ],
      },
      series: [
        {
          name: t("sidebar.indicatorPanel.radarChart.name.dimension"),
          type: "radar",
          data: [
            {
              value: socialScore.value,
              name: t("sidebar.indicatorPanel.radarChart.social"),
              itemStyle: { color: "#91CC75" },
            },
            {
              value: economicScore.value,
              name: t("sidebar.indicatorPanel.radarChart.economic"),
              itemStyle: { color: "#FAC858" },
            },
            {
              value: institutionalScore.value,
              name: t("sidebar.indicatorPanel.radarChart.institutional"),
              itemStyle: { color: "#EE6666" },
            },
            {
              value: physicalScore.value,
              name: t("sidebar.indicatorPanel.radarChart.physical"),
              itemStyle: { color: "#73C0DE" },
            },
          ],
        },
      ],
    };
  });
  const radarOptionTotal = computed(() => {
    return {
      legend: {},
      tooltip: {},
      toolbox: {
        feature: {
          saveAsImage: {
            show: true,
            name: t("sidebar.indicatorPanel.radarChart.name.total"),
            title: t("indicatorChart.buttons.download"),
          },
        },
      },
      radar: {
        splitNumber: 10,
        indicator: [
          { name: t("echarts.capacities.Robustness"), max: 100 },
          { name: t("echarts.capacities.Redundancy"), max: 100 },
          { name: t("echarts.capacities.Diversity"), max: 100 },
          { name: t("echarts.capacities.Integration"), max: 100 },
          { name: t("echarts.capacities.Transparency"), max: 100 },
          { name: t("echarts.capacities.Resourcefulness"), max: 100 },
          { name: t("echarts.capacities.Inclusiveness"), max: 100 },
          { name: t("echarts.capacities.Reflectiveness"), max: 100 },
          { name: t("echarts.capacities.Flexibility"), max: 100 },
        ],
      },
      series: [
        {
          name: t("sidebar.indicatorPanel.radarChart.name.total"),
          type: "radar",
          data: [
            {
              value: totalArray.value,
              name: t("sidebar.indicatorPanel.radarChart.type.total"),
              itemStyle: { color: "#9A60B4" },
            },
          ],
        },
      ],
    };
  });

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
