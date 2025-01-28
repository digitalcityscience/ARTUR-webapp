import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, ref, type ComputedRef } from "vue";
import i18nData from "@/locales/en.json";
enum SANKEYLEVELS {
  LEVEL1 = 0,
  LEVEL2 = 0.5,
  LEVEL3 = 1.9,
}
type DimensionKey = "social" | "physical" | "economic" | "institutional";
type CapacityKey =
  | "Robustness"
  | "Redundancy"
  | "Inclusiveness"
  | "Diversity"
  | "Flexibility"
  | "Resourcefulness"
  | "Integration"
  | "Reflectiveness"
  | "Transparency";
type ParentKey = "echarts" | "initialIndicators";
interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
}
interface SankeyNode {
  name: string;
  itemStyle: { color: string };
  depth: number;
}
interface SankeyLink {
  source: string;
  target: string;
  value: number;
}
interface ChartData {
  sunburstData: SunburstNode[];
  sankeyNodes: SankeyNode[];
  sankeyLinks: SankeyLink[];
}
// Color mapping
const DIMENSION_COLORS: Record<DimensionKey, string> = {
  social: "#91CC75",
  economic: "#FAC858",
  institutional: "#EE6666",
  physical: "#73C0DE",
};
const CAPACITY_COLORS: Record<CapacityKey, string> = {
  Robustness: "#1abc9c",
  Redundancy: "#2ecc71",
  Diversity: "#3498db",
  Integration: "#9b59b6",
  Transparency: "#7d6b57",
  Resourcefulness: "#f39c12",
  Inclusiveness: "#d35400",
  Reflectiveness: "#e74c3c",
  Flexibility: "#95a5a6",
};
function createChartData(
  t: (key: string) => string,
  parentKey: ParentKey,
  i18nData: any,
): ComputedRef<ChartData> {
  return computed(() => {
    const sankeyNodes: SankeyNode[] = [];
    const sankeyLinks: SankeyLink[] = [];
    const sunburstData = transformDimensions(
      t,
      parentKey,
      i18nData,
      sankeyNodes,
      sankeyLinks,
    );
    return {
      sunburstData,
      sankeyNodes,
      sankeyLinks,
    };
  });
}
function transformDimensions(
  t: (key: string) => string,
  parentKey: ParentKey,
  data: any,
  sankeyNodes: SankeyNode[],
  sankeyLinks: SankeyLink[],
): SunburstNode[] {
  const dimensions: DimensionKey[] = ["social", "economic", "institutional", "physical"];
  const capacities: CapacityKey[] = [
    "Robustness",
    "Redundancy",
    "Inclusiveness",
    "Diversity",
    "Flexibility",
    "Resourcefulness",
    "Integration",
    "Reflectiveness",
    "Transparency",
  ];
  // Add dimension level nodes to sankey
  dimensions.forEach((dimension) => {
    sankeyNodes.push({
      name: t(`sidebar.indicatorPanel.radarChart.${dimension}`),
      itemStyle: { color: DIMENSION_COLORS[dimension] },
      depth: SANKEYLEVELS.LEVEL1,
    });
  });
  capacities.forEach((capacity) => {
    sankeyNodes.push({
      name: t(`echarts.capacities.${capacity}`),
      itemStyle: { color: CAPACITY_COLORS[capacity] },
      depth: SANKEYLEVELS.LEVEL3,
    });
  });
  return dimensions.map((dimension) => ({
    name: t(`${parentKey}.${dimension}.name`),
    children: transformCategories(
      t,
      parentKey,
      data[dimension],
      dimension,
      sankeyNodes,
      sankeyLinks,
      capacities,
    ),
  }));
}
function transformCategories(
  t: (key: string) => string,
  parentKey: ParentKey,
  dimensionData: any,
  dimension: DimensionKey,
  sankeyNodes: SankeyNode[],
  sankeyLinks: SankeyLink[],
  capacities: CapacityKey[],
): SunburstNode[] {
  if (!dimensionData) return [];

  return Object.keys(dimensionData)
    .filter((key) => !isNaN(Number(key)))
    .map((categoryNum) => ({
      name: t(`${parentKey}.${dimension}.${categoryNum}.name`),
      children: transformIndicators(
        t,
        parentKey,
        dimensionData[categoryNum],
        dimension,
        categoryNum,
        sankeyNodes,
        sankeyLinks,
        capacities,
      ),
    }));
}
function transformIndicators(
  t: (key: string) => string,
  parentKey: ParentKey,
  categoryData: any,
  dimension: DimensionKey,
  categoryNum: string,
  sankeyNodes: SankeyNode[],
  sankeyLinks: SankeyLink[],
  capacities: CapacityKey[],
): SunburstNode[] {
  if (!categoryData) return [];

  return Object.keys(categoryData)
    .filter((key) => !isNaN(Number(key)))
    .map((indicatorNum) => {
      const key = `${parentKey}.${dimension}.${categoryNum}.${indicatorNum}.name`;
      const textWidth = 70;
      const text = t(key);
      const ratio = text.length / textWidth;
      // Add indicator level node to sankey
      sankeyNodes.push({
        name: text,
        itemStyle: { color: DIMENSION_COLORS[dimension] },
        depth: SANKEYLEVELS.LEVEL2,
      });
      sankeyLinks.push({
        source: t(`sidebar.indicatorPanel.radarChart.${dimension}`),
        target: text,
        value: 1,
      });
      // Add indicator -> capacity links based on capacities array
      const indicatorData = categoryData[indicatorNum];
      if (indicatorData && indicatorData.capacities) {
        // Calculate total number of valid capacities (sum of 1s)
        const validCapacitiesCount = indicatorData.capacities.reduce(
          (sum: number, current: number) => sum + current,
          0,
        );
        // Floor to nearest 0.05 by multiplying by 20, flooring, then dividing by 20
        const linkValue = Math.floor((1 / validCapacitiesCount) * 20) / 20;
        // Create links for each valid capacity
        indicatorData.capacities.forEach((hasLink: number, index: number) => {
          if (hasLink === 1) {
            sankeyLinks.push({
              source: text,
              target: t(`echarts.capacities.${capacities[index]}`),
              value: linkValue,
            });
          }
        });
      } else console.log("ERROR: NO capacity in ", indicatorData);
      return {
        name: text,
        value: ratio < 1 ? 1 : Number(ratio.toFixed(1)),
      };
    });
}

