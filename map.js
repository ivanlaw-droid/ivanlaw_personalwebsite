

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
  { name: "Tokyo",    country: "Japan",   lat: 35.6762, lon: 139.6503, type: "travel" },
  { name: "Kyoto",    country: "Japan",   lat: 35.0116, lon: 135.7681, type: "travel" },
  { name: "Seoul",    country: "Korea",   lat: 37.5665, lon: 126.9780, type: "travel" },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517,   type: "travel" },
  { name: "Paris",    country: "France",  lat: 48.8566, lon: 2.3522,   type: "dream" },
  { name: "Reykjavík",country: "Iceland", lat: 64.1466, lon: -21.9426, type: "dream" }
];

const typeColor = {
  home:   "#c45b5b",
  travel: "#3485e2",
  dream:  "#f5b940"
};


const worldGeoJSON =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

d3.json(worldGeoJSON)
  .then(world => {
   
    svg.append("g")
      .selectAll("path")
      .data(world.features)
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

    const points = pointGroup.selectAll("circle.city")
      .data(places)
      .join("circle")
      .attr("class", "city")
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
  })
  .catch(err => {
    console.error("Error loading world GeoJSON:", err);
  });

 

.map-extra {
  margin-top: 32px;
}

.map-extra-inner {
  max-width: 1100px;
  margin: 0 auto;
}


.map-feature {
  background: #fffaf6;
  border-radius: 20px;
  padding: 22px 22px 24px;
  border: 1px solid rgba(228, 215, 198, 0.9);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.9fr);
  gap: 20px;
  align-items: center;
  margin-bottom: 24px;
}

.map-feature-title {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  margin: 0 0 6px;
  color: #1f2933;
}

.map-feature-sub {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 10px;
}

.map-feature-copy {
  font-size: 14px;
  line-height: 1.8;
  color: #444;
  margin: 0 0 8px;
}

.map-feature-photo img {
  width: 100%;
  display: block;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
}

.map-city-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 10px;
}

.city-card {
  background: rgba(255, 250, 246, 0.9);
  border-radius: 16px;
  padding: 14px 14px 16px;
  border: 1px solid rgba(228, 215, 198, 0.9);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
}

.city-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #1f2933;
}

.city-tagline {
  font-size: 12px;
  color: #9a8f82;
  margin: 0 0 8px;
}

.city-body {
  font-size: 13px;
  line-height: 1.7;
  color: #444;
  margin: 0;
}

.city-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.chip {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(231, 192, 167, 0.16);
  border: 1px solid rgba(231, 192, 167, 0.8);
  color: #7a5a4a;
}


@media (max-width: 900px) {
  .map-feature {
    grid-template-columns: 1fr;
  }
  .map-city-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .map-city-grid {
    grid-template-columns: 1fr;
  }
}