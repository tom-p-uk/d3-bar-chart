

const renderBarChart = data => {

  // set up svg and bar dimensions/margins
  const width = 1000;
  const height = 500;
  const padding = 20;
  const margin = { top: 40, right: 20, bottom: 80, left: 80 };

  let barWidth = width / data.length;
  const barWidthPadding = barWidth * 0.5;
  barWidth = barWidth - barWidthPadding;

  // append svg to DOM
  const svg = d3.select('.svg-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

  // set up x and y scales
  const dataMax = d3.max(data, (d) => d[1]);

  const xScale = d3.scaleBand()
    .domain(data.map((d) => d[0]))
    .range([margin.left, width - margin.right])
    .paddingInner(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, dataMax])
    .range([height - margin.bottom, margin.top])

  // append tooltip div to body
  const tooltip = d3.select('body').append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('opacity', 0)

  // dynamically set up rect for each data point
  const bars = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('height', (d) => height - margin.bottom - yScale(d[1]))
    .attr('x', (d, i) => xScale(d[0]))
    .attr('y', (d) => yScale(d[1]))
    .attr('fill', 'blue')
    .attr('width', barWidth)
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .on('mouseover', (d) => {
      // show tooltip when user hovers over bar and dynamically allocate attributes
      tooltip
      .attr('data-date', d[0])
      .style('left', `${xScale(d[0]) + 80}px`)
      .style('top', `${yScale(d[1]) + 70}px`)
      .html(`<span class="title">Quarter:</span> ${d[0]} <br> <span class="title">GDP:</span> $${d[1]} bn`)
      .transition()
      .duration(200)
      .style('opacity', .9)
    })
    .on("mouseout", (d) => {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0)
    })

  // filter data to space out x axis tick points - 1 per data point is too many
  const tickValues = xScale.domain().filter((d, i) => !(i % 20));

  // set up x and y axes
  const xAxis = d3.axisBottom(xScale)
    .tickValues(tickValues)

  const yAxis = d3.axisLeft(yScale);

  // calculate x and y positions for axis labels
  const xLabelPosition = width / 2 + margin.left;
  const yLabelPosition = height / 2 - margin.bottom;

  // append axes to svg
  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('id', 'y-axis')

  // append labels to svg
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('dx', '-7.5em')
    .attr('dy', '1.5em')
    .text('GDP (Billion USD)')
    .attr('x', `${-yLabelPosition}`)

  svg.append('text')
    .attr('dx', '-7.5em')
    .attr('dy', '1.5em')
    .text('Financial Quarter')
    .attr('transform', `translate(${xLabelPosition}, ${height - (margin.bottom / 1.5)})`)

  // function for parsing and formatting dates in data - didn't use in the end
  function parseAndFormat(date) {
    const parsed = d3.timeParse('%Y-%m-%d')(date)
    return formatted = d3.timeFormat('%Y')(parsed);
  }

};

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (res) => renderBarChart(res.data));
