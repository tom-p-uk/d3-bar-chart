

const renderBarChart = data => {


  console.log(data);
  const width = 900;
  const height = 500;
  const padding = 20;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  let barWidth = width / data.length;
  barWidthPadding = barWidth * 0.5;
  barWidth = barWidth - barWidthPadding;

  const dataMax = d3.max(data, (d) => d[1]);

  const svg = d3.select('.container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const xScale = d3.scaleBand()
    .domain(data.map((d) => d[0]))
    .range([margin.left, width - margin.right])
    .paddingInner(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, dataMax])
    .range([margin.bottom, height - margin.top])


  const bars = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', (d) => yScale(d[1]) - margin.bottom)
    .attr('x', (d, i) => xScale(d[0]))
    .attr('y', (d) => height - yScale(d[1]))
    .attr('fill', 'blue')
    .attr('width', barWidth)

};

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (data) => renderBarChart(data.data));
const data = [[146, 'a'], [255, 'b'], [440, 'c'], [95, 'd'], [74, 'e']];
// renderBarChart(data);
