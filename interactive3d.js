
const skills = [
  { name: "Web Design", x: 2, y: 4, z: 5, size: 18, color: "#2575fc" },
  { name: "Creative Media", x: 3, y: 1, z: 6, size: 22, color: "#6a11cb" },
  { name: "AI Tools", x: 6, y: 2, z: 3, size: 20, color: "#a1c4fd" },
  { name: "Visualization", x: 1, y: 3, z: 7, size: 24, color: "#c2e9fb" },
  { name: "GitHub Projects", x: 4, y: 6, z: 2, size: 16, color: "#8ec5fc" },
  { name: "Arduino", x: 5, y: 4, z: 6, size: 20, color: "#b993d6" }
];


const trace = {
  x: skills.map(d => d.x),
  y: skills.map(d => d.y),
  z: skills.map(d => d.z),
  mode: "markers+text",
  type: "scatter3d",
  text: skills.map(d => d.name),
  textposition: "top center",
  marker: {
    size: skills.map(d => d.size),
    color: skills.map(d => d.color),
    opacity: 0.9,
    line: { color: "#fff", width: 1 }
  }
};


const layout = {
  paper_bgcolor: "#f5f7fa",
  plot_bgcolor: "#f5f7fa",
  margin: { l: 0, r: 0, b: 0, t: 0 },
  scene: {
    xaxis: { title: "Creativity", gridcolor: "#ddd" },
    yaxis: { title: "Technical Skill", gridcolor: "#ddd" },
    zaxis: { title: "Experience", gridcolor: "#ddd" },
    camera: {
      eye: { x: 1.5, y: 1.5, z: 1.5 }
    }
  }
};


Plotly.newPlot("chart3D", [trace], layout, {
  responsive: true,
  displayModeBar: false
});