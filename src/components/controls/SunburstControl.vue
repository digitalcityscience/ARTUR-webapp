<template>
  <div>
    <div ref="chart" class="chart-container"></div>
    <button class="btn btn-success" @click="completeSelection">Complete</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const chart = ref<HTMLDivElement | null>(null);
const selectedBlock = ref<string | null>(null);
const data = {
  name: "Urban Resilience",
  children: [
    {
      name: "SOCIAL",
      children: [
        {
          name: "Basic Needs",
          children: [
            { name: "1.1 Safe & affordable\nhousing", value: 5 },
            { name: "1.2 Adequate affordable\nenergy supply", value: 5 },
            { name: "1.3 Inclusive access\nto safe drinking water", value: 5 },
            { name: "1.4 Effective sanitation", value: 5 },
          ],
        },
        {
          name: "Labor &\nlivelihood",
          children: [
            {
              name: "1.5 Sufficient\naffordable\nfood supply",
              children: [{ name: "2.1 Inclusive\nlabour policies", value: 7 }],
            },
          ],
        },
        {
          name: "Health & Safety",
          children: [
            { name: "2.2 Relevant skills\n& training", value: 5 },
            { name: "3.1 Robust public\nhealth systems", value: 5 },
            { name: "3.2 Adequate access\nto quality healthcare", value: 5 },
            {
              name: "3.3 Emergency\nmedical care",
              children: [
                { name: "5.1 Effective systems\nto deter crime", value: 5 },
                { name: "5.2 Proactive\ncorruption prevention ", value: 5 },
                { name: "5.3 Competent policing", value: 5 },
                {
                  name: "5.4 Accessible criminal\n& civil justice",
                  value: 5,
                },
                {
                  name: "11.2 Widespread community\nawareness & preparedness",
                  value: 5,
                },
              ],
            },
            { name: "11.1 Adequate education for all", value: 5 },
          ],
        },
        {
          name: "Community\nEngagement",
          children: [
            {
              name: "11.3 Effective mechanisms\nfor communities\nto engage with government",
              value: 5,
            },
            { name: "4.1 Local community\nsupport", value: 5 },
            { name: "4.2 Cohesive communities", value: 5 },
            { name: "4.4 Actively engaged\ncitizens", value: 5 },
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
              name: "2.3 Local business\ndevelopment & innovation",
              value: 5,
            },
            { name: "2.4 Supportive\nfinancing mechanisms", value: 5 },
            {
              name: "6.2 Comprehensive business\ncontinuity planning",
              value: 5,
            },
          ],
        },
        {
          name: "Diversity &\nEquality",
          children: [{ name: "6.3 Diverse economic base", value: 6 }],
        },
        {
          name: "Economic Vitality",
          children: [
            {
              name: "6.4 Attractive\nbusiness\nenvironment",
              children: [
                {
                  name: "6.5 Strong integration\nwith regional\n& global economies",
                  value: 5,
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
          name: "Governance &\nRegulation",
          children: [
            { name: "10.1 Appropriate government\ndecision-making", value: 6 },
            {
              name: "10.4 Comprehensive hazard\nmonitoring and risk assessment",
              value: 6,
            },
          ],
        },
        {
          name: "Community\nPlanning &\nManagement",
          children: [
            {
              name: "10.5 Comprehensive\ngovernment\nemergency\nmanagement",
              children: [
                { name: "12.2 Consultative\nplanning process", value: 6 },
              ],
            },
            { name: "12.3 Appropriate\nland use & zoning", value: 5 },
          ],
        },
        {
          name: "Public Finance\n& Support",
          children: [
            {
              name: "12.4 Robust\nplanning\napproval\nprocess",
              children: [
                { name: "6.1 Well-managed\npublic finances ", value: 5 },
                { name: "4.3 Strong city-wide\nidentity & culture", value: 5 },
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
          name: "Infrastructure\nResilience",
          children: [
            {
              name: "8.5 Adequate continuity\nfor critical assets\n& services",
              value: 5,
            },
            { name: "7.4 Robust protective\ninfrastructure", value: 5 },
            {
              name: "3.4 Effective\nemergency\nresponse services",
              children: [
                {
                  name: "7.3 Effectively managed\nprotective ecosystems",
                  value: 5,
                },
              ],
            },
          ],
        },
        {
          name: "Transport &\nCommunitations",
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
              name: "9.2 Effective transport\noperation & maintenance",
              value: 5,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "9.1 Diverse & affordable\ntransport networks",
                  value: 5,
                },
              ],
            },
          ],
        },
        {
          name: "Data\nManagement &\nMonitoring",
          children: [
            {
              name: "8.2 Flexible\ninfrastructure services",
              value: 5,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "8.1 Effective stewardship\nof ecosystems",
                  value: 5,
                },
                {
                  name: "7.2 Appropriate codes,\nstandards\n& enforcement",
                  value: 5,
                },
              ],
            },
            {
              name: "7.1 Comprehensive hazard &\nexposure mapping",
              value: 5,
            },
            {
              itemStyle: { color: "white" },
              children: [
                {
                  name: "12.1 Comprehensive\ncity monitoring\n& data management",
                  value: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const completeSelection = () => {
  window.close();
};

onMounted(() => {
  if (chart.value) {
    const myChart = echarts.init(chart.value);
    const option = {
      series: {
        type: "sunburst",
        data: data.children,
        radius: [0, "100%"],
        sort: undefined,
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
          {},
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
            },
          },
          {
            r0: "42%",
            r: "44%",
            label: {
              position: "outside",
              padding: 0,
              silent: false,
            },
            itemStyle: {
              borderWidth: 1,
            },
          },
          {
            r0: "68%",
            r: "69%",
            label: {
              position: "outside",
              padding: 0,
              silent: false,
            },
            itemStyle: {
              borderWidth: 1,
            },
          },
        ],
      },
    };
    myChart.setOption(option);
    myChart.on("click", (params: any) => {
      if (params.data.value < 8 && params.data.name) {
        selectedBlock.value = params.data.name;
        console.log("Selected Block:", selectedBlock.value);
        // Update the chart to highlight the selected block
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: params.seriesIndex,
          dataIndex: params.dataIndex,
        });
      }
    });
    // Make the chart responsive
    window.onresize = () => {
      myChart.resize();
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 110vh;
}
</style>
