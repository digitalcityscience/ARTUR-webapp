<script lang="ts" setup>
import * as echarts from "echarts";
let myChart: echarts.ECharts | null = null;
const openSunburstSelection = () => {
  const mainWinWidth = window.innerWidth;
  const mainWinHeight = window.innerHeight;

  const newWinWidth = 1000;
  const newWinHeight = 1000;

  const leftOffset = (mainWinWidth - newWinWidth) / 2;
  const topOffset = (mainWinHeight - newWinHeight) / 2;

  const newWindow = window.open(
    "",
    "",
    `left=${leftOffset},top=${topOffset},width=${newWinWidth},height=${newWinHeight},resizable,scrollbars=yes`,
  );
  if (newWindow) {
    myChart = echarts.init(newWindow.document.body, null, {
      width: 1000,
      height: 1000,
    });
    const option = {
      series: {
        type: "sunburst",
        data: data.children,
        radius: [0, "90%"],
        label: {
          rotate: "radial",
        },
      },
    };
    myChart.setOption(option);

    // Make the chart responsive
    window.onresize = function () {
      myChart!.resize();
    };
  }
};
const data = {
  name: "Urban Resillience",
  children: [
    {
      name: "SOCIAL",
      value: 400,
      children: [
        {
          name: "basic needs",
          value: 100,
          children: [
            { name: "1.1 Safe and affordable housing", value: 25 },
            { name: "1.2 Adequate affordable energy supply", value: 25 },
            {
              name: "1.3 Inclusive access to safe drinking water",
              value: 25,
            },
            { name: "1.4 Effective sanitation", value: 25 },
          ],
        },
        {
          name: "Labor and livelihood",
          value: 100,
        },
        { name: "Health and Safety", value: 100 },
        { name: "Community Engagement", value: 100 },
      ],
    },
    {
      name: "ECONOMIC",
      value: 400,
      children: [
        { name: "leaf3", value: 200 },
        { name: "leaf4", value: 200 },
      ],
    },
    {
      name: "INSTITUTIONAL",
      children: [
        { name: "leaf3", value: 200 },
        { name: "leaf4", value: 200 },
      ],
    },
    {
      name: "PHYSICAL",
      children: [
        { name: "leaf3", value: 200 },
        { name: "leaf4", value: 200 },
      ],
    },
  ],
};
</script>
<template>
  <button class="btn btn-primary" @click="openSunburstSelection">Select</button>
</template>

<style scoped></style>
