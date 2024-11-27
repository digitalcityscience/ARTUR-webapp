<script lang="ts" setup>
import { ref, computed } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const sidebarStore = useSidebarStore();

// Dynamic iframe sources with cache-busting
const cacheBuster = ref(Date.now());
const refreshIframe = () => {
  cacheBuster.value = Date.now();
};
const iframeSources = computed(() => ({
  waterSourceDisruptions: `./water-source-disruptions.html?cacheBust=${cacheBuster.value}`,
  affectedComponent: `./affected-component.html?cacheBust=${cacheBuster.value}`,
}));

// Urban resilience indicators
const urbanResilienceIndicators = [
  { name: "Robustness", isHighlighted: true },
  { name: "Redundancy", isHighlighted: false },
  { name: "Diversity", isHighlighted: false },
  { name: "Flexibility", isHighlighted: true },
  { name: "Integration", isHighlighted: false },
  { name: "Inclusiveness", isHighlighted: false },
  { name: "Reflectiveness", isHighlighted: false },
  { name: "Resourcefulness", isHighlighted: true },
  { name: "Transparency", isHighlighted: false },
];

// Download modal content as PDF
const downloadfirstDashboard = () => {
  const modalContent = document.getElementById("first-analysis");
  if (!modalContent) {
    console.error("Modal content not found!");
    return;
  }

  html2canvas(modalContent, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Fit canvas image into A4 dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("dashboard.pdf");
  });
};
</script>
<template>
  <button
    class="btn btn-primary"
    data-bs-target="#first-analysis"
    data-bs-toggle="modal"
    @click="refreshIframe"
  >
    Open Dashboard
  </button>
  <div id="first-analysis" class="modal fade" :aria-hidden="false">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header p-2">
          <h5 class="modal-title">Challenge {{ sidebarStore.selectedTopic }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-1 overflow-hidden">
          <div class="container-fluid h-100">
            <div class="row h-100">
              <!-- Left Column -->
              <div class="col-md-4 d-flex flex-column">
                <div id="disruption-types" class="flex-grow-2 overflow-hidden mb-3">
                  <p class="m-1"><strong>Disruption Types:</strong> Water supply chain</p>
                  <iframe
                    :src="iframeSources.waterSourceDisruptions"
                    frameborder="0"
                    class="w-100 h-100"
                  ></iframe>
                </div>
                <div id="affected-indicators" class="flex-grow-1 overflow-auto">
                  <p class="fw-bold">Affected Urban Resilience Capacities</p>
                  <ul class="list-group w-75">
                    <li
                      v-for="(indicator, index) in urbanResilienceIndicators"
                      :key="index"
                      :class="[
                        'list-group-item',
                        indicator.isHighlighted ? 'list-group-item-success' : '',
                      ]"
                    >
                      {{ indicator.isHighlighted ? "+ " : "" }}{{ indicator.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Right Column -->
              <div class="col-md-8 d-flex flex-column">
                <div id="navigate-map" class="mb-3">
                  <p class="fw-bold">Navigate to the map</p>
                  <button class="btn btn-primary mb-2">
                    Go to Water Source Layer Set
                  </button>
                </div>
                <div id="affected-diagram" class="flex-grow-1">
                  <p class="m-1 fw-bold">Other Affected Components in the Urban System</p>
                  <iframe
                    :src="iframeSources.affectedComponent"
                    frameborder="0"
                    class="w-100 h-100"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-success"
            @click="downloadfirstDashboard"
          >
            <i class="bi bi-download"></i> Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.flex-grow-2 {
  flex-grow: 2;
}
.flex-grow-1 {
  flex-grow: 1;
}
</style>
