import { defineStore } from "pinia";
import { ref, computed, reactive, watch, nextTick, type WatchStopHandle } from "vue";
import { useI18n } from "vue-i18n";
import useIndicatorChartStore from "./indicatorChartStore";

const capacityTranslation: Record<string, string> = {
  Міцність: "Robustness",
  Винахідливість: "Redundancy",
  Інклюзивність: "Inclusiveness",
  Різноманітність: "Diversity",
  "Адаптивність та гнучкість": "Flexibility",
  "Створення резерву": "Resourcefulness",
  Інтеграційність: "Integration",
  "Рефлексивність та рефлективність": "Reflectiveness",
  Прозорість: "Transparency",
};
const useRadarChartStore = defineStore("radar-chart", () => {
  const { t, locale } = useI18n();
  const indicatorStore = useIndicatorChartStore();
  // Data fetched from API
  const indicatorData = ref<Record<string, any>>({});
  const answers = reactive<Record<string, Record<number, number | null>>>({}); // Store user answers
  const showDownloadModal = ref(false);

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
  // Update the submitResults function to save to database
  const saveAnswersToDatabase = async () => {
    const answersArray: {
      indicator_key: string;
      question_number: number;
      answer: number;
    }[] = [];
    Object.entries(answers).forEach(([indicatorKey, questions]) => {
      Object.entries(questions).forEach(([questionNumber, answer]) => {
        if (answer !== null) {
          answersArray.push({
            indicator_key: indicatorKey,
            question_number: parseInt(questionNumber),
            answer: answer,
          });
        }
      });
    });

    try {
      await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: answersArray as {
            indicator_key: string;
            question_number: number;
            answer: number;
          }[],
        }),
      });
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };
  // Load answers from database
  const loadAnswersFromDatabase = async () => {
    try {
      const response = await fetch("/api/answers");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = (await response.json()) as Record<string, Record<number, number>>;
      Object.entries(data).forEach(([key, value]) => {
        answers[key] = value;
      });
    } catch (error) {
      console.error("Failed to load answers:", error);
    }
  };
  // fetch capacity and load answers
  const fetchIndicatorData = async () => {
    try {
      const res = await fetch("api/capacity");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      indicatorData.value = data;
      await loadAnswersFromDatabase(); // Add this line
    } catch (error) {
      console.error("Failed to load initial data: ", error);
    }
  };
  // Dynamically calculate weighted scores for each capacity
  const calculateScores = async () => {
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
    await saveAnswersToDatabase();
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
  const dataViewButtons = computed(() => [
    t("indicatorChart.buttons.dataView"),
    t("indicatorChart.buttons.close"),
    t("indicatorChart.buttons.refresh"),
  ]);
  interface EChartsRadarIndicator {
    name: string;
    max: number;
    min: number;
  }
  interface EChartsSeriesData {
    name: string;
    value: number[];
    itemStyle: {
      color: string;
    };
  }
  function downloadTable(headers: string[], seriesData: EChartsSeriesData[]): void {
    const csvHeaders = ["#", ...headers];
    const csvRows = seriesData.map((series) => [series.name, ...series.value]);

    let csvContent = csvHeaders.join(",") + "\n";
    csvRows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // 🔥 Add UTF-8 BOM to support non-ASCII characters (e.g., Ukrainian, Chinese, Arabic)
    const utf8BOM = "\uFEFF";
    const blob = new Blob([utf8BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${t(
      "sidebar.indicatorPanel.radarChart.name." + radarChartType.value,
    )}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function generateTableHTML(opt: any): string {
    const radarIndicators: EChartsRadarIndicator[] = opt.radar[0].indicator;
    const headers: string[] = radarIndicators.map((indicator) => indicator.name);
    const seriesData: EChartsSeriesData[] = opt.series[0].data;

    const headerCells = headers
      .map((header) => `<th scope="col" class="text-center">${header}</th>`)
      .join("");

    const rows = seriesData
      .map((series) => {
        const cells = series.value
          .map((value) => `<td class="text-center">${value}</td>`)
          .join("");
        return `<tr><th scope="row">${series.name}</th>${cells}</tr>`;
      })
      .join("");

    const downloadButtons = `
    <div class="mb-3"><button id="download-csv-btn" class="btn btn-primary me-2">
    ${t("indicatorChart.buttons.downloadTable")}</button>
    </div>`;
    const table = `${downloadButtons}<table class="table table-striped table-hover"><thead>
    <tr class="table-dark"><th scope="col" class="text-center">#</th>${headerCells}</tr></thead>
    <tbody>${rows}</tbody></table>`;

    setTimeout(() => {
      const downloadBtn = document.getElementById("download-csv-btn");
      if (downloadBtn) {
        downloadBtn.addEventListener("click", () => downloadTable(headers, seriesData));
      }
    }, 100);

    return table;
  }
  const sharedChartConfig = computed(() => {
    return {
      title: {
        show: false,
        text: t("sidebar.indicatorPanel.radarChart.name." + radarChartType.value),
      },
      legend: { left: 0, top: 30, orient: "vertical", itemGap: 30 },
      tooltip: {},
      toolbox: {
        top: 10,
        right: 0,
        orient: "vertical",
        iconStyle: {
          color: "#628ee6",
          borderColor: "transparent",
        },
        emphasis: {
          iconStyle: {
            borderColor: "#628ee6", // Color Icon hover
          },
        },
        itemSize: 20, // Icon Size
        feature: {
          myTool1: {
            title: t("indicatorChart.buttons.download"),
            icon: "M1344 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z", //Copy bootstrap icon svg path, multipath use comma to seperate
            onclick: function () {
              showDownloadModal.value = true;
            },
          },
          dataView: {
            title: t("indicatorChart.buttons.dataView"),
            icon: "M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z,M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z",
            optionToContent: function (opt: any) {
              return generateTableHTML(opt);
            },
            lang: dataViewButtons.value,
          },
        },
      },
      radar: {
        splitNumber: 10,
        center: ["50%", "45%"],
        triggerEvent: true,
        indicator: [
          { name: t("echarts.capacities.Robustness"), max: 100 },
          { name: t("echarts.capacities.Redundancy"), max: 100 },
          { name: t("echarts.capacities.Diversity"), max: 100 },
          { name: t("echarts.capacities.Integration"), max: 100 },
          { name: t("echarts.capacities.Resourcefulness"), max: 100 },
          { name: t("echarts.capacities.Inclusiveness"), max: 100 },
          { name: t("echarts.capacities.Reflectiveness"), max: 100 },
          { name: t("echarts.capacities.Flexibility"), max: 100 },
          { name: t("echarts.capacities.Transparency"), max: 100 },
        ],
      },
      // Add custom text below the legend
      graphic: [
        {
          type: "text",
          left: "center",
          bottom: 25, // Position near the bottom of the chart
          style: {
            text: t("sidebar.indicatorPanel.radarChart.text"),
            fontSize: 12,
            fill: "#777",
            textAlign: "center",
            cursor: "pointer",
          },
          onclick: function () {
            alert(t("sidebar.indicatorPanel.radarChart.alert"));
          },
        },
      ],
    };
  });
  const radarOptionDimension = computed(() => {
    return {
      ...sharedChartConfig.value,
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
      ...sharedChartConfig.value,
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
  const showRadarModal = ref(false);
  function selectCapacity(label: string) {
    if (locale.value === "ua") label = capacityTranslation[label];
    indicatorStore.capacitySelected = label;
    showRadarModal.value = false;
    indicatorStore.showCapacityModal = true;

    // Use nextTick to ensure modal is rendered before watching
    nextTick(() => {
      const stopWatching: WatchStopHandle = watch(
        () => indicatorStore.showCapacityModal,
        (newShowCapacity) => {
          if (!newShowCapacity) {
            showRadarModal.value = true;
            stopWatching(); // Stop the watcher after the first execution
          }
        },
      );
    });
  }

  return {
    answers,
    radarChartType,
    showDownloadModal,
    radarOptionDimension,
    radarOptionTotal,
    showRadarModal,
    fetchIndicatorData,
    initializeAnswer,
    calculateScores,
    selectCapacity,
  };
});
export default useRadarChartStore;
