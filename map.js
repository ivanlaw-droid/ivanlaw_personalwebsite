const width = 900, height = 500;

const svg = d3.select("#map");
const projection = d3.geoMercator()
 .scale(140)
 .translate([width / 2, height / 1.4]);

 const path = d3.geoPath().projection(projection);

 const visitedCities = [
  { name: "Hong Kong", coords: [114.1694, 22.3193] },
  { name: "Tokyo", coords: [139.6917, 35.6895] },
  { name: "Seoul", coords: [126.978, 37.5665] },
  { name: "London", coords: [-0.1276, 51.5072] },
  { name: "Paris", coords: [2.3522, 48.8566] },
  { name: "New York", coords: [-74.006, 40.7128] }
];


const visitors = [
  { city: "Hong Kong", coords: [114.1694, 22.3193], count: 220 },
  { city: "Taipei", coords: [121.5654, 25.033], count: 180 },
  { city: "London", coords: [-0.1276, 51.5072], count: 150 },
  { city: "New York", coords: [-74.006, 40.7128], count: 200 },
  { city: "Sydney", coords: [151.2093, -33.8688], count: 100 }
];


d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
  svg.append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#cce5ff")
    .attr("stroke", "#666");

 
  svg.selectAll(".city-dot")
    .data(visitedCities)
    .enter()
    .append("circle")
    .attr("class", "city-dot")
    .attr("r", 4)
    .attr("cx", d => projection(d.coords)[0])
    .attr("cy", d => projection(d.coords)[1])
    .append("title")
    .text(d => Visited: ${d.name});

 
  svg.selectAll(".visitor-symbol")
    .data(visitors)
    .enter()
    .append("circle")
    .attr("class", "visitor-symbol")
    .attr("r", d => Math.sqrt(d.count) / 2) 
    .attr("cx", d => projection(d.coords)[0])
    .attr("cy", d => projection(d.coords)[1])
    .append("title")
    .text(d => ${d.city}: ${d.count} visitors);
});