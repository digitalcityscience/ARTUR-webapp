<script lang="ts" setup>
import { ref, watch, onMounted, computed } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import RadarChart from "./RadarChart.vue";
import useIndicatorStore from "@/stores/indicatorStore";
import useRadarChartStore from "@/stores/radarChartStore";
import { useI18n } from "vue-i18n";

// Constants
const indicatorStore = useIndicatorStore();
const radarChartStore = useRadarChartStore();
const { t, messages, locale } = useI18n();
const translations = computed(
  () => messages.value[locale.value].initialIndicators as any,
);
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

// Questionnaire
const questionNumber = ref<number[]>([]);
const questionKey = ref<string>("");
const indicatorKey = ref<string>("");

// Handle indicator selection
function indicatorClick(showIndicator: string) {
  showedIndicator.value = showIndicator;
  indicatorKey.value = indicatorStore.reverseMapping[showIndicator];
  questionKey.value = `${indicatorKey.value.slice(0, -5)}.questions.`;
  const questionKeys = indicatorKey.value!.split(".");
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
  radarChartStore.initializeAnswer(indicatorKey.value, questionNumber.value);
}
watch(locale, () => {
  questionNumber.value = [];
});
// submit and check the answers
function submitResults() {
  const unansweredQuestions = Object.values(
    radarChartStore.answers[indicatorKey.value],
  ).includes(null);
  if (unansweredQuestions) {
    // Show an alert or a warning to the user
    alert(t("sidebar.indicatorPanel.questionnaire.warning"));
    return;
  }
  radarChartStore.calculateScores();
}

// Radar Chart
function setChartType(type: "dimension" | "total") {
  radarChartStore.radarChartType = type;
}
// Fetch capacity data on mounted
onMounted(radarChartStore.fetchIndicatorData);
</script>
<template>
  <div class="leaflet-sidebar-pane" id="indicator">
    <h1 class="leaflet-sidebar-header">
      {{ $t("sidebar.indicatorPanel.header") }}
      <span class="leaflet-sidebar-close"><i class="fa fa-caret-right"></i></span>
    </h1>
    <language-switcher></language-switcher>
    <div class="sidebar-content">
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <h6
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar-indicatorPanel-explanation"
            aria-expanded="true"
            class="btn btn-outline-secondary text-uppercase"
          >
            {{ $t("sidebar.indicatorPanel.explanation.header") }}
          </h6>
          <ul
            id="sidebar-indicatorPanel-explanation"
            class="collapse show text-secondary lh-base font-size-sm"
          >
            <li>
              {{ $t("sidebar.indicatorPanel.explanation.1") }}
            </li>
            <li>
              {{ $t("sidebar.indicatorPanel.explanation.2") }}
            </li>
          </ul>
        </li>
        <li class="mb-1">
          <button
            type="button"
            class="btn btn-toggle rounded collapsed ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#indicator-collapse"
            aria-expanded="true"
          >
            {{ $t("sidebar.indicatorPanel.indicator") }}
          </button>
          <div class="collapse show ms-1" id="indicator-collapse">
            <ul class="list-unstyled ps-0">
              <!-- Indicator Graph Buttons -->
              <li class="mb-1">
                <button
                  type="button"
                  class="btn btn-toggle rounded collapsed ps-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#indicator-graph-collapse"
                  aria-expanded="true"
                >
                  {{ $t("sidebar.indicatorPanel.graph") }}
                </button>
                <div id="indicator-graph-collapse" class="collapse show">
                  <div class="btn-group my-1 ms-1" role="group">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="openIndicatorSelection('basic')"
                    >
                      {{ $t("sidebar.indicatorPanel.button.graph1") }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-dark"
                      @click="openIndicatorSelection('total')"
                    >
                      {{ $t("sidebar.indicatorPanel.button.graph2") }}
                    </button>
                  </div>
                </div>
              </li>
              <!-- Indicator List -->
              <li class="mb-1">
                <button
                  type="button"
                  class="btn btn-toggle rounded collapsed ps-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#indicator-list-collapse"
                  aria-expanded="true"
                >
                  {{ $t("sidebar.indicatorPanel.list") }}
                </button>
                <div id="indicator-list-collapse" class="collapse show">
                  <template
                    v-for="indicator in Object.entries(
                      indicatorStore.selectedIndicator,
                    ).map(([key, value]) => ({
                      key,
                      value,
                    }))"
                    :key="indicator.key"
                  >
                    <div
                      class="rounded border ms-1 ps-2 py-1 m-0 clearfix"
                      :style="{ backgroundColor: indicator.value }"
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
                </div>
              </li>
            </ul>
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
            {{ $t("sidebar.indicatorPanel.result") }}
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
                {{ $t("sidebar.indicatorPanel.radarChart.type.dimension") }}
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#radar"
                @click="setChartType('total')"
              >
                {{ $t("sidebar.indicatorPanel.radarChart.type.total") }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Radar Modal -->
  <div
    class="modal fade"
    id="radar"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="questionnaire-title">
            {{
              $t(
                `sidebar.indicatorPanel.radarChart.name.${radarChartStore.radarChartType}`,
              )
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
  <div
    class="modal fade"
    id="questionnaire"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="questionnaire-title">
            {{ $t("sidebar.indicatorPanel.questionnaire.title") }}:
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
                v-model="radarChartStore.answers[indicatorKey][i]"
              />
              <label class="form-check-label" :for="'question-' + i + '-score-' + score">
                {{ $t(questionKey + i + `.score ${score}`) }}
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitResults">
            {{ $t("sidebar.indicatorPanel.questionnaire.buttons.submit") }}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t("sidebar.indicatorPanel.questionnaire.buttons.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
