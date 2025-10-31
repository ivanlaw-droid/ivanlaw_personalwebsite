// === Activity 1: Define Graph Dataset ===
const graph = {
  nodes: [
    { id: "Ivan", group: "self" },
    { id: "Web Design", group: "skill" },
    { id: "JavaScript", group: "skill" },
    { id: "AI Tools", group: "interest" },
    { id: "GitHub", group: "platform" },
    { id: "Creative Media", group: "study" },
    { id: "Visualization", group: "project" }
  ],
  links: [
    { source: "Ivan", target: "Web Design" },
    { source: "Ivan", target: "JavaScript" },
    { source: "Ivan", target: "AI Tools" },
    { source: "Ivan", target: "Creative Media" },
    { source: "Web Design", target: "Visualization" },
    { source: "JavaScript", target: "Visualization" },
    { source: "AI Tools", target: "GitHub" },
    { source: "Creative Media", target: "GitHub" }
  ]
};

// === Activity 2: Force-Directed Layout ===
const svg = d3.select("#networkGraph");
const width = +svg.attr("width");
const height = +svg.attr("height");

const color = d3.scaleOrdinal()
  .domain(["self", "skill", "interest", "platform", "study", "project"])
  .range(["#ff6347", "#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"]);

const simulation = d3.forceSimulation(graph.nodes)
  .force("link", d3.forceLink(graph.links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .attr("stroke", "#aaa")
  .attr("stroke-width", 2)
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
  .attr("class", "link");

const node = svg.append("g")
  .selectAll("circle")
  .data(graph.nodes)
  .enter().append("circle")
  .attr("r", 15)
  .attr("fill", d => color(d.group))
  .attr("class", "node")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

const label = svg.append("g")
  .selectAll("text")
  .data(graph.nodes)
  .enter().append("text")
  .text(d => d.id)
  .attr("x", 6)
  .attr("y", 3)
  .style("font-size", "12px");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x + 10)
    .attr("y", d => d.y + 5);
});

function dragstarted(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

// === Activity 3: Adjacency Matrix ===
const nodes = graph.nodes.map(d => d.id);
const matrix = [];

nodes.forEach((row, i) => {
  matrix[i] = [];
  nodes.forEach((col, j) => {
    matrix[i][j] = graph.links.some(l =>
      (l.source.id === row && l.target.id === col) ||
      (l.source.id === col && l.target.id === row)
    ) ? 1 : 0;
  });
});

const table = d3.select("#matrix").append("table");
const header = table.append("tr");
header.append("th").text("");
nodes.forEach(n => header.append("th").text(n));

matrix.forEach((row, i) => {
  const tr = table.append("tr");
  tr.append("th").text(nodes[i]);
  row.forEach(val => tr.append("td").text(val));
});
