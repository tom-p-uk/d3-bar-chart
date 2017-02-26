

const renderBarChart = data => {

  console.log(typeof data[0][0])


  function parseAndFormat(date) {
    const parsed = d3.timeParse('%Y-%m-%d')(date)
    return formatted = d3.timeFormat('%Y')(parsed);
  }

  const width = 1000;
  const height = 500;
  const padding = 20;
  const margin = { top: 40, right: 20, bottom: 80, left: 80 };

  let barWidth = width / data.length;
  const barWidthPadding = barWidth * 0.5;
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
    .range([height - margin.bottom, margin.top])

  const tooltip = d3.select('body').append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('opacity', 0)


    // .attr('transform', `translate(${xLabelPosition}, ${height - (margin.bottom / 1.5)})`)

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
    .attr('data-gbp', (d) => d[1])
    .on('mouseover', (d) => {
      tooltip
      .style('left', `${xScale(d[0]) - (margin.left / 2)}px`)
      .style('top', `${yScale(d[1]) - margin.bottom}px`)
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

  const tickValues = xScale.domain().filter((d, i) => !(i % 20));
  const mapped = tickValues.map((d) => parseAndFormat(d));
  console.log(mapped);

  const xAxis = d3.axisBottom(xScale)
    .tickValues(tickValues)

  const yAxis = d3.axisLeft(yScale);
  const yLabelPosition = height / 2 - margin.bottom;
  const xLabelPosition = width / 2 + margin.left;

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('id', 'y-axis')

  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('dx', '-7.5em')
    .attr('dy', '1.5em')
    .text('GDP (USD Billions)')
    .attr('x', `${-yLabelPosition}`)

  svg.append('text')
    .attr('dx', '-7.5em')
    .attr('dy', '1.5em')
    .text('Financial Quarter')
    // .attr('x', `${xLabelPosition}`)
    // .attr('y', ``)
    .attr('transform', `translate(${xLabelPosition}, ${height - (margin.bottom / 1.5)})`)

};

$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', (res) => renderBarChart(res.data));
