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
  const sharedChartConfig = {
    legend: {},
    tooltip: {},
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
  };
  const sharedToolboxConfig = {
    top: "top",
    right: "5%",
    iconStyle: {
      borderColor: "#5ABE64", // default color
    },
    emphasis: {
      iconStyle: {
        borderColor: "#54C3F1", // Color Icon hover
      },
    },
    itemSize: 20, // Icon Size
  };
  const radarChartType = ref<"dimension" | "total">("dimension");
  const radarOptionDimension = computed(() => {
    return {
      ...sharedChartConfig,
      toolbox: {
        ...sharedToolboxConfig,
        feature: {
          saveAsImage: {
            show: true,
            name: t("sidebar.indicatorPanel.radarChart.name.dimension"),
            title: t("indicatorChart.buttons.download"),
            icon: "path://M653.6 770.4L517.8 926.2c-1.6 1.6-4.1 1.6-5.7 0L376.4 770.4l-0.4-0.4c-1.6-2.1 0.1-5.2 2.8-5.2H495V476c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v288.7h116.1c2.7 0 4.5 3.1 2.8 5.2-0.1 0.2-0.2 0.4-0.3 0.5z,M907.5 434c-36-42.8-84.9-72.9-138.9-85.8-11-56.4-40.5-107.9-84.1-146.2-47.6-41.8-108.8-64.8-172.2-64.8-63.6 0-124.9 23.2-172.6 65.2-43.7 38.6-73.2 90.4-84 147.2-52.6 13.9-100.2 44.3-135 86.6-38.4 46.6-59.5 105.5-59.5 166 0 69.8 27.2 135.4 76.5 184.7 35.5 35.5 79.4 59.5 127.2 70.2 12.4 2.8 24.2-6.7 24.2-19.5v-0.2c0-9.4-6.6-17.4-15.7-19.5-98.5-22.3-172.3-110.6-172.3-215.7 0-104.4 74.1-195.5 176.2-216.6l13.9-2.9 1.9-14.1C307.7 259.4 402 177.1 512.3 177.1c109.8 0 204 81.9 219 190.5l2 14.3 14.2 2.6c105.1 19.1 181.3 110.6 181.3 217.6 0 106.3-75.4 195.3-175.5 216.4-9.3 2-16 10.1-16 19.5v0.2c0 12.6 11.6 22.1 24 19.5 49.3-10.2 94.6-34.6 131-71 49.3-49.3 76.5-114.9 76.5-184.7 0.1-61.3-21.8-121-61.3-168z", //Copy bootstrap icon svg path, multipath use comma to seperate
          },
        },
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
      ...sharedChartConfig,
      toolbox: {
        ...sharedToolboxConfig,
        feature: {
          saveAsImage: {
            show: true,
            name: t("sidebar.indicatorPanel.radarChart.name.total"),
            title: t("indicatorChart.buttons.download"),
            icon: "path://M653.6 770.4L517.8 926.2c-1.6 1.6-4.1 1.6-5.7 0L376.4 770.4l-0.4-0.4c-1.6-2.1 0.1-5.2 2.8-5.2H495V476c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v288.7h116.1c2.7 0 4.5 3.1 2.8 5.2-0.1 0.2-0.2 0.4-0.3 0.5z,M907.5 434c-36-42.8-84.9-72.9-138.9-85.8-11-56.4-40.5-107.9-84.1-146.2-47.6-41.8-108.8-64.8-172.2-64.8-63.6 0-124.9 23.2-172.6 65.2-43.7 38.6-73.2 90.4-84 147.2-52.6 13.9-100.2 44.3-135 86.6-38.4 46.6-59.5 105.5-59.5 166 0 69.8 27.2 135.4 76.5 184.7 35.5 35.5 79.4 59.5 127.2 70.2 12.4 2.8 24.2-6.7 24.2-19.5v-0.2c0-9.4-6.6-17.4-15.7-19.5-98.5-22.3-172.3-110.6-172.3-215.7 0-104.4 74.1-195.5 176.2-216.6l13.9-2.9 1.9-14.1C307.7 259.4 402 177.1 512.3 177.1c109.8 0 204 81.9 219 190.5l2 14.3 14.2 2.6c105.1 19.1 181.3 110.6 181.3 217.6 0 106.3-75.4 195.3-175.5 216.4-9.3 2-16 10.1-16 19.5v0.2c0 12.6 11.6 22.1 24 19.5 49.3-10.2 94.6-34.6 131-71 49.3-49.3 76.5-114.9 76.5-184.7 0.1-61.3-21.8-121-61.3-168z", //Copy bootstrap icon svg path, multipath use comma to seperate
          },
        },
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
