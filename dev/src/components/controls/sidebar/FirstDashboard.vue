<script lang="ts" setup>
import useSidebarStore from "@/stores/sidebarStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const sidebarStore = useSidebarStore();
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
  <button class="btn btn-primary" data-bs-target="#first-analysis" data-bs-toggle="modal">
    Open Dashboard
  </button>
  <div
    id="first-analysis"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
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
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row mb-3">
              <div class="col-md-4">
                <div id="disruption-types">
                  <p><strong>Disruption Types:</strong> Water supply chain</p>
                  <iframe
                    frameborder="0"
                    style="width: 100%; height: 300px"
                    src="/water source disruptions.drawio.html"
                  ></iframe>
                </div>
                <div id="affected-indicators" style="margin-top: 20px">
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
              <!-- Right Column: Affected Diagram -->
              <div class="col-md-8">
                <div id="navigate-map" style="height: 20%">
                  <p><strong>Navigate to the map</strong></p>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style="margin-top: 20px; margin-bottom: 20px"
                  >
                    go to
                  </button>
                </div>
                <div id="affected-diagram" style="height: 80%">
                  <p><strong>Other Affected Components in the Urban System</strong></p>
                  <iframe
                    frameborder="0"
                    style="width: 100%; height: 100%"
                    src="/affected component.drawio.html"
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
            <i class="bi bi-download"> Download</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