const useIndicatorChartStore = defineStore("echarts-options", () => {
  const { t } = useI18n();
  const chartData = createChartData(t, "echarts", i18nData.echarts);
  // Access sunburst
  const sunburstData = computed(() => chartData.value.sunburstData);
  // Total Sunburst Data
  const initialSunburstData = computed(() =>
    sunburstData.value.map((level1) => ({
      name: level1.name,
      children: level1.children?.map((level2) => ({
        name: level2.name,
        value: 1,
      })),
    })),
  );
  const sunburstDimension = new Set();
  sunburstData.value.forEach((level1: any) => {
    level1.children.forEach((level2: any) => {
      sunburstDimension.add(level2.name);
    });
  });
  const sunburstIndicator = new Set();
  sunburstData.value.forEach((level1: any) => {
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
  const sunburstOptionLevel0 = {
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
          r: 420,
          label: {
            align: "center",
            width: 300,
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
  let sunburstOptionLevel1 = {
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
          itemStyle: { opacity: 0.9 },
        },
        {
          r0: 170,
          r: 410,
          label: {
            align: "center",
            width: 230,
            padding: 0,
            silent: false,
          },
          itemStyle: { opacity: 0.7 },
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
  let sunburstOptionLevel2 = {
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
          r: 200,
          label: { rotate: "tangential" },
        },
        {
          r0: 200,
          r: 380,
          label: {
            align: "center",
            width: 160,
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
  // Basic Sunburst Data
  const basicChartData = createChartData(
    t,
    "initialIndicators",
    i18nData.initialIndicators,
  );
  const basicSunburstData = computed(() => basicChartData.value.sunburstData);
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
      data: basicSunburstData,
      sort: undefined,
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
          r: 210,
          label: {
            align: "center",
            width: 130,
          },
        },
        {
          r0: 210,
          r: 425,
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
    color: ["#91CC75", "#FAC858", "#EE6666", "#73C0DE"],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  // Total Sankey Data
  const sankeyData = computed(() => chartData.value.sankeyNodes);
  const sankeyLinks = computed(() => chartData.value.sankeyLinks);
  // Basic Sankey Data
  const basicSankeyData = computed(() => basicChartData.value.sankeyNodes);
  const basicSankeyLinks = computed(() => basicChartData.value.sankeyLinks);
  console.log(basicChartData.value.sankeyLinks);
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
    sunburstOptionLevel0,
    sunburstOptionLevel1,
    sunburstOptionLevel2,
    capacitySelected,
    sankeyOption,
    sankeyBasicOption,
    sankeyOptionCapacity,
  };
});
export default useIndicatorChartStore;
