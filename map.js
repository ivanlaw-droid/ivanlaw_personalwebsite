

const width = 620;
const height = 380;


const svg = d3
  .select("#map")
  .attr("viewBox", "0 0 " + width + " " + height)
  .attr("preserveAspectRatio", "xMidYMid meet");


const projection = d3.geoMercator()
  .scale(100)
  .translate([width / 2, height / 1.4]);

const path = d3.geoPath().projection(projection);


const places = [
  { name: "Hong Kong",  country: "Hong Kong", lat: 22.3193, lon: 114.1694, type: "home"  },
  { name: "Seoul",      country: "Korea",     lat: 37.5665, lon: 126.9780, type: "travel"},
  { name: "Tokyo",      country: "Japan",     lat: 35.6762, lon: 139.6503, type: "travel"},
  { name: "Kyoto",      country: "Japan",     lat: 35.0116, lon: 135.7681, type: "travel"},
  { name: "Brussels",   country: "Belgium",   lat: 50.8503, lon: 4.3517,   type: "travel"},
  { name: "Paris",      country: "France",    lat: 48.8566, lon: 2.3522,   type: "dream" },
  { name: "Reykjavík",  country: "Iceland",   lat: 64.1466, lon: -21.9426, type: "dream" }
];

const typeColor = {
  home:   "#c45b5b",
  travel: "#3485e2",
  dream:  "#f5b940"
};


const worldGeoJSON =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

d3.json(worldGeoJSON)
  .then(function (world) {
    const countries = world.features;

    
    svg.append("g")
      .selectAll("path")
      .data(countries)
      .enter()
      .append("path")
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

  
    const home = places.find(function (d) { return d.type === "home"; });

    const routesGroup = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

    routesGroup.selectAll("path")
      .data(places.filter(function (d) { return d.type !== "home"; }))
      .enter()
      .append("path")
      .attr("d", function (d) {
        return path({
          type: "LineString",
          coordinates: [
            [home.lon, home.lat],
            [d.lon, d.lat]
          ]
        });
      })
      .attr("stroke", "rgba(148,163,184,0.75)")
      .attr("stroke-width", 1.4)
      .attr("stroke-dasharray", "4 6")
      .attr("opacity", 0)
      .transition()
      .delay(function (d, i) { return 300 + i * 150; })
      .duration(700)
      .attr("opacity", 1);

    
    const pointGroup = svg.append("g");

    const points = pointGroup.selectAll("circle.city")
      .data(places)
      .enter()
      .append("circle")
      .attr("class", "city")
      .attr("cx", function (d) { return projection([d.lon, d.lat])[0]; })
      .attr("cy", function (d) { return projection([d.lon, d.lat])[1]; })
      .attr("r", 0)
      .attr("fill", function (d) { return typeColor[d.type]; })
      .attr("stroke", "white")
      .attr("stroke-width", 1.2)
      .attr("opacity", 0.96);

  
    points.transition()
      .delay(function (d, i) { return 200 + i * 120; })
      .duration(600)
      .attr("r", 5);

   
    points.append("title")
      .text(function (d) { return d.name + ", " + d.country; });

    
    const homePos = projection([home.lon, home.lat]);

    const pulseCircle = pointGroup.append("circle")
      .attr("cx", homePos[0])
      .attr("cy", homePos[1])
      .attr("r", 8)
      .attr("fill", "none")
      .attr("stroke", "rgba(196,91,91,0.55)")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);

    function pulse() {
      pulseCircle
        .attr("r", 8)
        .attr("opacity", 0.8)
        .transition()
        .duration(1200)
        .attr("r", 20)
        .attr("opacity", 0)
        .on("end", pulse);
    }
    pulse();
  })
  .catch(function (err) {
    console.error("Error loading world GeoJSON:", err);
  });