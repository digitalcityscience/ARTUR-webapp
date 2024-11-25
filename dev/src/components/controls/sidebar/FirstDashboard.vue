<script lang="ts" setup>
import { ref, computed } from "vue";
import useSidebarStore from "@/stores/sidebarStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const sidebarStore = useSidebarStore();

// Reactive cache-busting timestamps
const cacheBuster = ref(Date.now());

// Methods to update the cacheBuster
const refreshIframe = () => {
  cacheBuster.value = Date.now();
};

// Dynamic iframe src with cache-busting
const waterSourceDisruptionsSrc = computed(() => {
  return `./water-source-disruptions.html?cacheBust=${cacheBuster.value}`;
});
const affectedComponentSrc = computed(() => {
  return `./affected-component.html?cacheBust=${cacheBuster.value}`;
});

// Method to download the modal content as PDF
const downloadfirstDashboard = () => {
  const modalContent = document.getElementById("first-analysis");
  if (!modalContent) {
    console.error("Modal content not found!");
    return;
  }

  html2canvas(modalContent, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    // Portrait, millimeters, A4 size
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate dimensions for the image to fit into the PDF
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
        <div class="modal-header">
          <h5 class="modal-title">Challenge {{ sidebarStore.selectedTopic }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-target="#first-analysis"
            data-bs-toggle="modal"
          ></button>
        </div>
        <div class="modal-body d-flex flex-column">
          <div class="container-fluid flex-grow-1">
            <div class="row mb-3 h-100">
              <div class="col-md-4 d-flex flex-column" style="height: 100%">
                <div id="disruption-types" style="height: 40%">
                  <p><strong>Disruption Types:</strong> Water supply chain</p>
                  <iframe :src="waterSourceDisruptionsSrc" frameborder="0"></iframe>
                </div>
                <div id="affected-indicators" style="margin-top: 20px; flex: 1">
                  <p><strong>Affected Urban Resilience Capacities</strong></p>
                  <ul class="list-group" style="padding-top: 12%; width: 300px">
                    <li class="list-group-item list-group-item-success">+ Robustness</li>
                    <li class="list-group-item">Redundancy</li>
                    <li class="list-group-item">Diversity</li>
                    <li class="list-group-item list-group-item-success">+ Flexibility</li>
                    <li class="list-group-item">Integration</li>
                    <li class="list-group-item">Inclusiveness</li>
                    <li class="list-group-item">Reflectiveness</li>
                    <li class="list-group-item list-group-item-success">
                      + Resourcefulness
                    </li>
                    <li class="list-group-item">Flexibility</li>
                    <li class="list-group-item">Transparency</li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8 d-flex flex-column" style="height: 100%">
                <div id="navigate-map" style="height: 15%">
                  <p><strong>Navigate to the map</strong></p>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style="margin-top: 20px; margin-bottom: 20px"
                  >
                    Go to Water Source Layer Set
                  </button>
                </div>
                <div id="affected-diagram" style="flex: 1">
                  <p><strong>Other Affected Components in the Urban System</strong></p>
                  <iframe :src="affectedComponentSrc" frameborder="0"></iframe>
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
            <i class="bi bi-download"> Download</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal-body {
  flex: 1;
  overflow: hidden; /* Prevent scrolling */
}
.row.mb-3 {
  height: 100%;
}
iframe {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
