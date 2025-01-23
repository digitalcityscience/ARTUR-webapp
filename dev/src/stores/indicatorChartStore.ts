import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

enum SANKEYLEVELS {
  LEVEL1 = 0,
  LEVEL2 = 0.5,
  LEVEL3 = 1.9,
}
const useIndicatorChartStore = defineStore("echarts-options", () => {
  const { t } = useI18n();
  // Basic Sunburst Data
  const basicSunburstData = {
    name: t("initialIndicators.name"),
    children: computed(() => [
      // Social
      {
        name: t("initialIndicators.social.name"),
        children: [
          {
            name: t("initialIndicators.social.1.name"),
            children: [
              {
                name: t("initialIndicators.social.1.1.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.social.1.2.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.social.1.3.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.social.1.4.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.social.2.name"),
            children: [
              {
                name: t("initialIndicators.social.2.1.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.social.3.name"),
            children: [
              {
                name: t("initialIndicators.social.3.1.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.social.3.2.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.social.3.3.name"),
                value: 1,
              },
            ],
          },
        ],
      },
      //Economic
      {
        name: t("initialIndicators.economic.name"),
        children: [
          {
            name: t("initialIndicators.economic.1.name"),
            children: [
              {
                name: t("initialIndicators.economic.1.1.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.economic.1.2.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.economic.2.name"),
            children: [
              {
                name: t("initialIndicators.economic.2.1.name"),
                value: 1,
              },
            ],
          },
        ],
      },
      //Institutional
      {
        name: t("initialIndicators.institutional.name"),
        children: [
          {
            name: t("initialIndicators.institutional.1.name"),
            children: [
              {
                name: t("initialIndicators.institutional.1.1.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.institutional.2.name"),
            children: [
              {
                name: t("initialIndicators.institutional.2.1.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.institutional.3.name"),
            children: [
              {
                name: t("initialIndicators.institutional.3.1.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.institutional.3.2.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.institutional.3.3.name"),
                value: 1,
              },
            ],
          },
        ],
      },
      //Physical
      {
        name: t("initialIndicators.physical.name"),
        children: [
          {
            name: t("initialIndicators.physical.1.name"),
            children: [
              {
                name: t("initialIndicators.physical.1.1.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.physical.1.2.name"),
                value: 1,
              },
              {
                name: t("initialIndicators.physical.1.3.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.physical.2.name"),
            children: [
              {
                name: t("initialIndicators.physical.2.1.name"),
                value: 1,
              },
            ],
          },
          {
            name: t("initialIndicators.physical.3.name"),
            children: [
              {
                name: t("initialIndicators.physical.3.1.name"),
                value: 1,
              },
            ],
          },
        ],
      },
    ]),
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
          r: "10%",
          itemStyle: {
            color: "transparent",
            opacity: 0,
          },
        },
        {
          r0: "10%",
          r: "20%",
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: "20%",
          r: "45%",
          label: {
            align: "center",
            width: 95,
          },
        },
        {
          r0: "45%",
          r: "99%",
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
    name: t("echarts.name"),
    children: computed(() => [
      {
        name: t("echarts.social.name"),
        children: [
          {
            name: t("echarts.social.1.name"),
            children: [
              {
                name: t("echarts.social.1.1"),
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
                name: t("echarts.social.1.2"),
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
                name: t("echarts.social.1.3"),
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
                name: t("echarts.social.1.4"),
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
                name: t("echarts.social.1.5"),
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
            name: t("echarts.social.2.name"),
            children: [
              {
                name: t("echarts.social.2.1"),
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
                name: t("echarts.social.2.2"),
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
                name: t("echarts.social.2.3"),
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
            name: t("echarts.social.3.name"),
            children: [
              {
                name: t("echarts.social.3.1"),
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
                name: t("echarts.social.3.2"),
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
                name: t("echarts.social.3.3"),
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
                name: t("echarts.social.3.4"),
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
                name: t("echarts.social.3.5"),
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
                name: t("echarts.social.3.6"),
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
                name: t("echarts.social.3.7"),
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
                name: t("echarts.social.3.8"),
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
                name: t("echarts.social.3.9"),
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
                name: t("echarts.social.3.10"),
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
                name: t("echarts.social.3.11"),
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
                name: t("echarts.social.3.12"),
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
                name: t("echarts.social.3.13"),
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
                name: t("echarts.social.3.14"),
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
                name: t("echarts.social.3.15"),
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
            name: t("echarts.social.4.name"),
            children: [
              {
                name: t("echarts.social.4.1"),
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
                name: t("echarts.social.4.2"),
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
            name: t("echarts.social.5.name"),
            children: [
              {
                name: t("echarts.social.5.1"),
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
                name: t("echarts.social.5.2"),
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
                name: t("echarts.social.5.3"),
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
                name: t("echarts.social.5.4"),
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
            name: t("echarts.social.6.name"),
            children: [
              {
                name: t("echarts.social.6.1"),
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
                name: t("echarts.social.6.2"),
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
        name: t("echarts.economic.name"),
        children: [
          {
            name: t("echarts.economic.1.name"),
            children: [
              {
                name: t("echarts.economic.1.1"),
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
                name: t("echarts.economic.1.2"),
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
                name: t("echarts.economic.1.3"),
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
                name: t("echarts.economic.1.4"),
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
            name: t("echarts.economic.2.name"),
            children: [
              {
                name: t("echarts.economic.2.1"),
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
                name: t("echarts.economic.2.2"),
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
                name: t("echarts.economic.2.3"),
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
                name: t("echarts.economic.2.4"),
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
                name: t("echarts.economic.2.5"),
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
                name: t("echarts.economic.2.6"),
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
                name: t("echarts.economic.2.7"),
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
                name: t("echarts.economic.2.8"),
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
                name: t("echarts.economic.2.9"),
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
                name: t("echarts.economic.2.10"),
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
                name: t("echarts.economic.2.11"),
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
                name: t("echarts.economic.2.12"),
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
            name: t("echarts.economic.3.name"),
            children: [
              {
                name: t("echarts.economic.3.1"),
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
                name: t("echarts.economic.3.2"),
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
                name: t("echarts.economic.3.3"),
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
            name: t("echarts.economic.4.name"),
            children: [
              {
                name: t("echarts.economic.4.1"),
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
        name: t("echarts.institutional.name"),
        children: [
          {
            name: t("echarts.institutional.1.name"),
            children: [
              {
                name: t("echarts.institutional.1.1"),
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
                name: t("echarts.institutional.1.2"),
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
                name: t("echarts.institutional.1.3"),
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
                name: t("echarts.institutional.1.4"),
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
                name: t("echarts.institutional.1.5"),
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
                name: t("echarts.institutional.1.6"),
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
                name: t("echarts.institutional.1.7"),
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
                name: t("echarts.institutional.1.8"),
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
                name: t("echarts.institutional.1.9"),
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
                name: t("echarts.institutional.1.10"),
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
                name: t("echarts.institutional.1.11"),
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
                name: t("echarts.institutional.1.12"),
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
                name: t("echarts.institutional.1.13"),
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
                name: t("echarts.institutional.1.14"),
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
                name: t("echarts.institutional.1.15"),
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
                name: t("echarts.institutional.1.16"),
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
            name: t("echarts.institutional.2.name"),
            children: [
              {
                name: t("echarts.institutional.2.1"),
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
                name: t("echarts.institutional.2.2"),
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
            name: t("echarts.institutional.3.name"),
            children: [
              {
                name: t("echarts.institutional.3.1"),
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
                name: t("echarts.institutional.3.2"),
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
                name: t("echarts.institutional.3.3"),
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
                name: t("echarts.institutional.3.4"),
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
                name: t("echarts.institutional.3.5"),
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
                name: t("echarts.institutional.3.6"),
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
                name: t("echarts.institutional.3.7"),
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
                name: t("echarts.institutional.3.8"),
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
                name: t("echarts.institutional.3.9"),
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
                name: t("echarts.institutional.3.10"),
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
                name: t("echarts.institutional.3.11"),
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
                name: t("echarts.institutional.3.12"),
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
            name: t("echarts.institutional.4.name"),
            children: [
              {
                name: t("echarts.institutional.4.1"),
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
                name: t("echarts.institutional.4.2"),
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
                name: t("echarts.institutional.4.3"),
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
                name: t("echarts.institutional.4.4"),
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
                name: t("echarts.institutional.4.5"),
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
        name: t("echarts.physical.name"),
        children: [
          {
            name: t("echarts.physical.1.name"),
            children: [
              {
                name: t("echarts.physical.1.1"),
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
                name: t("echarts.physical.1.2"),
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
            name: t("echarts.physical.2.name"),
            children: [
              {
                name: t("echarts.physical.2.1"),
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
                name: t("echarts.physical.2.2"),
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
            name: t("echarts.physical.3.name"),
            children: [
              {
                name: t("echarts.physical.3.1"),
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
                name: t("echarts.physical.3.2"),
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
            name: t("echarts.physical.4.name"),
            children: [
              {
                name: t("echarts.physical.4.1"),
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
            name: t("echarts.physical.5.name"),
            children: [
              {
                name: t("echarts.physical.5.1"),
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
                name: t("echarts.physical.5.2"),
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
                name: t("echarts.physical.5.3"),
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
                name: t("echarts.physical.5.4"),
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
                name: t("echarts.physical.5.5"),
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
                name: t("echarts.physical.5.6"),
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
                name: t("echarts.physical.5.7"),
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
                name: t("echarts.physical.5.8"),
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
            name: t("echarts.physical.6.name"),
            children: [
              {
                name: t("echarts.physical.6.1"),
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
                name: t("echarts.physical.6.2"),
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
                name: t("echarts.physical.6.3"),
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
            name: t("echarts.physical.7.name"),
            children: [
              {
                name: t("echarts.physical.7.1"),
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
                name: t("echarts.physical.7.2"),
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
                name: t("echarts.physical.7.3"),
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
                name: t("echarts.physical.7.4"),
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
                name: t("echarts.physical.7.5"),
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
                name: t("echarts.physical.7.6"),
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
                name: t("echarts.physical.7.7"),
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
                name: t("echarts.physical.7.8"),
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
                name: t("echarts.physical.7.9"),
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
                name: t("echarts.physical.7.10"),
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
            name: t("echarts.physical.8.name"),
            children: [
              {
                name: t("echarts.physical.8.1"),
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
                name: t("echarts.physical.8.2"),
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
                name: t("echarts.physical.8.3"),
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
                name: t("echarts.physical.8.4"),
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
                name: t("echarts.physical.8.5"),
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
                name: t("echarts.physical.8.6"),
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
                name: t("echarts.physical.8.7"),
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
    ]),
  };
  const initialSunburstData = computed(() =>
    sunburstData.children.value.map((level1) => ({
      name: level1.name,
      children: level1.children.map((level2) => ({
        name: level2.name,
        value: 1,
      })),
    })),
  );
  const sunburstDimension = new Set();
  sunburstData.children.value.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      sunburstDimension.add(level2.name);
    });
  });
  const sunburstIndicator = new Set();
  sunburstData.children.value.forEach((level1: any) => {
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
          r: "12%",
          itemStyle: {
            color: "white",
            opacity: 0.4,
          },
        },
        {
          r0: "12%",
          r: "28%",
          label: {
            rotate: "tangential",
          },
        },
        {
          r0: "28%",
          r: "99%",
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
  // Total Sankey Data
  const sankeyData = computed(() => [
    {
      name: t("sidebar.indicatorPanel.radarChart.social"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("sidebar.indicatorPanel.radarChart.economic"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("sidebar.indicatorPanel.radarChart.institutional"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("sidebar.indicatorPanel.radarChart.physical"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("echarts.social.1.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.1.3"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.1.4"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.1.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.2.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.2.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.1.5"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.2.3"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.3"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.4"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.5"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.6"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.7"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.8"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.9"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.10"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.11"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.12"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.13"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.14"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.3.15"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.4.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.4.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.5.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.5.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.5.3"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.5.4"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.6.1"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.social.6.2"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.1.1"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.9"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.10"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.1.3"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.8"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.3"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.11"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.1.2"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.1.4"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.1"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.2"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.4"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.5"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.6"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.7"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.2.12"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.4.1"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.3.1"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.3.3"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.economic.3.2"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.1"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.6"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.7"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.8"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.5"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.2"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.9"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.4"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.5"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "Informal development areas",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.9"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.10"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.11"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.12"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: "FAIR Data sharing to enhance resilience",
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.14"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.15"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.1.16"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.2.1"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.2.2"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.1"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.2"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.3"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.4"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.6"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.7"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.8"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.10"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.11"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.3.12"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.4.1"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.4.2"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.4.3"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.4.4"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.institutional.4.5"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.1.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.2.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.1.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.7"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.2.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.3.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.3.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.4.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.8"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.6.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.3"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.4"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.5"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.6"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.5.7"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.6.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.6.3"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.2"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.3"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.4"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.5"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.6"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.7"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.8"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.9"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.7.10"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.1"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.3"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.4"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.5"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.physical.8.6"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.capacities.Robustness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#1abc9c" },
    },
    {
      name: t("echarts.capacities.Redundancy"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#2ecc71" },
    },
    {
      name: t("echarts.capacities.Inclusiveness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#d35400" },
    },
    {
      name: t("echarts.capacities.Diversity"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#3498db" },
    },
    {
      name: t("echarts.capacities.Flexibility"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#95a5a6" },
    },
    {
      name: t("echarts.capacities.Resourcefulness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#f39c12" },
    },
    {
      name: t("echarts.capacities.Integration"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#9b59b6" },
    },
    {
      name: t("echarts.capacities.Reflectiveness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#e74c3c" },
    },
    {
      name: t("echarts.capacities.Transparency"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#7d6b57" },
    },
  ]);
  const sankeyLinks = computed(() => [
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.2.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.2.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.2.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.2.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.2.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.2.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.1.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.1.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.8.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.8.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.8.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.8.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.7"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.2.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.2.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.1.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.1.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.1.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.1.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.1.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.1.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.3.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.3.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.3.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.3.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.3.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.3.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.3.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.3.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.3.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.3.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.3.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.4.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.4.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.4.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.4.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.4.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.4.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.8"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.8"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.8"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.8"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.6.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.6.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.5.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.3"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.4"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.4"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.5.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.5"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.6"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.5.7"),
      value: 1,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.5.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.6.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.6.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.6.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.6.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.6.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.6.3"),
      value: 1,
    },
    {
      source: t("echarts.physical.6.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.6.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.6.3"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.6.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.6.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.2"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.3"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    // {
    //   source: t("echarts.physical.7.3"),
    //   target: t("echarts.capacities.Transparency"),
    //   value: 1,
    // },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.4"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.4"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.5"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.5"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.6"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.6"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.6"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.7"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.8"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.8"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.8"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.physical.7.8"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },

    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.9"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.9"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.9"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.9"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.7.9"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.7.10"),
      value: 1,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.7.10"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.1"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.8.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.8.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.25,
    },
    {
      source: t("echarts.physical.8.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.3"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.physical.8.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },

    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.4"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.5"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("echarts.physical.8.6"),
      value: 1,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.physical.8.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.6"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.7"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.7"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.8"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.8"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.4.3"),
      value: 1,
    },
    {
      source: t("echarts.institutional.4.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.1"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.2"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.5"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.16"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.16"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.16"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.16"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.16"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.16"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.9"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.9"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.4"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.1.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.5"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: "Informal development areas",
      value: 1,
    },
    {
      source: "Informal development areas",
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },

    {
      source: "Informal development areas",
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: "Informal development areas",
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.9"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.1.9"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.10"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.10"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.10"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.10"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.10"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.10"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },

    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.11"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.11"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.12"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.12"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.12"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.12"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.12"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.1.12"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: "FAIR Data sharing to enhance resilience",
      value: 1,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: "FAIR Data sharing to enhance resilience",
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.14"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.1.14"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.1.15"),
      value: 1,
    },
    {
      source: t("echarts.institutional.1.15"),
      target: t("echarts.capacities.Diversity"),
      value: 0.33,
    },
    {
      source: t("echarts.institutional.1.15"),
      target: t("echarts.capacities.Integration"),
      value: 0.33,
    },
    {
      source: t("echarts.institutional.1.15"),
      target: t("echarts.capacities.Transparency"),
      value: 0.33,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.2.1"),
      value: 1,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.2.2"),
      value: 1,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.2.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },

    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.1"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.2"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.3"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.4"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.3.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.3.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("echarts.institutional.3.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.6"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.7"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.7"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.8"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.3.8"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },

    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.10"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.10"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.11"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.11"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.3.12"),
      value: 1,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.3.12"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.4.1"),
      value: 1,
    },
    {
      source: t("echarts.institutional.4.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.4.2"),
      value: 1,
    },
    {
      source: t("echarts.institutional.4.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.institutional.4.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.4.4"),
      value: 1,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.institutional.4.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("echarts.institutional.4.5"),
      value: 1,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.institutional.4.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.10"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.10"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.10"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.10"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.10"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.1.3"),
      value: 1,
    },
    {
      source: t("echarts.economic.1.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.8"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.8"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.1.1"),
      value: 1,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.1.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.3"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.11"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.11"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.11"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.11"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.11"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.1.2"),
      value: 1,
    },
    {
      source: t("echarts.economic.1.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.1.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.1.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.33,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.1.4"),
      value: 1,
    },
    {
      source: t("echarts.economic.1.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.4"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.4"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.1.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.1"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.2"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.economic.2.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.5"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.5"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.5"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.4"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.6"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.2.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.7"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.2.7"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.9"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.9"),
      target: t("echarts.capacities.Robustness"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.2.9"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.2.9"),
      target: t("echarts.capacities.Transparency"),
      value: 0.33,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.2.12"),
      value: 1,
    },
    {
      source: t("echarts.economic.2.12"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.12"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.12"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.12"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.2.12"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.4.1"),
      value: 1,
    },
    {
      source: t("echarts.economic.4.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.4.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.33,
    },
    {
      source: t("echarts.economic.4.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.33,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.3.1"),
      value: 1,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.economic.3.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.3.2"),
      value: 1,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.economic.3.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("echarts.economic.3.3"),
      value: 1,
    },
    {
      source: t("echarts.economic.3.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.3.3"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.3.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.3.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.economic.3.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.1.1"),
      value: 1,
    },
    {
      source: t("echarts.social.1.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.1.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.1.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.social.1.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.1.3"),
      value: 1,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.1.2"),
      value: 1,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.2.2"),
      value: 1,
    },
    {
      source: t("echarts.social.2.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.1.5"),
      value: 1,
    },
    {
      source: t("echarts.social.1.5"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("echarts.social.1.5"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.social.1.5"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.social.1.5"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.1"),
      value: 1,
    },
    {
      source: t("echarts.social.3.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.2"),
      value: 1,
    },
    {
      source: t("echarts.social.3.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.4"),
      value: 1,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.4"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.7"),
      value: 1,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.7"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.8"),
      value: 1,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.8"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.12"),
      value: 1,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.12"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.6"),
      value: 1,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.6"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.10"),
      value: 1,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.10"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.13"),
      value: 1,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.13"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.1.4"),
      value: 1,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.1.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.9"),
      value: 1,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.9"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.3"),
      value: 1,
    },
    {
      source: t("echarts.social.3.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.3"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.3"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.11"),
      value: 1,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.3.11"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.2.1"),
      value: 1,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.13,
    },
    {
      source: t("echarts.social.2.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.13,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.2.3"),
      value: 1,
    },
    {
      source: t("echarts.social.2.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("echarts.social.2.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.5"),
      value: 1,
    },
    {
      source: t("echarts.social.3.5"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.5"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.5"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.5"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.3.5"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.14"),
      value: 1,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.3.14"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      //Not available in spreadsheet
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.5.2"),
      value: 1,
    },
    {
      //Not available in spreadsheet
      source: t("echarts.social.5.2"),
      target: t("echarts.capacities.Transparency"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.5.3"),
      value: 1,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.3"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.5.4"),
      value: 1,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.5.4"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.6.1"),
      value: 1,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("echarts.social.6.1"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.6.2"),
      value: 1,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("echarts.social.6.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.3.15"),
      value: 1,
    },
    {
      source: t("echarts.social.3.15"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("echarts.social.3.15"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("echarts.social.3.15"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("echarts.social.3.15"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.4.1"),
      value: 1,
    },
    {
      source: t("echarts.social.4.1"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("echarts.social.4.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.4.1"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.4.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.4.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.4.2"),
      value: 1,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Diversity"),
      value: 0.16,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("echarts.social.4.2"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("echarts.social.5.1"),
      value: 1,
    },
    {
      source: t("echarts.social.5.1"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.5.1"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("echarts.social.5.1"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.5.1"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("echarts.social.5.1"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
  ]);
  // Basic Sankey Data
  const basicSankeyData = computed(() => [
    // Social
    {
      name: t("sidebar.indicatorPanel.radarChart.social"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("initialIndicators.social.1.1.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.1.2.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.1.3.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.1.4.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.2.1.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.3.1.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.3.2.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.social.3.3.name"),
      itemStyle: { color: "#91CC75" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // ecomonic
    {
      name: t("sidebar.indicatorPanel.radarChart.economic"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("initialIndicators.economic.1.1.name"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.economic.1.2.name"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.economic.2.1.name"),
      itemStyle: { color: "#FAC858" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // Institutional
    {
      name: t("sidebar.indicatorPanel.radarChart.institutional"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("initialIndicators.institutional.1.1.name"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.institutional.2.1.name"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.institutional.3.1.name"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.institutional.3.2.name"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.institutional.3.3.name"),
      itemStyle: { color: "#EE6666" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    // Physical
    {
      name: t("sidebar.indicatorPanel.radarChart.physical"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL1,
    },
    {
      name: t("initialIndicators.physical.1.1.name"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.physical.1.2.name"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.physical.1.3.name"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.physical.2.1.name"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("initialIndicators.physical.3.1.name"),
      itemStyle: { color: "#73C0DE" },
      depth: SANKEYLEVELS.LEVEL2,
    },
    {
      name: t("echarts.capacities.Robustness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#1abc9c" },
    },
    {
      name: t("echarts.capacities.Redundancy"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#2ecc71" },
    },
    {
      name: t("echarts.capacities.Inclusiveness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#d35400" },
    },
    {
      name: t("echarts.capacities.Diversity"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#3498db" },
    },
    {
      name: t("echarts.capacities.Flexibility"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#95a5a6" },
    },
    {
      name: t("echarts.capacities.Resourcefulness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#f39c12" },
    },
    {
      name: t("echarts.capacities.Integration"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#9b59b6" },
    },
    {
      name: t("echarts.capacities.Reflectiveness"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#e74c3c" },
    },
    {
      name: t("echarts.capacities.Transparency"),
      depth: SANKEYLEVELS.LEVEL3,
      itemStyle: { color: "#7d6b57" },
    },
  ]);
  const basicSankeyLinks = computed(() => [
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("initialIndicators.physical.1.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("initialIndicators.physical.1.2.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("initialIndicators.physical.1.3.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("initialIndicators.physical.2.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.physical"),
      target: t("initialIndicators.physical.3.1.name"),
      value: 1,
    },
    {
      source: t("initialIndicators.physical.1.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.1.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.1.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.1.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.2.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.physical.1.3.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.3.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.3.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.3.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.1.3.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.2.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.2.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.2.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.2.1.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.2.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.physical.3.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.physical.3.1.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.physical.3.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.physical.3.1.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.25,
    },
    // Institutional
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("initialIndicators.institutional.1.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("initialIndicators.institutional.2.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("initialIndicators.institutional.3.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("initialIndicators.institutional.3.2.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.institutional"),
      target: t("initialIndicators.institutional.3.3.name"),
      value: 1,
    },
    {
      source: t("initialIndicators.institutional.1.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.1.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.1.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.1.1.name"),
      target: "c",
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.2.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.2.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.2.1.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.2.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.institutional.3.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.1.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.2.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.2.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.2.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.2.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.2.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.3.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.3.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.3.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.3.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.institutional.3.3.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    // Economic
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("initialIndicators.economic.1.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("initialIndicators.economic.1.2.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.economic"),
      target: t("initialIndicators.economic.2.1.name"),
      value: 1,
    },
    {
      source: t("initialIndicators.economic.1.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.1.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.1.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.2.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.2.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.2.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.1.2.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.14,
    },
    {
      source: t("initialIndicators.economic.2.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.14,
    },
    // Social
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.1.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.1.2.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.1.3.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.1.4.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.2.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.3.1.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.3.2.name"),
      value: 1,
    },
    {
      source: t("sidebar.indicatorPanel.radarChart.social"),
      target: t("initialIndicators.social.3.3.name"),
      value: 1,
    },
    {
      source: t("initialIndicators.social.1.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.1.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.1.1.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.1.1.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.1.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.2.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.3.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.1.4.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.social.1.4.name"),
      target: t("echarts.capacities.Diversity"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.social.1.4.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.social.1.4.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.25,
    },
    {
      source: t("initialIndicators.social.2.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.2.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.2.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.2.1.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.2.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.1.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.1.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.1.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.1.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.1.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.2,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Integration"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.2.name"),
      target: t("echarts.capacities.Transparency"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Robustness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Redundancy"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Resourcefulness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Inclusiveness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Reflectiveness"),
      value: 0.16,
    },
    {
      source: t("initialIndicators.social.3.3.name"),
      target: t("echarts.capacities.Flexibility"),
      value: 0.16,
    },
  ]);
  /* Dictionary Capacity Sankey */
  const capacitySelected = ref("Robustness");
  // Filter by capacity of Sankey Data
  const directLinks = computed(() =>
    sankeyLinks.value.filter(
      (link) => link.target === t("echarts.capacities." + capacitySelected.value),
    ),
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
    sankeyData.value.filter(
      (node) =>
        relevantNodes.value.has(node.name) ||
        node.name === t("sidebar.indicatorPanel.radarChart.social") ||
        node.name == t("sidebar.indicatorPanel.radarChart.economic") ||
        node.name == t("sidebar.indicatorPanel.radarChart.institutional") ||
        node.name == t("sidebar.indicatorPanel.radarChart.physical"),
    ),
  ); // Filter the nodes
  const parentLinks = computed(() =>
    sankeyLinks.value.filter((link) => relevantNodes.value.has(link.target)),
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
