import type { Ref } from "vue";
export function getIsochroneColor(minute: number) {
  switch (minute) {
    case 1:
      return "#005a32";
    case 2:
      return "#238b45";
    case 3:
      return "#41ab5d";
    case 4:
      return "#74c476";
    case 5:
      return "#82E0AA";
    default:
      alert(
        "This Isochrone map has invalid range! The range should be a Name within 1-5 min.",
      );
  }
}

export async function loadData(
  cityValue: string | null | undefined,
  shelters: Ref<any>,
  boundary: Ref<any>,
  isochrones: Ref<any>,
) {
  const [sheltersData, boundaryData, isochronesData] = await Promise.all([
    import(`@/assets/data/${cityValue}_Shelters.geojson?raw`),
    import(`@/assets/data/${cityValue}_Boundary.geojson?raw`),
    import(`@/assets/data/${cityValue}_Isochrone_Geoapify.geojson?raw`),
  ]);

  shelters.value = JSON.parse(sheltersData.default);
  boundary.value = JSON.parse(boundaryData.default);
  isochrones.value = JSON.parse(isochronesData.default);
  isochrones.value.features.sort(
    (a: any, b: any) => b.properties.range - a.properties.range,
  );
}

const highlightStyle: any = {
  borderColor: "#5d5d5d",
  shadowBlur: 10,
  shadowColor: "rgba(0, 0, 0, 5)",
};
const normalStyle: any = {
  borderColor: "white",
  shadowBlur: 0,
  shadowColor: "white",
};
export function updateHighlightedNodes(
  data: any[],
  highlightedNodes: Set<string>,
): any {
  return data.map((node) => {
    if (node.children) {
      if (highlightedNodes.has(node.name)) {
        return {
          ...node,
          children: updateHighlightedNodes(node.children, highlightedNodes),
          itemStyle: highlightStyle,
        };
      } else if (node.name) {
        return {
          ...node,
          children: updateHighlightedNodes(node.children, highlightedNodes),
          itemStyle: normalStyle,
        };
      } else
        return {
          ...node,
          children: updateHighlightedNodes(node.children, highlightedNodes),
          itemStyle: node.itemStyle,
        };
    } else if (highlightedNodes.has(node.name)) {
      return { ...node, itemStyle: highlightStyle };
    } else return { ...node, itemStyle: normalStyle };
  });
}
