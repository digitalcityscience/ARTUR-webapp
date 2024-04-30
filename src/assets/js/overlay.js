export function getIsochroneColor(minute) {
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
        "This Isochrone map has invalid range! The range should be a value within 1-5 min.",
      );
  }
}
