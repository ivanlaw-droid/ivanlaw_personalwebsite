const width = 900, height = 500;

const svg = d3.select("#map");
const projection = d3.geoMercator()
 .scale(140)
 .translate([width / 2, height / 1.4]);

 const path = d3.geoPath().projection(projection);

 