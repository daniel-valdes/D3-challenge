// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(importedData) {

    importedData.forEach(function(data) {

        data.obesity = +data.obesity
        data.income = +data.income
        console.log(data)
    })
      
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.max(importedData, d => d.obesity)])
        .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(importedData, d => d.income)])
        .range([height, 0]);


    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
    chartGroup.append("g")
        .call(leftAxis);

    // Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(importedData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.obesity))
        .attr("cy", d => yLinearScale(d.income))
        .attr("r", "15")
        .attr("fill", "teal")
        .attr("opacity", ".8");

    // State Abbrevs.
    var textGroup = chartGroup.selectAll(".stateText")
        .data(importedData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.obesity))
        .attr("y", d => yLinearScale(d.income))
        .text(d => (d.abbr))
        .attr("class", "stateText")
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");

    // AXES LABELS

    // Y-Axis Label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Average Income");

    // X-Axis Label
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Obesity Rate (%)");

});