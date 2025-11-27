

const width = 620;
const height = 380;


const svg = d3
  .select("#map")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");


const projection = d3.geoMercator()
  .scale(100)
  .translate([width / 2, height / 1.4]);

const path = d3.geoPath().projection(projection);


const places = [
  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lon: 114.1694, type: "home" },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, type: "travel" },
  { name: "Kyoto", country: "Japan", lat: 35.0116, lon: 135.7681, type: "travel" },
  { name: "Seoul", country: "Korea", lat: 37.5665, lon: 126.9780, type: "travel" },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517, type: "travel" },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, type: "dream" },
  { name: "Reykjavík", country: "Iceland", lat: 64.1466, lon: -21.9426, type: "dream" }
];


const typeColor = {
  home: "#c45b5b",
  travel: "#3485e2",
  dream: "#f5b940"
};


const worldURL = "https://unpkg.com/world-atlas@2/countries-110m.json";

d3.json(worldURL).then(worldData => {
  const countries = topojson.feature(worldData, worldData.objects.countries).features;

  
  svg.append("g")
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("d", path)
    .attr("fill", "#f8efe5")
    .attr("stroke", "#d1bfae")
    .attr("stroke-width", 0.5);

  
  const graticule = d3.geoGraticule();
  svg.append("path")
    .datum(graticule())
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "rgba(148, 163, 184, 0.35)")
    .attr("stroke-width", 0.4);

  
  const pointGroup = svg.append("g");

  const points = pointGroup.selectAll("circle")
    .data(places)
    .join("circle")
    .attr("cx", d => projection([d.lon, d.lat])[0])
    .attr("cy", d => projection([d.lon, d.lat])[1])
    .attr("r", 0) 
    .attr("fill", d => typeColor[d.type])
    .attr("stroke", "white")
    .attr("stroke-width", 1.2)
    .attr("opacity", 0.96);

  
  points.transition()
    .delay((d, i) => 200 + i * 120)
    .duration(600)
    .attr("r", 5);

  
  points.append("title")
    .text(d => `${d.name}, ${d.country}`);

  
  pointGroup.selectAll("circle.home-ring")
    .data(places.filter(d => d.type === "home"))
    .join("circle")
    .attr("class", "home-ring")
    .attr("cx", d => projection([d.lon, d.lat])[0])
    .attr("cy", d => projection([d.lon, d.lat])[1])
    .attr("r", 9)
    .attr("fill", "none")
    .attr("stroke", "rgba(196,91,91,0.45)")
    .attr("stroke-width", 2);
}).catch(err => {
  console.error("Error loading world map data:", err);
});