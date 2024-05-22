<template>
  <div>
    <div ref="chartContainer" class="chart-container"></div>
    <button class="btn btn-success" @click="completeSelection">Complete</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

const chartContainer = ref<HTMLDivElement | null>(null);
var chart: echarts.ECharts;
const selected = ref<string[]>([]);
const sunburstData: any = {
  name: "Urban Resilience",
  children: [
    {
      name: "SOCIAL",
      children: [
        {
          name: "Basic Needs",
          children: [
            { name: "1.1 Safe & affordable housing", value: 5 },
            { name: "1.2 Adequate affordable energy supply", value: 5 },
            { name: "1.3 Inclusive access to safe drinking water", value: 5 },
            { name: "1.4 Effective sanitation", value: 5 },
          ],
        },
        {
          name: "Labor & livelihood",
          children: [
            {
              name: "1.5 Sufficient affordable food supply",
              itemStyle: { color: "#7db165" },
              children: [
                {
                  name: "2.1 Inclusive labour policies",
                  value: 7,
                  itemStyle: { color: "#3ba272" },
                },
              ],
            },
          ],
        },
        {
          name: "Health & Safety",
          children: [
            {
              name: "2.2 Relevant skills & training",
              value: 5,
            },
            {
              name: "3.1 Robust public health systems",
              value: 5,
            },
            {
              name: "3.2 Adequate access to quality healthcare",
              value: 5,
            },
            {
              name: "3.3 Emergency medical care",
              itemStyle: { color: "#7db165" },
              children: [
                {
                  name: "5.1 Effective systems to deter crime",
                  value: 5,
                  itemStyle: { color: "#3ba272" },
                },
                {
                  name: "5.2 Proactive corruption prevention ",
                  value: 5,
                  itemStyle: { color: "#3ba272" },
                },
                {
                  name: "5.3 Competent policing",
                  value: 5,
                  itemStyle: { color: "#3ba272" },
                },
                {
                  name: "5.4 Accessible criminal & civil justice",
                  value: 5,
                  itemStyle: { color: "#3ba272" },
                },
                {
                  name: "11.2 Widespread community awareness & preparedness",
                  value: 5,
                  itemStyle: { color: "#3ba272" },
                },
              ],
            },
            { name: "11.1 Adequate education for all", value: 5 },
          ],
        },
        {
          name: "Community Engagement",
          children: [
            {
              name: "11.3 Effective mechanisms for communities to engage with government",
              value: 8,
            },
            { name: "4.1 Local community support", value: 4 },
            { name: "4.2 Cohesive communities", value: 4 },
            { name: "4.4 Actively engaged citizens", value: 4 },
          ],
        },
      ],
    },
    {
      name: "ECO-\nNOMIC",
      children: [
        {
          name: "Bussiness sector",
          children: [
            {
              name: "2.3 Local business development & innovation",
              value: 5,
            },
            { name: "2.4 Supportive financing mechanisms", value: 5 },
            {
              name: "6.2 Comprehensive business continuity planning",
              value: 5,
            },
          ],
        },
        {
          name: "Diversity & Equality",
          children: [{ name: "6.3 Diverse economic base", value: 6 }],
        },
        {
          name: "Economic Vitality",
          children: [
            {
              name: "6.4 Attractive business environment",
              itemStyle: { color: "#9b7b33" },
              children: [
                {
                  name: "6.5 Strong integration with regional & global economies",
                  value: 5,
                  itemStyle: { color: "#ea7ccc" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "INSTI-\nTUTIONAL",
      children: [
        {
          name: "Governance & Regulation",
          children: [
            { name: "10.1 Appropriate government decision-making", value: 6 },
            {
              name: "10.4 Comprehensive hazard monitoring and risk assessment",
              value: 6,
            },
          ],
        },
        {
          name: "Community Planning & Management",
          children: [
            {
              name: "10.5 Comprehensive government emergency management",
              children: [
                {
                  name: "12.2 Consultative planning process",
                  value: 6,
                  itemStyle: { color: "#9a60b4" },
                },
              ],
            },
            { name: "12.3 Appropriate land use & zoning", value: 5 },
          ],
        },
        {
          name: "Public Finance & Support",
          children: [
            {
              name: "12.4 Robust planning approval process",
              children: [
                {
                  name: "6.1 Well-managed public finances ",
                  value: 5,
                  itemStyle: { color: "#9a60b4" },
                },
                {
                  name: "4.3 Strong city-wide identity & culture",
                  value: 5,
                  itemStyle: { color: "#9a60b4" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PHYSICAL",
      children: [
        {
          name: "Infrastructure Resilience",
          children: [
            {
              name: "8.5 Adequate continuity for critical assets & services",
              value: 5,
            },
            { name: "7.4 Robust protective infrastructure", value: 5 },
            {
              name: "3.4 Effective emergency response services",
              itemStyle: { color: "#548ea5" },
              children: [
                {
                  name: "7.3 Effectively managed protective ecosystems",
                  value: 5,
                  itemStyle: { color: "#5470c6" },
                },
              ],
            },
          ],
        },
        {
          name: "Transport & Communitations",
          children: [
            {
              name: "9.4 Secure technology networks",
              value: 5,
            },
            {
              name: "9.3 Reliable communications technology",
              value: 5,
            },
            {
              name: "9.2 Effective transport operation & maintenance",
              value: 5,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "9.1 Diverse & affordable transport networks",
                  value: 5,
                  itemStyle: { color: "#5470c6" },
                },
              ],
            },
          ],
        },
        {
          name: "Data Management & Monitoring",
          children: [
            {
              name: "8.2 Flexible infrastructure services",
              value: 5,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "8.1 Effective stewardship of ecosystems",
                  value: 5,
                  itemStyle: { color: "#5470c6" },
                },
                {
                  name: "7.2 Appropriate codes, standards & enforcement",
                  value: 5,
                  itemStyle: { color: "#5470c6" },
                },
              ],
            },
            {
              name: "7.1 Comprehensive hazard & exposure mapping",
              value: 6,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "12.1 Comprehensive city monitoring & data management",
                  value: 5,
                  itemStyle: { color: "#5470c6" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const option = {
  tooltip: {
    show: true,
    formatter: function (params: any) {
      return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
    },
  },
  series: {
    type: "sunburst",
    data: sunburstData.children,
    radius: [0, "100%"],
    sort: null,
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
    },
    emphasis: {
      focus: "ancestor",
      itemStyle: {
        shadowBlur: 20,
        shadowColor: "rgba(0, 0, 0, 0.8)",
      },
    },
    levels: [
      {
        label: {
          rotate: "tangential",
        },
      },
      {
        r0: "5%",
        r: "20%",
        itemStyle: {
          borderWidth: 2,
        },
        label: {
          rotate: "tangential",
        },
      },
      {
        r0: "20%",
        r: "42%",
        label: {
          align: "center",
          overflow: "break",
          width: 100,
        },
      },
      {
        r0: "42%",
        r: "73%",
        label: {
          align: "center",
          overflow: "break",
          width: 150,
          padding: 0,
          silent: false,
        },
      },
      {
        r0: "73%",
        r: "100%",
        label: {
          overflow: "break",
          width: 120,
          padding: 0,
          silent: false,
        },
      },
    ],
  },
  grid: {
    show: true,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const completeSelection = () => {
  window.close();
};
const handleClick = (params: any, chart: echarts.ECharts): void => {
  const level = params.treePathInfo.length;
  if (level === 4 || level === 5) {
    // Prevent default behavior
    chart.setOption({ series: { nodeClick: false } });
    // Highlight or unhighlight the clicked block
    if (params.name && selected.value.includes(params.name)) {
      let set = new Set(selected.value);
      set.delete(params.name);
      selected.value = Array.from(set);
      console.log(selected.value);
    } else if (params.name) {
      selected.value.push(params.name);
      console.log(selected.value);
    } else {
      // Do something here to cancel the selection of empty node
      return;
    }
    chart.setOption({ series: { nodeClick: "rootToNode" } });
  }
};
const updateHighlightedNodes = (
  data: any[],
  highlightedNodes: Set<string>,
): any => {
  return data.map((node) => {
    if (node.children) {
      return {
        ...node,
        children: updateHighlightedNodes(node.children, highlightedNodes),
      };
    } else {
      return {
        ...node,
        itemStyle: {
          ...node.itemStyle,
          borderColor: highlightedNodes.has(node.name)
            ? "grey"
            : "defaultColor",
          shadowBlur: highlightedNodes.has(node.name) ? 10 : 0,
          shadowColor: highlightedNodes.has(node.name)
            ? "rgba(0, 0, 0, 5)"
            : "defaultColor",
        },
      };
    }
  });
};
watch(
  selected,
  (newValue) => {
    if (!chart) return;

    const option: any = chart.getOption();
    if (!option || !option.series) return;

    const highlightedNodes = new Set(newValue);
    const updatedData = updateHighlightedNodes(
      option.series[0].data,
      highlightedNodes,
    );
    chart.setOption({ series: [{ data: updatedData }] });
    // Store the changes of sunburst selected indicators
    localStorage.setItem("sunburstSelected", JSON.stringify(selected.value));
  },
  { deep: true },
);
// Watch for changes in sidebar selected indicators and update indicators
window.addEventListener("storage", (event: StorageEvent) => {
  if (event.key === "sidebarSelected") {
    selected.value = JSON.parse(event.newValue!);
  }
});
onMounted(() => {
  if (chartContainer.value) {
    chart = echarts.init(chartContainer.value);
    chart.setOption(option);
    chart.on("click", (params: any) => {
      handleClick(params, chart);
    });
    // Make the chart responsive
    window.onresize = () => {
      chart.resize();
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 96vh;
}
</style>
