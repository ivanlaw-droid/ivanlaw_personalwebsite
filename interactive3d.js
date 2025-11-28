// interactive3d.js — 3D skills map for Ivan Law

const skills = [
  { name: "Web Design",       x: 2, y: 4, z: 5, size: 18, color: "#2563eb" },
  { name: "Creative Media",   x: 3, y: 1, z: 6, size: 22, color: "#7c3aed" },
  { name: "AI Tools",         x: 6, y: 2, z: 3, size: 20, color: "#0ea5e9" },
  { name: "Visualization",    x: 1, y: 3, z: 7, size: 24, color: "#22c55e" },
  { name: "GitHub Projects",  x: 4, y: 6, z: 2, size: 16, color: "#f97316" },
  { name: "Arduino / Making", x: 5, y: 4, z: 6, size: 20, color: "#e11d48" }
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
    opacity: 0.9
  },
  hovertemplate:
    "<b>%{text}</b><br>" +
    "Creativity: %{x}<br>" +
    "Technical skill: %{y}<br>" +
    "Experience: %{z}<extra></extra>"
};

const layout = {
  margin: { l: 0, r: 0, t: 0, b: 0 },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  scene: {
    xaxis: { title: "Creativity", gridcolor: "#d1d5db", zerolinecolor: "#e5e7eb" },
    yaxis: { title: "Technical skill", gridcolor: "#d1d5db", zerolinecolor: "#e5e7eb" },
    zaxis: { title: "Experience", gridcolor: "#d1d5db", zerolinecolor: "#e5e7eb" },
    camera: {
      eye: { x: 1.6, y: 1.4, z: 1.5 }
    }
  }
};

