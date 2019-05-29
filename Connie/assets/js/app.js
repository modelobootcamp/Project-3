// @TODO: YOUR CODE HERE!
// margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
};

// svg container
var svgHeight = 500;
var svgWidth = 800;

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create the svg container into the index.html
var svg = d3.select('#scatter').append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

// move everything over based on the margin
var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


// read CSV file
d3.csv('./assets/data/googleplaystore2.csv').then(function (csvdata) {
    console.log(csvdata);

    var appCostinfo = csvdata.data.Type

    var appCostCode
    var appPaid = []
    var appFree = []


    // make data into values
    csvdata.forEach(function (data,i) {
        data.poverty = +data.poverty;
        console.log(data)
    });

    // create scales
    // get extents and range
    var xExtent = d3.extent(csvdata, d => d.poverty),
        xRange = xExtent[1] - xExtent[0],
        yExtent = d3.extent(csvdata, d => d.healthcare),
        yRange = yExtent[1] - yExtent[0];

    var xscale = d3.scaleLinear()
        .domain([xExtent[0] - (xRange * .05), xExtent[1] + (xRange * .05)])
        .range([0, chartWidth]);

    var yscale = d3.scaleLinear()
        .domain([yExtent[0] - (yRange * .05), yExtent[1] + (yRange * .05)])
        .range([chartHeight, 0]);

    // xy axes
    var bottomaxis = d3.axisBottom(xscale).ticks(6);
    var leftaxis = d3.axisLeft(yscale).ticks(6);

    // append axes
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomaxis);

    chartGroup.append('g')
        .call(leftaxis);


    // tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-8, 0])
        .html(function (d) { return `${d.state} <br> Health Care: ${d.healthcare}% <br> Poverty: ${d.poverty}% `; });

    chartGroup.call(tip);

    // append circles
    var circleGroup = chartGroup.selectAll('circle')
        .data(csvdata)
        .enter()
        .append('circle')
        .attr('cx', d => xscale(d.poverty))
        .attr('cy', d => yscale(d.healthcare))
        .attr('r', '15')
        .attr('fill', 'mediumseagreen')
        .attr('opacity','0.60')
        // .attr('stroke-width', '1.5')
        // .attr('stroke', 'grey')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


    // append text for each circle
    // tested this with .selectALL('text') and does not work - only labels the latter half of the array
    // with 'foo' it worked and all labels showed up. WHY????
    var textGroup = chartGroup.selectAll('foo')
        .data(csvdata)
        .enter()
        .append('text')
        .attr('x', d => xscale(d.poverty))
        .attr('y', d => yscale(d.healthcare))
        .text(d => d.abbr)
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        // .attr('stroke', 'white')
        .attr('fill','white')
        .attr('stroke-width', '0.5')
        .attr('opacity', '0.75')

    var labelGroup = chartGroup.append('g')
        .attr('transform', `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var xLabel = labelGroup.append('text')
        .attr("x", 0)
        .attr("y", 20)
        .classed("active", true)
        .text("In Poverty (%)");

    var yLabel = chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.right)
        .attr("x", 0 - (chartHeight/1.5))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Lacks Health Care (%)")
        .attr('font-weight','bold');

});