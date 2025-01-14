import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";

enum SANKEYLEVELS {
  LEVEL1 = 0,
  LEVEL2 = 0.5,
  LEVEL3 = 1.9,
}
const useIndicatorChartStore = defineStore("echarts-options", () => {
  const { t } = useI18n();
  // Basic Sunburst Data
  const basicSunburstData = {
    name: computed(() => t("initialIndicators.name")),
    children: [
      // Social
      {
        name: computed(() => t("initialIndicators.social.name")),
        children: [
          {
            name: computed(() => t("initialIndicators.social.1.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.social.1.1.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.social.1.2.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.social.1.3.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.social.1.4.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.social.2.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.social.2.1.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.social.3.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.social.3.1.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.social.3.2.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.social.3.3.name")),
                value: 1,
              },
            ],
          },
        ],
      },
      //Economic
      {
        name: computed(() => t("initialIndicators.economic.name")),
        children: [
          {
            name: computed(() => t("initialIndicators.economic.1.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.economic.1.1.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.economic.1.2.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.economic.2.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.economic.2.1.name")),
                value: 1,
              },
            ],
          },
        ],
      },
      //Institutional
      {
        name: computed(() => t("initialIndicators.institutional.name")),
        children: [
          {
            name: computed(() => t("initialIndicators.institutional.1.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.institutional.1.1.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.institutional.2.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.institutional.2.1.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.institutional.3.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.institutional.3.1.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.institutional.3.2.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.institutional.3.3.name")),
                value: 1,
              },
            ],
          },
        ],
      },
      //Physical
      {
        name: computed(() => t("initialIndicators.physical.name")),
        children: [
          {
            name: computed(() => t("initialIndicators.physical.1.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.physical.1.1.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.physical.1.2.name")),
                value: 1,
              },
              {
                name: computed(() => t("initialIndicators.physical.1.3.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.physical.2.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.physical.2.1.name")),
                value: 1,
              },
            ],
          },
          {
            name: computed(() => t("initialIndicators.physical.3.name")),
            children: [
              {
                name: computed(() => t("initialIndicators.physical.3.1.name")),
                value: 1,
              },
            ],
          },
        ],
      },
    ],
  };
  const sunburstBasicOption = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
      },
      confine: true,
    },
    series: {
      type: "sunburst",
      data: basicSunburstData.children,
      radius: [0, "100%"],
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        fontFamily: "Arial",
        overflow: "break",
        fontSize: "0.7rem",
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
          r0: 0,
          r: 30,
          itemStyle: {
            color: "transparent",
            opacity: 0,
          },
        },
        {
          r0: 30,
          r: 70,
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: 70,
          r: 180,
          label: {
            align: "center",
            width: 100,
          },
        },
        {
          r0: 180,
          r: 385,
          label: {
            align: "center",
            width: 200,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
      ],
    },
    color: ["#91CC75", "#EE6666", "#73C0DE", "#FAC858"],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  // Total Sunburst Data
  const sunburstData = {
    name: computed(() => t("echarts.name")),
    children: [
      {
        name: computed(() => t("echarts.social.name")),
        children: [
          {
            name: computed(() => t("echarts.social.1.name")),
            children: [
              {
                name: computed(() => t("echarts.social.1.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.1.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.1.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.1.4")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.1.5")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.social.2.name")),
            children: [
              {
                name: computed(() => t("echarts.social.2.1")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.2.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.2.3")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.social.3.name")),
            children: [
              {
                name: computed(() => t("echarts.social.3.1")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.3")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.4")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.5")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.6")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.7")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.8")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.9")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.10")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.11")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.12")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.13")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.14")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.3.15")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.social.4.name")),
            children: [
              {
                name: computed(() => t("echarts.social.4.1")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.4.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.social.5.name")),
            children: [
              {
                name: computed(() => t("echarts.social.5.1")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.5.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.5.3")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.5.4")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.social.6.name")),
            children: [
              {
                name: computed(() => t("echarts.social.6.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.social.6.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        //Economic Start
        name: computed(() => t("echarts.economic.name")),
        children: [
          {
            name: computed(() => t("echarts.economic.1.name")),
            children: [
              {
                name: computed(() => t("echarts.economic.1.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.1.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.1.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.1.4")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.economic.2.name")),
            children: [
              {
                name: computed(() => t("echarts.economic.2.1")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.4")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.5")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.6")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.7")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.8")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.9")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.10")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.11")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.2.12")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.economic.3.name")),
            children: [
              {
                name: computed(() => t("echarts.economic.3.1")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.3.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.economic.3.3")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.economic.4.name")),
            children: [
              {
                name: computed(() => t("echarts.economic.4.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        //Institutional start
        name: computed(() => t("echarts.institutional.name")),
        children: [
          {
            name: computed(() => t("echarts.institutional.1.name")),
            children: [
              {
                name: computed(() => t("echarts.institutional.1.1")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.2")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.3")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.4")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.5")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.6")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.7")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.8")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.9")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.10")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.11")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.12")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.13")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.14")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.15")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.1.16")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.institutional.2.name")),
            children: [
              {
                name: computed(() => t("echarts.institutional.2.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.2.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.institutional.3.name")),
            children: [
              {
                name: computed(() => t("echarts.institutional.3.1")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.2")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.3")),
                children: [
                  {
                    value: 6,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.4")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.5")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.6")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.7")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.8")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.9")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.10")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.11")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.3.12")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.institutional.4.name")),
            children: [
              {
                name: computed(() => t("echarts.institutional.4.1")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.4.2")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.4.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.4.4")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.institutional.4.5")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        //Physical start
        name: computed(() => t("echarts.physical.name")),
        children: [
          {
            name: computed(() => t("echarts.physical.1.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.1.1")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.1.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.2.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.2.1")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.2.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.3.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.3.1")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.3.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.4.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.4.1")),
                children: [
                  {
                    value: 7,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.5.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.5.1")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.2")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.4")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.5")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.6")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.7")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.5.8")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.6.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.6.1")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.6.2")),
                children: [
                  {
                    value: 1.5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.6.3")),
                children: [
                  {
                    value: 1.5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.7.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.7.1")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.2")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.4")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.5")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.6")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.7")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.8")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.9")),
                children: [
                  {
                    value: 5,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.7.10")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
          {
            name: computed(() => t("echarts.physical.8.name")),
            children: [
              {
                name: computed(() => t("echarts.physical.8.1")),
                children: [
                  {
                    value: 4,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.2")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.3")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.4")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.5")),
                children: [
                  {
                    value: 3,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.6")),
                children: [
                  {
                    value: 1,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
              {
                name: computed(() => t("echarts.physical.8.7")),
                children: [
                  {
                    value: 2,
                    itemStyle: { opacity: 0.3 },
                    tooltip: { show: false },
                    emphasis: { disabled: true },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const initialSunburstData = sunburstData.children.map((level1) => ({
    name: level1.name,
    children: level1.children.map((level2) => ({
      name: level2.name,
      value: 1,
    })),
  }));
  const sunburstDimension = new Set();
  sunburstData.children.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      sunburstDimension.add(level2.name);
    });
  });
  const sunburstIndicator = new Set();
  sunburstData.children.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      level2.children.forEach((level3: any) => {
        sunburstIndicator.add(level3.name);
      });
    });
  });
  const sunburstColorSet: Record<string, string> = {
    "rgba(172,216,151,1)": "SOCIAL",
    "rgba(251,213,129,1)": "ECO-\nNOMIC",
    "rgba(242,140,140,1)": "INSTI-\nTUTIONAL",
    "rgba(150,207,230,1)": "PHYSICAL",
  };
  const sunburstColorConvertion: Record<string, string> = {
    "rgba(172,216,151,1)": "#91CC75",
    "rgba(251,213,129,1)": "#FAC858",
    "rgba(242,140,140,1)": "#EE6666",
    "rgba(150,207,230,1)": "#73C0DE",
  };
  // Sunburst Option
  const color = [
    // "#5470C6", // blue
    "#91CC75", // green
    "#FAC858", // yellow
    "#EE6666", // red
    "#73C0DE", // light blue
    "#3BA272", // dark green
    "#FC8452", // orange
    "#9A60B4", // purple
    "#EA7CCC", // pink
  ];
  const sunburstOption = {
    backgroundColor: "#fff",
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
      confine: true,
    },
    series: {
      type: "sunburst",
      data: initialSunburstData,
      radius: [0, "100%"],
      sort: undefined,
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        fontFamily: "Arial",
        overflow: "break",
        fontSize: 15,
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
          r0: 0,
          r: 50,
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 50,
          r: 120,
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: 120,
          r: 410,
          label: {
            align: "center",
            width: 325,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  let level1Data: any[] = [];
  let level2Data: any[] = [];
  let sunburstOption1 = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
      },
      confine: true,
    },
    series: {
      type: "sunburst",
      data: level1Data,
      radius: [0, "100%"],
      sort: undefined,
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        fontFamily: "Arial",
        overflow: "break",
        fontSize: "0.7rem",
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
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 20,
          r: 70,
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: 70,
          r: 170,
          label: {
            align: "center",
            width: 100,
          },
        },
        {
          r0: 170,
          r: 330,
          label: {
            align: "center",
            width: 160,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
        {
          r0: 330,
          r: 425,
          label: {
            width: 100,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  let sunburstOption2 = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: (params: any) => {
        return `<div style="color: #000;font-size: 12px; padding:0;line-height: 12px">
                  <span style="display:inline-block;margin-right:5px;border-radius:50%;width:12px;height:12px;background-color:${[
                    params.color,
                  ]};"></span>
                  ${params.name.replace(/-\n/g, "")}
                </div>`;
      },
      confine: true,
    },
    series: {
      type: "sunburst",
      data: level2Data,
      radius: [0, "100%"],
      sort: undefined,
      itemStyle: {
        borderRadius: 7,
        borderWidth: 2,
      },
      label: {
        fontFamily: "Arial",
        overflow: "break",
        fontSize: "0.7rem",
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
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: 70,
          r: 170,
          label: { rotate: "tangential" },
        },
        {
          r0: 170,
          r: 330,
          label: {
            align: "center",
            width: 160,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
        {
          r0: 330,
          r: 425,
          label: {
            width: 100,
            padding: 0,
            silent: false,
          },
          nodeClick: false,
        },
      ],
    },
    color: color,
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  // Sankey Data
  const sankeyData = [
    {
      name: "Social",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    { name: "Economic", itemStyle: { color: "#FAC858" }, depth: SANKEYLEVELS.LEVEL1 },
    {
      name: "Institutional",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    { name: "Physical", itemStyle: { color: "#73C0DE" }, depth: SANKEYLEVELS.LEVEL1 },
    {
      name: "Safe & affordable housing",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Inclusive access to safe drinking water",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Effective sanitation",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Adequate affordable energy supply",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Accessibility to training materials (language)",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Sufficient affordable food supply",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Exchange knowledge and learn from other cities facing similar challenges",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Grassroots or community organizations participating in pre-event planning and post event response",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Accessible criminal and civil justice",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Cohesive communities",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Training programmes provided to the most vulnerable and at need populations",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Citizen engagement and communications in relation to disaster resilience and recovery",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Widespread community awareness & preparedness",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Main public facilities: university, schools, health centres, markets, etc.",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Social services infrastructure, including schools, hospitals, and clinics",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Local community support",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Strong city-wide identity & culture",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Actively engaged citizens",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Practices and drills involving public and professionals",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Adequate education for all",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Major community buildings, religious buildings, and historic/cultural assets",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Relevant skills & training",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Awareness of functions or services that natural capital provides for the city",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Public education towards awareness of hazard, risk and disaster information",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Safe places/havens and the evacuation routes",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Awareness of equipment and supply needed + provision",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Effective systems to deter crime",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "High levels of crime are observed",
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Diverse economic base",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Inclusive labour policies",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Local business development and innovation",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Supportive financing mechanisms",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Comprehensive business continuity planning",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Attractive business environment",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Strong integration with regional & global economies",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Industrial areas including ports, industrial zones, and factories",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Businesses with a documented business continuity plan",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Knowledge to funding opportunities (for local economy and recovery)",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Economic impact",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Level of insurance cover exists in the city, across all sectors - business and community",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Incentives for business and society to support resilience building",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Planned investments",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Changes in the overall city's boundaries",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Financial plan and budget for resilience, including contingency funds",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Densities",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Projected changes to population densities and economic activity",
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Disaster management authority have sufficient staffing capacity",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Appropriate government decision-making",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Effective co-ordination with other government bodies",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Proactive multi-stakeholder collaboration",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Comprehensive government emergency management",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Consultative planning process",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Appropriate land use and zoning",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Robust planning approval process",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Well-managed public finances",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Informal development areas",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Urban development to promote resilience",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Building codes or standards address hazards and risks",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Enforcement and verification of zoning building zoning and regulations",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "FAIR Data sharing to enhance resilience",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Proactive corruption prevention",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Comprehensive city monitoring & data management",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Land use designations",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Changes in land use designations",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Early warning system and reaching level",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Integration of resilience in city functions / portfolios",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Disaster management / preparedness / emergency response plan",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Appropriately land use planning considering risk, hazards and vulnerability",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Projected changes in location of vulnerable populations",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Adequate access to quality healthcare",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Emergency medical care",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Effective emergency response services",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Robust public health systems",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Security services: fire services, police stations, etc.",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Integration of green and blue infrastructure into city policy and projects",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Reliable communications technology",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Adequate continuity for critical assets & services",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Diverse and affordable transport networks",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Natural elements, mangrove, hills, rivers, plantations, among others",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Secure technology networks",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Flexible infrastructure services",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Critical infrastructure: mapping, planning and protection strategies",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Infrastructure and services damaged",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Protective infrastructure: well-designed and well-built based on risk information",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: 'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Major roads",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Diligent maintenance & continuity",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Retained spare capacity",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Housing destroyed and damaged",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Affected areas",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Topography: elevation, water bodies",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Hazard mapping and monitoring (common awareness)",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Hazard mapping and monitoring (clear and regular mapping)",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Identification of cascading effects",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Comprehensive hazard monitoring and risk assessment",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "First responder equipment, with military or civilian back up",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Vulnerability and risk",
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    { name: "Robustness", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#1abc9c" } },
    { name: "Redundancy", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#2ecc71" } },
    {
      name: "Inclusiveness",
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#d35400" },
    },
    { name: "Diversity", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#3498db" } },
    { name: "Flexibility", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#95a5a6" } },
    {
      name: "Resourcefulness",
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#f39c12" },
    },
    { name: "Integration", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#9b59b6" } },
    {
      name: "Reflectiveness",
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#e74c3c" },
    },
    { name: "Transparency", depth: SANKEYLEVELS.LEVEL3, itemStyle: { color: "#7d6b57" } },
  ];
  const sankeyLinks = [
    {
      source: "Physical",
      target: "Natural elements, mangrove, hills, rivers, plantations, among others",
      value: 1,
    },
    {
      source: "Natural elements, mangrove, hills, rivers, plantations, among others",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Natural elements, mangrove, hills, rivers, plantations, among others",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Natural elements, mangrove, hills, rivers, plantations, among others",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Natural elements, mangrove, hills, rivers, plantations, among others",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Natural elements, mangrove, hills, rivers, plantations, among others",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      value: 1,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Communication: radio/TV station, cell phone towers and existing telecommunication infrastructure",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Physical",
      target: "Adequate continuity for critical assets & services",
      value: 1,
    },
    {
      source: "Adequate continuity for critical assets & services",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Adequate continuity for critical assets & services",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Adequate continuity for critical assets & services",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Adequate continuity for critical assets & services",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Adequate continuity for critical assets & services",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Diverse and affordable transport networks",
      value: 1,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Diverse and affordable transport networks",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Physical",
      target:
        "Integration of green and blue infrastructure into city policy and projects",
      value: 1,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Robustness",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Diversity",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Integration",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source:
        "Integration of green and blue infrastructure into city policy and projects",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Physical",
      target: "Reliable communications technology",
      value: 1,
    },
    {
      source: "Reliable communications technology",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Reliable communications technology",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Reliable communications technology",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Reliable communications technology",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Reliable communications technology",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Secure technology networks",
      value: 1,
    },
    {
      source: "Secure technology networks",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Secure technology networks",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Secure technology networks",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Secure technology networks",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Secure technology networks",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      value: 1,
    },
    {
      source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      target: "Reflectiveness",
      value: 0.25,
    },
    {
      source: "City boundaries and sub-municipal boundaries (e.g., districts, wards)",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Physical",
      target:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      value: 1,
    },
    {
      source:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source:
        "(identify, as appropriate)industrial areas, agricultural areas, environmentally sensitive areas, main public spaces (e.g. public squares, parks, sport and recreation facilities, etc.), other relevant land uses",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      value: 1,
    },
    {
      source:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Water, sanitation and energy: primary drainage network, main water tanks/water storage facilities, wastewater treatment infrastructure, etc.",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Flexible infrastructure services",
      value: 1,
    },
    {
      source: "Flexible infrastructure services",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Flexible infrastructure services",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Flexible infrastructure services",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Flexible infrastructure services",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Flexible infrastructure services",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Flexible infrastructure services",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Physical",
      target:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      value: 1,
    },
    {
      source:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Major infrastructure: water supply, sanitation and sewerage, roads, highways, bridges, ports, power supply, among others",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Critical infrastructure: mapping, planning and protection strategies",
      value: 1,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Critical infrastructure: mapping, planning and protection strategies",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Physical",
      target: "Infrastructure and services damaged",
      value: 1,
    },
    {
      source: "Infrastructure and services damaged",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Infrastructure and services damaged",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Infrastructure and services damaged",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Infrastructure and services damaged",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Infrastructure and services damaged",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        "Protective infrastructure: well-designed and well-built based on risk information",
      value: 1,
    },
    {
      source:
        "Protective infrastructure: well-designed and well-built based on risk information",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Protective infrastructure: well-designed and well-built based on risk information",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Protective infrastructure: well-designed and well-built based on risk information",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Protective infrastructure: well-designed and well-built based on risk information",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source:
        "Protective infrastructure: well-designed and well-built based on risk information",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      value: 1,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        'Water - potable and Sanitation, Energy, Transport, Communications, Health care: ensured minimal provision for "most severe" disaster scenario',
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Physical",
      target: "Major roads",
      value: 1,
    },
    {
      source: "Major roads",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Major roads",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Major roads",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Major roads",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Major roads",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Major roads",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Physical",
      target:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      value: 1,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Transportation: main roads, bus station, airport, train station & rail tracks, etc.",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Physical",
      target: "Diligent maintenance & continuity",
      value: 1,
    },
    {
      source: "Diligent maintenance & continuity",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Diligent maintenance & continuity",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source: "Diligent maintenance & continuity",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Diligent maintenance & continuity",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Physical",
      target: "Retained spare capacity",
      value: 1,
    },
    {
      source: "Retained spare capacity",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Retained spare capacity",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Retained spare capacity",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Retained spare capacity",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Retained spare capacity",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Housing destroyed and damaged",
      value: 1,
    },
    {
      source: "Housing destroyed and damaged",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Housing destroyed and damaged",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Housing destroyed and damaged",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Housing destroyed and damaged",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Housing destroyed and damaged",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Affected areas",
      value: 1,
    },
    {
      source: "Affected areas",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Affected areas",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Affected areas",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Affected areas",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Affected areas",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target: "Topography: elevation, water bodies",
      value: 1,
    },
    {
      source: "Topography: elevation, water bodies",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Topography: elevation, water bodies",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Topography: elevation, water bodies",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Topography: elevation, water bodies",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Topography: elevation, water bodies",
      target: "Flexibility",
      value: 0.2,
    },
    // {
    //   source: "Topography: elevation, water bodies",
    //   target: "Transparency",
    //   value: 1,
    // },
    {
      source: "Physical",
      target: "Hazard mapping and monitoring (common awareness)",
      value: 1,
    },
    {
      source: "Hazard mapping and monitoring (common awareness)",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (common awareness)",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (common awareness)",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (common awareness)",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (common awareness)",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      value: 1,
    },
    {
      source:
        "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      target: "Robustness",
      value: 0.25,
    },
    {
      source:
        "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      target: "Integration",
      value: 0.25,
    },
    {
      source:
        "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      target: "Reflectiveness",
      value: 0.25,
    },
    {
      source:
        "Shared understanding of infrastructure risk (authorities, utility providers, infrastructure management)",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Physical",
      target: "Hazard mapping and monitoring (clear and regular mapping)",
      value: 1,
    },
    {
      source: "Hazard mapping and monitoring (clear and regular mapping)",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (clear and regular mapping)",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (clear and regular mapping)",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (clear and regular mapping)",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Hazard mapping and monitoring (clear and regular mapping)",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Physical",
      target:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      value: 1,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Hazard mitigation infrastructure, including location of sea walls, dikes, retention ponds",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Physical",
      target: "Identification of cascading effects",
      value: 1,
    },
    {
      source: "Identification of cascading effects",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Identification of cascading effects",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Identification of cascading effects",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Identification of cascading effects",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Identification of cascading effects",
      target: "Flexibility",
      value: 0.2,
    },

    {
      source: "Physical",
      target:
        "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      value: 1,
    },
    {
      source:
        "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      target: "Robustness",
      value: 0.25,
    },
    {
      source:
        "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source:
        "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      target: "Reflectiveness",
      value: 0.25,
    },
    {
      source:
        "Areas of your city that were affected by natural hazards in the past, such as floods, strong winds, fire, erosion, landslides, etc.",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Physical",
      target:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      value: 1,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Changes in intensity, frequency, and location of hazards based on hazard modeling",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Physical",
      target:
        '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      value: 1,
    },
    {
      source:
        '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      target: "Robustness",
      value: 0.25,
    },
    {
      source:
        '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      target: "Diversity",
      value: 0.25,
    },
    {
      source:
        '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      target: "Inclusiveness",
      value: 0.25,
    },
    {
      source:
        '% of education structures at risk of damage from "most probable" and "most severe" scenarios',
      target: "Reflectiveness",
      value: 0.25,
    },
    {
      source: "Physical",
      target: "Comprehensive hazard monitoring and risk assessment",
      value: 1,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Comprehensive hazard monitoring and risk assessment",
      target: "Transparency",
      value: 0.16,
    },

    {
      source: "Physical",
      target: "First responder equipment, with military or civilian back up",
      value: 1,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "First responder equipment, with military or civilian back up",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Physical",
      target:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      value: 1,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Robustness",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Diversity",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source:
        "Food, shelter, staple goods and fuel to respond to emergency of disaster scenarios",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Physical",
      target: "Vulnerability and risk",
      value: 1,
    },
    {
      source: "Vulnerability and risk",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Vulnerability and risk",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Appropriate government decision-making",
      value: 1,
    },
    {
      source: "Appropriate government decision-making",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Appropriate government decision-making",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Appropriate government decision-making",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Appropriate government decision-making",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Appropriate government decision-making",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Appropriate government decision-making",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Effective co-ordination with other government bodies",
      value: 1,
    },
    {
      source: "Effective co-ordination with other government bodies",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "Effective co-ordination with other government bodies",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Effective co-ordination with other government bodies",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Effective co-ordination with other government bodies",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Institutional",
      target: "Proactive multi-stakeholder collaboration",
      value: 1,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Proactive multi-stakeholder collaboration",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Effective emergency response services",
      value: 1,
    },
    {
      source: "Effective emergency response services",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Effective emergency response services",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Effective emergency response services",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Effective emergency response services",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Effective emergency response services",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "Disaster management authority have sufficient staffing capacity",
      value: 1,
    },
    {
      source: "Disaster management authority have sufficient staffing capacity",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Disaster management authority have sufficient staffing capacity",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Disaster management authority have sufficient staffing capacity",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Disaster management authority have sufficient staffing capacity",
      target: "Reflectiveness",
      value: 0.25,
    },
    {
      source: "Institutional",
      target: "Consultative planning process",
      value: 1,
    },
    {
      source: "Consultative planning process",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Consultative planning process",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Consultative planning process",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Consultative planning process",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "Comprehensive government emergency management",
      value: 1,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Comprehensive government emergency management",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Comprehensive city monitoring & data management",
      value: 1,
    },
    {
      source: "Comprehensive city monitoring & data management",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Comprehensive city monitoring & data management",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Comprehensive city monitoring & data management",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Comprehensive city monitoring & data management",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Comprehensive city monitoring & data management",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "Appropriate land use and zoning",
      value: 1,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Appropriate land use and zoning",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Robust planning approval process",
      value: 1,
    },
    {
      source: "Robust planning approval process",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Robust planning approval process",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Robust planning approval process",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Robust planning approval process",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Institutional",
      target: "Well-managed public finances",
      value: 1,
    },
    {
      source: "Well-managed public finances",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Well-managed public finances",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Informal development areas",
      value: 1,
    },
    {
      source: "Informal development areas",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: "Inclusiveness",
      value: 0.2,
    },

    {
      source: "Informal development areas",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Institutional",
      target:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      value: 1,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Robustness",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Integration",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source:
        "Is there a multi-agency/sectoral mechanism with appropriate authority and resources to address disaster risk reduction?",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Urban development to promote resilience",
      value: 1,
    },
    {
      source: "Urban development to promote resilience",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Urban development to promote resilience",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Urban development to promote resilience",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Urban development to promote resilience",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Urban development to promote resilience",
      target: "Flexibility",
      value: 0.2,
    },

    {
      source: "Institutional",
      target: "Building codes or standards address hazards and risks",
      value: 1,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Building codes or standards address hazards and risks",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Enforcement and verification of zoning building zoning and regulations",
      value: 1,
    },
    {
      source: "Enforcement and verification of zoning building zoning and regulations",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Enforcement and verification of zoning building zoning and regulations",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Enforcement and verification of zoning building zoning and regulations",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Enforcement and verification of zoning building zoning and regulations",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Enforcement and verification of zoning building zoning and regulations",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "FAIR Data sharing to enhance resilience",
      value: 1,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Institutional",
      target:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      value: 1,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Plan for post-event recovery and reconstruction, including economic reboot, societal aspects",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Proactive corruption prevention",
      value: 1,
    },
    {
      source: "Proactive corruption prevention",
      target: "Diversity",
      value: 0.33,
    },
    {
      source: "Proactive corruption prevention",
      target: "Integration",
      value: 0.33,
    },
    {
      source: "Proactive corruption prevention",
      target: "Transparency",
      value: 0.33,
    },
    {
      source: "Institutional",
      target: "Land use designations",
      value: 1,
    },
    {
      source: "Land use designations",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Land use designations",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Land use designations",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Land use designations",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Land use designations",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Land use designations",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Changes in land use designations",
      value: 1,
    },
    {
      source: "Changes in land use designations",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Changes in land use designations",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Changes in land use designations",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Changes in land use designations",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Changes in land use designations",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Changes in land use designations",
      target: "Transparency",
      value: 0.16,
    },

    {
      source: "Institutional",
      target:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      value: 1,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Disaster and risk reduction in urban planning instruments according to Sendai framework",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      value: 1,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Vulnerability mapping and monitoring (vulnerable groups and assets, disaster scenario analysis)",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      value: 1,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Robustness",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Diversity",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Integration",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source:
        "Do post-event assessment processes incorporate failure analyses and the ability to capture lessons learned that then feed into design and delivery of rebuilding projects?",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Early warning system and reaching level",
      value: 1,
    },
    {
      source: "Early warning system and reaching level",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Early warning system and reaching level",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Early warning system and reaching level",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Early warning system and reaching level",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Institutional",
      target: "Integration of resilience in city functions / portfolios",
      value: 1,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Integration of resilience in city functions / portfolios",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      value: 1,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Robustness",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Diversity",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Integration",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source:
        "Emergency operations centre: interoperability and inter-agency implementation and coordination",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Institutional",
      target: "Disaster management / preparedness / emergency response plan",
      value: 1,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Disaster management / preparedness / emergency response plan",
      target: "Transparency",
      value: 0.14,
    },

    {
      source: "Institutional",
      target:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      value: 1,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Appropriately land use planning considering risk, hazards and vulnerability",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Institutional",
      target:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      value: 1,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Locate the various administrative/government buildings in your city, including at the neighbourhood level, as applicable",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Projected changes in location of vulnerable populations",
      value: 1,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Projected changes in location of vulnerable populations",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Adequate access to quality healthcare",
      value: 1,
    },
    {
      source: "Adequate access to quality healthcare",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Adequate access to quality healthcare",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Adequate access to quality healthcare",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Adequate access to quality healthcare",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Adequate access to quality healthcare",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "Emergency medical care",
      value: 1,
    },
    {
      source: "Emergency medical care",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Emergency medical care",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source: "Emergency medical care",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Emergency medical care",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Emergency medical care",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Institutional",
      target: "Robust public health systems",
      value: 1,
    },
    {
      source: "Robust public health systems",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Robust public health systems",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Robust public health systems",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Robust public health systems",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Robust public health systems",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Robust public health systems",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Institutional",
      target: "Security services: fire services, police stations, etc.",
      value: 1,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Security services: fire services, police stations, etc.",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Economic",
      target: "Local business development and innovation",
      value: 1,
    },
    {
      source: "Local business development and innovation",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Local business development and innovation",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "Local business development and innovation",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Local business development and innovation",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Economic",
      target: "Supportive financing mechanisms",
      value: 1,
    },
    {
      source: "Supportive financing mechanisms",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Supportive financing mechanisms",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source: "Supportive financing mechanisms",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Supportive financing mechanisms",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Economic",
      target: "Comprehensive business continuity planning",
      value: 1,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Comprehensive business continuity planning",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Diverse economic base",
      value: 1,
    },
    {
      source: "Diverse economic base",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Diverse economic base",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Diverse economic base",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Diverse economic base",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Diverse economic base",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Diverse economic base",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Attractive business environment",
      value: 1,
    },
    {
      source: "Attractive business environment",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Attractive business environment",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Attractive business environment",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Attractive business environment",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Attractive business environment",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Attractive business environment",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Strong integration with regional & global economies",
      value: 1,
    },
    {
      source: "Strong integration with regional & global economies",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Strong integration with regional & global economies",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Strong integration with regional & global economies",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Strong integration with regional & global economies",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Economic",
      target: "Industrial areas including ports, industrial zones, and factories",
      value: 1,
    },
    {
      source: "Industrial areas including ports, industrial zones, and factories",
      target: "Robustness",
      value: 0.33,
    },
    {
      source: "Industrial areas including ports, industrial zones, and factories",
      target: "Diversity",
      value: 0.33,
    },
    {
      source: "Industrial areas including ports, industrial zones, and factories",
      target: "Resourcefulness",
      value: 0.33,
    },
    {
      source: "Economic",
      target:
        "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      value: 1,
    },
    {
      source:
        "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      target: "Robustness",
      value: 0.25,
    },
    {
      source:
        "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source:
        "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      target: "Diversity",
      value: 0.25,
    },
    {
      source:
        "Economic facilities (banks, business centres, shopping malls, markets, etc.)",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Economic",
      target: "Businesses with a documented business continuity plan",
      value: 1,
    },
    {
      source: "Businesses with a documented business continuity plan",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Businesses with a documented business continuity plan",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "Businesses with a documented business continuity plan",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Businesses with a documented business continuity plan",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Economic",
      target: "Knowledge to funding opportunities (for local economy and recovery)",
      value: 1,
    },
    {
      source: "Knowledge to funding opportunities (for local economy and recovery)",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source: "Knowledge to funding opportunities (for local economy and recovery)",
      target: "Integration",
      value: 0.25,
    },
    {
      source: "Knowledge to funding opportunities (for local economy and recovery)",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Knowledge to funding opportunities (for local economy and recovery)",
      target: "Transparency",
      value: 0.25,
    },
    {
      source: "Economic",
      target:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      value: 1,
    },
    {
      source:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source:
        "Level of insurance cover exists in the city, across all sectors - business and community",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Economic",
      target: "Economic impact",
      value: 1,
    },
    {
      source: "Economic impact",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Economic impact",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Economic impact",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Economic impact",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Economic impact",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Economic impact",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Incentives for business and society to support resilience building",
      value: 1,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Incentives for business and society to support resilience building",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Planned investments",
      value: 1,
    },
    {
      source: "Planned investments",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Planned investments",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Economic",
      target: "Inclusive labour policies",
      value: 1,
    },
    {
      source: "Inclusive labour policies",
      target: "Robustness",
      value: 0.33,
    },
    {
      source: "Inclusive labour policies",
      target: "Inclusiveness",
      value: 0.33,
    },
    {
      source: "Inclusive labour policies",
      target: "Transparency",
      value: 0.33,
    },
    {
      source: "Economic",
      target:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      value: 1,
    },
    {
      source:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source:
        "Economic activities, including commercial zones, central business districts, hotels, and tourist facilities",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Economic",
      target: "Changes in the overall city's boundaries",
      value: 1,
    },
    {
      source: "Changes in the overall city's boundaries",
      target: "Integration",
      value: 0.33,
    },
    {
      source: "Changes in the overall city's boundaries",
      target: "Reflectiveness",
      value: 0.33,
    },
    {
      source: "Changes in the overall city's boundaries",
      target: "Flexibility",
      value: 0.33,
    },
    {
      source: "Economic",
      target: "Financial plan and budget for resilience, including contingency funds",
      value: 1,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Financial plan and budget for resilience, including contingency funds",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Economic",
      target: "Projected changes to population densities and economic activity",
      value: 1,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Projected changes to population densities and economic activity",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Economic",
      target: "Densities",
      value: 1,
    },
    {
      source: "Densities",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Densities",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Densities",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Densities",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Densities",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Social",
      target: "Safe & affordable housing",
      value: 1,
    },
    {
      source: "Safe & affordable housing",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Safe & affordable housing",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Safe & affordable housing",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Safe & affordable housing",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target: "Inclusive access to safe drinking water",
      value: 1,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Inclusive access to safe drinking water",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Adequate affordable energy supply",
      value: 1,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Adequate affordable energy supply",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Accessibility to training materials (language)",
      value: 1,
    },
    {
      source: "Accessibility to training materials (language)",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Accessibility to training materials (language)",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Accessibility to training materials (language)",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Accessibility to training materials (language)",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Accessibility to training materials (language)",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target: "Sufficient affordable food supply",
      value: 1,
    },
    {
      source: "Sufficient affordable food supply",
      target: "Redundancy",
      value: 0.25,
    },
    {
      source: "Sufficient affordable food supply",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "Sufficient affordable food supply",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Sufficient affordable food supply",
      target: "Inclusiveness",
      value: 0.25,
    },
    {
      source: "Social",
      target:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      value: 1,
    },
    {
      source:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source:
        "Grassroots or community organizations participating in pre-event planning and post event response",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target: "Accessible criminal and civil justice",
      value: 1,
    },
    {
      source: "Accessible criminal and civil justice",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Accessible criminal and civil justice",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Accessible criminal and civil justice",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Accessible criminal and civil justice",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Accessible criminal and civil justice",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target:
        "Training programmes provided to the most vulnerable and at need populations",
      value: 1,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Training programmes provided to the most vulnerable and at need populations",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target:
        "Main public facilities: university, schools, health centres, markets, etc.",
      value: 1,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Main public facilities: university, schools, health centres, markets, etc.",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Social services infrastructure, including schools, hospitals, and clinics",
      value: 1,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Social services infrastructure, including schools, hospitals, and clinics",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Social",
      target: "Practices and drills involving public and professionals",
      value: 1,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Practices and drills involving public and professionals",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Widespread community awareness & preparedness",
      value: 1,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Widespread community awareness & preparedness",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Strong city-wide identity & culture",
      value: 1,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Strong city-wide identity & culture",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Adequate education for all",
      value: 1,
    },
    {
      source: "Adequate education for all",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Adequate education for all",
      target: "Diversity",
      value: 0.16,
    },
    {
      source: "Adequate education for all",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Adequate education for all",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Adequate education for all",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Adequate education for all",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Effective sanitation",
      value: 1,
    },
    {
      source: "Effective sanitation",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Effective sanitation",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Effective sanitation",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "Effective sanitation",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Effective sanitation",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Effective sanitation",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Local community support",
      value: 1,
    },
    {
      source: "Local community support",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Local community support",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Social",
      target: "Cohesive communities",
      value: 1,
    },
    {
      source: "Cohesive communities",
      target: "Robustness",
      value: 0.2,
    },
    {
      source: "Cohesive communities",
      target: "Diversity",
      value: 0.2,
    },
    {
      source: "Cohesive communities",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Cohesive communities",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Cohesive communities",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source: "Social",
      target: "Actively engaged citizens",
      value: 1,
    },
    {
      source: "Actively engaged citizens",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Resourcefulness",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Actively engaged citizens",
      target: "Transparency",
      value: 0.14,
    },
    {
      source: "Social",
      target:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      value: 1,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Redundancy",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Diversity",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Integration",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Resourcefulness",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Inclusiveness",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Reflectiveness",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Flexibility",
      value: 0.13,
    },
    {
      source:
        "Access to all the skills and experience to respond/reduce risks and respond to disaster",
      target: "Transparency",
      value: 0.13,
    },
    {
      source: "Social",
      target: "Exchange knowledge and learn from other cities facing similar challenges",
      value: 1,
    },
    {
      source: "Exchange knowledge and learn from other cities facing similar challenges",
      target: "Integration",
      value: 0.2,
    },
    {
      source: "Exchange knowledge and learn from other cities facing similar challenges",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source: "Exchange knowledge and learn from other cities facing similar challenges",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source: "Exchange knowledge and learn from other cities facing similar challenges",
      target: "Flexibility",
      value: 0.2,
    },
    {
      source: "Exchange knowledge and learn from other cities facing similar challenges",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      value: 1,
    },
    {
      source:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      target: "Diversity",
      value: 0.2,
    },
    {
      source:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source:
        "Citizen engagement and communications in relation to disaster resilience and recovery",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target:
        "Major community buildings, religious buildings, and historic/cultural assets",
      value: 1,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Major community buildings, religious buildings, and historic/cultural assets",
      target: "Transparency",
      value: 0.16,
    },
    {
      //Not available in spreadsheet
      source: "Social",
      target: "Safe places/havens and the evacuation routes",
      value: 1,
    },
    {
      //Not available in spreadsheet
      source: "Safe places/havens and the evacuation routes",
      target: "Transparency",
      value: 1,
    },
    {
      source: "Social",
      target:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      value: 1,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source:
        "Risk and resilience training to all sectors of the city including government, business, NGOs and community",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Awareness of equipment and supply needed + provision",
      value: 1,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "Awareness of equipment and supply needed + provision",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Effective systems to deter crime",
      value: 1,
    },
    {
      source: "Effective systems to deter crime",
      target: "Robustness",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Redundancy",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Diversity",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Integration",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Inclusiveness",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Reflectiveness",
      value: 0.14,
    },
    {
      source: "Effective systems to deter crime",
      target: "Flexibility",
      value: 0.14,
    },
    {
      source: "Social",
      target: "High levels of crime are observed",
      value: 1,
    },
    {
      source: "High levels of crime are observed",
      target: "Robustness",
      value: 0.16,
    },
    {
      source: "High levels of crime are observed",
      target: "Integration",
      value: 0.16,
    },
    {
      source: "High levels of crime are observed",
      target: "Inclusiveness",
      value: 0.16,
    },
    {
      source: "High levels of crime are observed",
      target: "Reflectiveness",
      value: 0.16,
    },
    {
      source: "High levels of crime are observed",
      target: "Flexibility",
      value: 0.16,
    },
    {
      source: "High levels of crime are observed",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target: "Relevant skills & training",
      value: 1,
    },
    {
      source: "Relevant skills & training",
      target: "Robustness",
      value: 0.25,
    },
    {
      source: "Relevant skills & training",
      target: "Diversity",
      value: 0.25,
    },
    {
      source: "Relevant skills & training",
      target: "Resourcefulness",
      value: 0.25,
    },
    {
      source: "Relevant skills & training",
      target: "Flexibility",
      value: 0.25,
    },
    {
      source: "Social",
      target:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      value: 1,
    },
    {
      source:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      target: "Redundancy",
      value: 0.2,
    },
    {
      source:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      target: "Resourcefulness",
      value: 0.2,
    },
    {
      source:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source:
        "Awareness of ecosystem services being provided to the city from natural capital beyond its administrative borders",
      target: "Transparency",
      value: 0.2,
    },
    {
      source: "Social",
      target:
        "Awareness of functions or services that natural capital provides for the city",
      value: 1,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Robustness",
      value: 0.16,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Redundancy",
      value: 0.16,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Diversity",
      value: 0.16,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Integration",
      value: 0.16,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Resourcefulness",
      value: 0.16,
    },
    {
      source:
        "Awareness of functions or services that natural capital provides for the city",
      target: "Transparency",
      value: 0.16,
    },
    {
      source: "Social",
      target:
        "Public education towards awareness of hazard, risk and disaster information",
      value: 1,
    },
    {
      source:
        "Public education towards awareness of hazard, risk and disaster information",
      target: "Robustness",
      value: 0.2,
    },
    {
      source:
        "Public education towards awareness of hazard, risk and disaster information",
      target: "Integration",
      value: 0.2,
    },
    {
      source:
        "Public education towards awareness of hazard, risk and disaster information",
      target: "Inclusiveness",
      value: 0.2,
    },
    {
      source:
        "Public education towards awareness of hazard, risk and disaster information",
      target: "Reflectiveness",
      value: 0.2,
    },
    {
      source:
        "Public education towards awareness of hazard, risk and disaster information",
      target: "Transparency",
      value: 0.2,
    },
  ];
  const basicSankeyData = [
    // Social
    {
      name: computed(() => t("initialIndicators.social.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: computed(() => t("initialIndicators.social.1.1.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.1.2.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.1.3.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.1.4.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.2.1.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.3.1.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.3.2.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.social.3.3.name")),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // ecomonic
    {
      name: computed(() => t("sidebar.dashboardPanel.radarChart.economic")),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: computed(() => t("initialIndicators.economic.1.1.name")),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.economic.1.2.name")),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.economic.2.1.name")),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // Institutional
    {
      name: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: computed(() => t("initialIndicators.institutional.1.1.name")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.institutional.2.1.name")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.institutional.3.1.name")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.institutional.3.2.name")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.institutional.3.3.name")),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // Physical
    {
      name: computed(() => t("initialIndicators.physical.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: computed(() => t("initialIndicators.physical.1.1.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.physical.1.2.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.physical.1.3.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.physical.2.1.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("initialIndicators.physical.3.1.name")),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: computed(() => t("echarts.capacities.Robustness")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#1abc9c" },
    },
    {
      name: computed(() => t("echarts.capacities.Redundancy")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#2ecc71" },
    },
    {
      name: computed(() => t("echarts.capacities.Inclusiveness")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#d35400" },
    },
    {
      name: computed(() => t("echarts.capacities.Diversity")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#3498db" },
    },
    {
      name: computed(() => t("echarts.capacities.Flexibility")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#95a5a6" },
    },
    {
      name: computed(() => t("echarts.capacities.Resourcefulness")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#f39c12" },
    },
    {
      name: computed(() => t("echarts.capacities.Integration")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#9b59b6" },
    },
    {
      name: computed(() => t("echarts.capacities.Reflectiveness")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#e74c3c" },
    },
    {
      name: computed(() => t("echarts.capacities.Transparency")),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#7d6b57" },
    },
  ];
  const basicSankeyLinks = [
    {
      source: computed(() => t("initialIndicators.physical.name")),
      target: computed(() => t("initialIndicators.physical.1.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.physical.name")),
      target: computed(() => t("initialIndicators.physical.1.2.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.physical.name")),
      target: computed(() => t("initialIndicators.physical.1.3.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.physical.name")),
      target: computed(() => t("initialIndicators.physical.2.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.physical.name")),
      target: computed(() => t("initialIndicators.physical.3.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.1.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.1.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.2.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.3.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.3.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.3.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.3.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.1.3.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.2.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.2.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.2.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.2.1.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.2.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.physical.3.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.physical.3.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.physical.3.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.physical.3.1.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.25,
    },
    // Institutional
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      target: computed(() => t("initialIndicators.institutional.1.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      target: computed(() => t("initialIndicators.institutional.2.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      target: computed(() => t("initialIndicators.institutional.3.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      target: computed(() => t("initialIndicators.institutional.3.2.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.institutional")),
      target: computed(() => t("initialIndicators.institutional.3.3.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.institutional.1.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.1.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.1.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.1.1.name")),
      target: "c",
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.2.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.2.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.2.1.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.2.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.2.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.2.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.2.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.2.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.2.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.3.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.3.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.3.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.3.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.institutional.3.3.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.2,
    },
    // Economic
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.economic")),
      target: computed(() => t("initialIndicators.economic.1.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.economic")),
      target: computed(() => t("initialIndicators.economic.1.2.name")),
      value: 1,
    },
    {
      source: computed(() => t("sidebar.dashboardPanel.radarChart.economic")),
      target: computed(() => t("initialIndicators.economic.2.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.1.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.2.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.2.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.2.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.1.2.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.14,
    },
    {
      source: computed(() => t("initialIndicators.economic.2.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.14,
    },
    // Social
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.1.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.1.2.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.1.3.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.1.4.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.2.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.3.1.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.3.2.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.name")),
      target: computed(() => t("initialIndicators.social.3.3.name")),
      value: 1,
    },
    {
      source: computed(() => t("initialIndicators.social.1.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.1.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.1.1.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.1.1.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.1.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.2.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.3.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.1.4.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.social.1.4.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.social.1.4.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.social.1.4.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.25,
    },
    {
      source: computed(() => t("initialIndicators.social.2.1.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.2.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.2.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.2.1.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.2.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.1.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.1.name")),
      target: computed(() => t("echarts.capacities.Diversity")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.1.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.1.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.1.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.2,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Integration")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.2.name")),
      target: computed(() => t("echarts.capacities.Transparency")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Robustness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Redundancy")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Resourcefulness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Inclusiveness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Reflectiveness")),
      value: 0.16,
    },
    {
      source: computed(() => t("initialIndicators.social.3.3.name")),
      target: computed(() => t("echarts.capacities.Flexibility")),
      value: 0.16,
    },
  ];
  const capacitySelected = ref("Robustness");
  // Filter by capacity of Sankey Data
  const directLinks = computed(() =>
    sankeyLinks.filter((link) => link.target === capacitySelected.value),
  ); // Filter the links directly connected to the target
  const relevantNodes = computed(() => {
    const nodes = new Set();
    directLinks.value.forEach((link) => {
      nodes.add(link.source);
      nodes.add(link.target);
    });
    return nodes;
  }); // Collect relevant nodes from the filtered links
  const filteredNodes = computed(() =>
    sankeyData.filter(
      (node) =>
        relevantNodes.value.has(node.name) ||
        node.name === "Social" ||
        node.name == "Economic" ||
        node.name == "Institutional" ||
        node.name == "Physical",
    ),
  ); // Filter the nodes
  const parentLinks = computed(() =>
    sankeyLinks.filter((link) => relevantNodes.value.has(link.target)),
  ); // Find parent links connected to these relevant nodes
  const filteredLinks = computed(() =>
    [...directLinks.value, ...parentLinks.value].map((link) => ({
      ...link,
      value: 1, // Set link value to 1
    })),
  );
  // Sankey Graph Options
  const sankeyOption = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: "{b}",
      confine: true,
    },
    series: {
      type: "sankey",
      layoutIterations: 0, // toggle this to keep the sequence of nodes
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      left: 10,
      top: 25,
      right: 70,
      bottom: 25,
      lineStyle: {
        color: "gradient",
      },
      label: {
        fontSize: 9,
      },
      nodeWidth: 15,
      nodeGap: 2, // Toggle this to avoid link junction
      data: sankeyData,
      links: sankeyLinks,
      levels: [
        { depth: SANKEYLEVELS.LEVEL1 },
        {
          depth: SANKEYLEVELS.LEVEL2,
        },
        { depth: SANKEYLEVELS.LEVEL3 },
      ],
    },
    // Add subtitles for each column
    graphic: [
      {
        type: "text",
        left: 20,
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.dimension")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "30%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.indicator")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "85%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.capacity")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
  };
  const sankeyBasicOption = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: "{b}",
      confine: true,
    },
    series: {
      type: "sankey",
      layoutIterations: 0,
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      left: 10,
      top: 25,
      right: 70,
      bottom: 25,
      lineStyle: {
        color: "gradient",
      },
      label: {
        fontSize: 11,
      },
      nodeWidth: 15,
      nodeGap: 12,
      data: basicSankeyData,
      links: basicSankeyLinks,
      levels: [
        { depth: SANKEYLEVELS.LEVEL1 },
        {
          depth: SANKEYLEVELS.LEVEL2,
        },
        { depth: SANKEYLEVELS.LEVEL3 },
      ],
    },
    graphic: [
      {
        type: "text",
        left: 20,
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.dimension")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "30%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.indicator")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "85%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.capacity")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
  };
  const sankeyOptionCapacity = {
    backgroundColor: "#fff",
    tooltip: {
      show: true,
      formatter: "{b}",
      confine: true,
    },
    series: {
      type: "sankey",
      layoutIterations: 0,
      layout: "none",
      emphasis: {
        focus: "adjacency",
      },
      left: 5,
      top: 25,
      right: 50,
      bottom: 8,
      lineStyle: {
        color: "gradient",
      },
      label: {
        fontSize: 10,
      },
      nodeWidth: 10,
      nodeGap: 5,
      data: filteredNodes,
      links: filteredLinks,
      levels: [
        { depth: SANKEYLEVELS.LEVEL1 },
        {
          depth: SANKEYLEVELS.LEVEL2,
        },
        { depth: SANKEYLEVELS.LEVEL3 },
      ],
    }, // Add subtitles for each column
    graphic: [
      {
        type: "text",
        left: 20,
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.dimension")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "30%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.indicator")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      {
        type: "text",
        left: "85%",
        top: 5,
        style: {
          text: computed(() => t("echarts.subtitle.capacity")),
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
  };

  return {
    SANKEYLEVELS,
    sunburstBasicOption,
    sunburstData,
    sunburstDimension,
    sunburstIndicator,
    sunburstColorSet,
    sunburstColorConvertion,
    sunburstOption,
    sunburstOption1,
    sunburstOption2,
    capacitySelected,
    sankeyOption,
    sankeyBasicOption,
    sankeyOptionCapacity,
  };
});
export default useIndicatorChartStore;
