const width = 500;
const height = 500;

const dataSet = [10, 4, 7, 3];

const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height);

  svg.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect');
