<script lang="ts" setup>
import { ref, watch, reactive, computed } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import RadarChart from "./RadarChart.vue";
import useIndicatorStore from "@/stores/indicatorStore";
import useEchartsStore from "@/stores/chartStore";
import { useI18n } from "vue-i18n";

const indicatorStore = useIndicatorStore();
const echartsStore = useEchartsStore();
const { t, messages, locale } = useI18n();
const translations = computed(
  () => messages.value[locale.value].initialIndicators as any,
);
const selectedIndicator = ref("");
const showedIndicator = ref("");

// Open the Indicator Selection Window
const openIndicatorSelection = (type: "basic" | "total"): void => {
  const mainWinWidth = window.innerWidth;
  const mainWinHeight = window.innerHeight;
  const newWinWidth = 1000;
  const newWinHeight = 1000;
  const leftOffset = (mainWinWidth - newWinWidth) / 2;
  const topOffset = (mainWinHeight - newWinHeight) / 2;
  indicatorStore.indicatorType = type;
  window.open(
    "/indicator-selection-popup.html",
    "",
    `left=${leftOffset},top=${topOffset},width=${newWinWidth},height=${newWinHeight}`,
  );
};
// Delete the selected indicator and save the deleted indicator name in Local Storage
function deleteSelection(indicator: string) {}
// Convert the color
function indicatorColor(color: string): string {
  if (color in echartsStore.sunburstColorConvertion)
    return echartsStore.sunburstColorConvertion[color];
  return color;
}

const questionNumber = ref<number[]>([]);
const questionKey = ref<string>("");
// Handle indicator selection
function indicatorClick(showIndicator: string) {
  showedIndicator.value = showIndicator;
  let indicator: string;
  if (locale.value == "ua") indicator = indicatorStore.indicatorEN[showIndicator];
  else indicator = showIndicator;
  selectedIndicator.value = indicator;
  const indicatorKey = indicatorStore.reverseMapping[showIndicator].slice(0, -5);
  questionKey.value = `${indicatorKey}.questions.`;
  const questionKeys = indicatorKey!.split(".");
  const questions =
    translations.value?.[questionKeys[1]]?.[questionKeys[2]]?.[questionKeys[3]]
      ?.questions;

  if (questions) {
    const length = Object.keys(questions).length;
    questionNumber.value = Array.from({ length: length }, (_, i) => i + 1);
  } else {
    console.warn("Questions not found for the selected indicator");
    questionNumber.value = [];
  }
}

// Answers object to store scores for questions
interface Answer {
  questions: { [key: number]: number | null };
}
const answers = reactive<{ [indicator: string]: Answer }>({});
watch(
  showedIndicator,
  (newVal) => {
    let indicator: string;
    if (locale.value == "ua") indicator = indicatorStore.indicatorEN[newVal];
    else indicator = newVal;
    selectedIndicator.value = indicator;
    if (!answers[indicator]) {
      // Initialize the questions object for this indicator
      answers[indicator] = { questions: {} };
      // Set default for all questions
      for (let i = 1; i <= questionNumber.value.length; i++) {
        answers[indicator].questions[i] = null; // Default score
      }
      if (answers[""]) delete answers[""];
    }
  },
  { immediate: true },
);
watch(locale, () => {
  questionNumber.value = [];
});
// submit and check the answers
const submitResults = () => {
  const unansweredQuestions = Object.values(
    answers[selectedIndicator.value].questions,
  ).includes(null);
  if (unansweredQuestions) {
    // Show an alert or a warning to the user
    alert(t("sidebar.dashboardPanel.questionnaire.warning"));
    return;
  }
  // Placeholder for analysis logic
  console.log("Answers:", JSON.stringify(answers, null, 2));
};
// Radar Chart
function setChartType(type: "dimension" | "total") {
  echartsStore.radarChartType = type;
}
</script>

<template>
  <div class="leaflet-sidebar-pane" id="dashboard">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.dashboardPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <ul class="list-unstyled ps-0 mt-2">
      <li class="mb-1">
        <button
          type="button"
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#indicator-collapse"
          aria-expanded="true"
        >
          {{ $t("sidebar.dashboardPanel.indicator") }}
        </button>
        <div class="collapse show" id="indicator-collapse">
          <template
            v-for="indicator in Object.entries(indicatorStore.selectedIndicator).map(
              ([key, value]) => ({
                key,
                value,
              }),
            )"
            :key="indicator.key"
          >
            <div
              class="rounded border ps-2 py-1 m-0 clearfix"
              :style="{ backgroundColor: indicatorColor(indicator.value) }"
            >
              <span
                type="button"
                @click="indicatorClick(indicator.key)"
                data-bs-toggle="modal"
                data-bs-target="#questionnaire"
              >
                {{ indicator.key }}
              </span>
              <button
                type="button"
                class="btn btn-close float-end"
                aria-label="Close"
                @click.stop="deleteSelection(indicator.key)"
              ></button>
            </div>
          </template>
          <div class="btn-group mt-1" role="group">
            <button
              type="button"
              class="btn btn-primary"
              @click="openIndicatorSelection('basic')"
            >
              {{ $t("sidebar.dashboardPanel.button.graph1") }}
            </button>
            <button
              type="button"
              class="btn btn-dark"
              @click="openIndicatorSelection('total')"
            >
              {{ $t("sidebar.dashboardPanel.button.graph2") }}
            </button>
          </div>
        </div>
      </li>
      <li class="mb-1">
        <button
          type="button"
          class="btn btn-toggle rounded collapsed ps-0"
          data-bs-toggle="collapse"
          data-bs-target="#results-collapse"
          aria-expanded="true"
        >
          {{ $t("sidebar.dashboardPanel.result") }}
        </button>
        <div class="collapse show" id="results-collapse">
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#radar"
              @click="setChartType('dimension')"
            >
              {{ $t("sidebar.dashboardPanel.radarChart.type.dimension") }}
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#radar"
              @click="setChartType('total')"
            >
              {{ $t("sidebar.dashboardPanel.radarChart.type.total") }}
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- Radar Modal -->
  <div class="modal fade" id="radar" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="questionnaire-title">
            {{
              $t(`sidebar.dashboardPanel.radarChart.name.${echartsStore.radarChartType}`)
            }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <radar-chart></radar-chart>
        </div>
      </div>
    </div>
  </div>
  <!-- Questionnaire Modal -->
  <div class="modal fade" id="questionnaire" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="questionnaire-title">
            {{ $t("sidebar.dashboardPanel.questionnaire.title") }}:
            {{ showedIndicator }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-for="i in questionNumber">
            <h6>{{ i }}. {{ $t(questionKey + i + ".text") }}</h6>
            <div class="form-check" v-for="score in [0, 1, 2, 3]" :key="score">
              <input
                class="form-check-input"
                type="radio"
                :name="'question-' + i"
                :id="'question-' + i + '-score-' + score"
                :value="score"
                v-model="answers[selectedIndicator].questions[i]"
              />
              <label class="form-check-label" :for="'question-' + i + '-score-' + score">
                {{ $t(questionKey + i + `.score ${score}`) }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="submitResults"
          >
            {{ $t("sidebar.dashboardPanel.questionnaire.buttons.submit") }}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t("sidebar.dashboardPanel.questionnaire.buttons.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
