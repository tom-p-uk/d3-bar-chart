

const renderBarChart = data => {

  const width = 500;
  const height = 500;
  const padding = 20;
  const barWidth = 50;

  // const data = [[146, 'a'], [255, 'a'], [440, 'a'], [95, 'a'], [74, 'a']];


  const xMin = 0;
  const xMax = d3.max(data, (d) => d.length * barWidth);
  const yMin = d3.min(data, (d) => d[0]);
  const yMax = d3.max(data, (d) => d[0]);

  const xScale = d3.scaleLinear()
                   .domain([0, data.length])
                   .range([padding, width - padding]);

  // const xScale = d3.scaleLinear()
  //                 .domain([0, xMax])
  //                 .scale([padding, width - padding]);

  // const yScale = d3.scaleLinear()
  //                 .domain([0, yMax])
  //                 .scale([height - padding, padding])

  const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, (d) => d[0])])
                  .range([height - padding, padding]);

  const svg = d3.select('.container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'gray')

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('width', 45)
    .attr('height', (d) => d[0])
    .attr('padding', 10)
    .attr('fill', 'navy')
    .attr('x', (d, i) => xScale(i))
    .attr('y', (d) => yScale(d[0]))
    .attr('data-date', (d) => '1')
    .attr('data-gdp', (d) => '2')

  // svg.selectAll('text')
  //   .data(dataSet)
  //   .append('text')
  //   .attr('x',)

};

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (data) => console.log(data));
const data = [[146, 'a'], [255, 'a'], [440, 'a'], [95, 'a'], [74, 'a']];
renderBarChart(data);
