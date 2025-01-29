<template>
  <div class="leaflet-sidebar-tabs">
    <!-- top tabs -->
    <ul role="tablist">
      <li>
        <a
          href="#introduction"
          role="tab"
          :title="$t('sidebar.introductionPanel.header')"
        >
          <i class="bi bi-info-circle"></i>
        </a>
      </li>
      <li>
        <a href="#indicator" role="tab" :title="$t('sidebar.indicatorPanel.header')"
          ><i class="fa fa-bar-chart"></i><span class="badge">1</span></a
        >
      </li>
      <li>
        <a href="#data" role="tab" :title="$t('sidebar.dataPanel.header')"
          ><i class="bi bi-stack"></i><span class="badge">2</span></a
        >
      </li>
      <li>
        <a href="#dictionary" role="tab" :title="$t('sidebar.dictionaryPanel.header')">
          <i class="bi bi-gem"></i><span class="badge">3</span>
        </a>
      </li>
    </ul>
    <!-- bottom tabs -->
    <ul role="tablist">
      <li>
        <a href="#settings" :title="$t('sidebar.settingsPanel.header')"
          ><i class="fa fa-gear"></i
        ></a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* Style the badge */
.leaflet-sidebar-tabs .badge {
  font-size: 0.725rem;
  padding: 0;
  background-color: transparent;
  color: #000;
  border: transparent;
  position: absolute; /* Position absolutely relative to parent */
  top: 0.125rem;
  right: 0.45rem;
  transition: color 0.3s ease; /* Smooth color changes */
}

.leaflet-sidebar-tabs a {
  display: inline-flex; /* Inline-flex allows alignment */
  align-items: center; /* Vertically align icon in the center */
  justify-content: center; /* Horizontally align icon in the center */
  position: relative; /* Set relative positioning for badge alignment */
}

/* Change badge color on click */
.leaflet-sidebar-tabs > li.active,
.leaflet-sidebar-tabs > ul > li.active .badge {
  color: #fff;
}
</style>
