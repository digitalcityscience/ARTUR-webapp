// DownloadChartModal.vue
<script lang="ts" setup>
import { ref } from "vue";
import { ImageFormat } from "@/assets/ts/constants";
import type { ECharts } from "echarts";

interface Props {
  show: boolean;
  chart: ECharts | null;
}

interface Emits {
  (e: "update:show", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const resolution = ref<number>(2);
const backgroundColor = ref<string>("#ffffff");
const imageFormat = ref<ImageFormat>(ImageFormat.PNG);

const downloadChart = () => {
  if (!props.chart) return;
  const option = props.chart.getOption().title as any[];
  const title = option[0].text;
  const img = new Image();
  img.src = props.chart.getDataURL({
    type: imageFormat.value,
    pixelRatio: resolution.value,
    backgroundColor: backgroundColor.value,
  });

  const link = document.createElement("a");
  link.href = img.src;
  link.download = `${title}.${imageFormat.value}`;
  link.click();

  closeModal();
};

const closeModal = () => {
  emit("update:show", false);
};
</script>
<template>
  <div
    class="modal fade"
    :class="{ show }"
    id="downloadModal"
    tabindex="-1"
    v-show="show"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("indicatorChart.modal.title") }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group d-flex">
              <label for="resolution" class="mr-2" style="padding-right: 10px">
                {{ $t("indicatorChart.modal.resolution") }}
              </label>
              <input
                type="range"
                class="form-control-range"
                id="resolution"
                v-model="resolution"
                min="1"
                max="10"
                style="float: right"
              />
              <span>{{ resolution }}</span>
            </div>
            <div class="form-group d-flex">
              <label
                for="backgroundColor"
                class="mr-2"
                style="padding-right: 80px; padding-top: 10px"
              >
                {{ $t("indicatorChart.modal.color") }}
              </label>
              <input
                type="color"
                class="form-control"
                id="backgroundColor"
                v-model="backgroundColor"
                style="width: 60px; margin-top: 10px"
              />
            </div>
            <div class="form-group d-flex">
              <label
                for="imageFormat"
                class="mr-2"
                style="padding-right: 90px; padding-top: 20px"
              >
                {{ $t("indicatorChart.modal.format") }}
              </label>
              <select
                class="form-select"
                aria-label="Data Format"
                id="imageFormat"
                v-model="imageFormat"
                style="width: 100px; height: 40px; margin-top: 10px"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="downloadChart">
            <i class="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  display: block;
  left: 322.5px;
  width: 355px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
