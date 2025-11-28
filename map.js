// map.js — Travel map for Ivan Law
// 動畫流程：
// 1. 畫世界地圖
// 2. 城市點一粒粒彈出
// 3. 再由香港慢慢畫出連接各城市的虛線
// 4. 香港外面有呼吸圈

const width = 900;
const height = 500;

// 1. 取得 SVG
const svg = d3
  .select("#map")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", "0 0 " + width + " " + height)
  .attr("preserveAspectRatio", "xMidYMid meet");

// 2. Mercator 投影
const projection = d3.geoMercator()
  .scale(140)
  .translate([width / 2, height / 1.4]);

const path = d3.geoPath().projection(projection);

// 3. 城市資料
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

// 4. 世界地圖 GeoJSON
const worldGeoJSON =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

d3.json(worldGeoJSON)
  .then(function (world) {
    const countries = world.features;

    // 4a. 畫國家
    svg.append("g")
      .selectAll("path")
      .data(countries)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#f8efe5")
      .attr("stroke", "#d1bfae")
      .attr("stroke-width", 0.5);

    // 4b. 經緯線（背景格線）
    const graticule = d3.geoGraticule();
    svg.append("path")
      .datum(graticule())
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "rgba(148, 163, 184, 0.35)")
      .attr("stroke-width", 0.4);

    // 4c. 預先建立 routes（起初完全看不到）
    const home = places.find(function (d) { return d.type === "home"; });

    const routesGroup = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

    const routes = routesGroup.selectAll("path.route")
      .data(places.filter(function (d) { return d.type !== "home"; }))
      .enter()
      .append("path")
      .attr("class", "route")
      .attr("d", function (d) {
        return path({
          type: "LineString",
          coordinates: [
            [home.lon, home.lat],
            [d.lon, d.lat]
          ]
        });
      })
      .attr("stroke", "rgba(148,163,184,0.8)")
      .attr("stroke-width", 1.4)
      .attr("stroke-opacity", 0);  // ← 一開始完全透明

    // 設定 dasharray / dashoffset，令線可以由零慢慢畫出
    routes.each(function () {
      const length = this.getTotalLength();
      d3.select(this)
        .attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length);   // 收起在線段起點
    });

    // 4d. 城市點
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

    // 點的進場動畫（依次彈出）
    const pointTransition = points.transition()
      .delay(function (d, i) { return 200 + i * 120; })
      .duration(600)
      .attr("r", 5);

    // 所有點彈出完，再開始畫線動畫
    pointTransition.on("end", function (_, i, nodes) {
      if (i === nodes.length - 1) {
        animateRoutes();
      }
    });

    function animateRoutes() {
      routes.each(function (d, i) {
        const length = this.getTotalLength();
        d3.select(this)
          .transition()
          .delay(400 + i * 700)   // 線與線之間錯開開始
          .duration(2800)         // 由頭畫到尾的時間，愈大愈慢
          .ease(d3.easeCubicOut)
          .attr("stroke-opacity", 1)   // 由完全透明變成可見
          .attr("stroke-dashoffset", 0);
      });
    }

    // hover 提示
    points.append("title")
      .text(function (d) { return d.name + ", " + d.country; });

    // 4e. 香港「呼吸」外圈
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