const svg = d3.select("#timeChart");
const width = +svg.attr("width") - 60;
const height = +svg.attr("height") - 60;
const margin = { top: 30, right: 30, bottom: 30, left: 50 };

const chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


const data = [
  { year: 2019, value: 5 },
  { year: 2020, value: 10 },
  { year: 2021, value: 20 },
  { year: 2022, value: 35 },
  { year: 2023, value: 50 },
  { year: 2024, value: 80 },
  { year: 2025, value: 120 }
];


const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.year))
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);

chart.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

chart.append("g")
  .call(d3.axisLeft(y));


const line = d3.line()
  .x(d => x(d.year))
  .y(d => y(d.value))
  .curve(d3.curveMonotoneX);


const path = chart.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "url(#lineGradient)")
  .attr("stroke-width", 3)
  .attr("d", line);


const defs = svg.append("defs");
const gradient = defs.append("linearGradient")
  .attr("id", "lineGradient")
  .attr("x1", "0%").attr("y1", "0%")
  .attr("x2", "100%").attr("y2", "0%");
gradient.append("stop").attr("offset", "0%").attr("stop-color", "#2575fc");
gradient.append("stop").attr("offset", "100%").attr("stop-color", "#6a11cb");


const totalLength = path.node().getTotalLength();

path
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength)
  .transition()
  .duration(5000)  
  .ease(d3.easeLinear)
  .attr("stroke-dashoffset", 0);


chart.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.year))
  .attr("cy", d => y(d.value))
  .attr("r", 5)
  .attr("fill", "#6a11cb")
  .attr("opacity", 0)
  .transition()
  .delay((d, i) => i * 700)
  .attr("opacity", 1);


chart.selectAll("text.value")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "value")
  .attr("x", d => x(d.year))
  .attr("y", d => y(d.value) - 10)
  .attr("text-anchor", "middle")
  .attr("fill", "#333")
  .text(d => d.value)
  .attr("opacity", 0)
  .transition()
  .delay((d, i) => i * 700)