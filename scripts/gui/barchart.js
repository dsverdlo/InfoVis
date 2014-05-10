/* File:      barchart.js         *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};
var barchart = barchart || {};

// This script bootstraps the barchart widget.

barchart.tsv_data = "data/barchart.tsv"

barchart.container = document.getElementById("container-barchart");

barchart.total_width = parseInt(window.getComputedStyle(barchart.container).width, 10);
barchart.total_height = parseInt(window.getComputedStyle(barchart.container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////

barchart.offset = 20;

barchart.margin = {top: 20, right: 20, bottom: 20, left: 20};
barchart.width = barchart.total_width - barchart.margin.left - barchart.margin.right;
barchart.height = barchart.total_height - barchart.margin.top - barchart.margin.bottom;


//// UI SETUP ///////////////////////////////////////////////////////////////////

barchart.container = d3.select("#container-barchart");

barchart.parseDate = d3.time.format("%d-%b-%y").parse;

// The x scales with time, the y just scales linearly with track position.
barchart.x = d3.time.scale().range([0, barchart.width]);
barchart.y = d3.scale.linear().range([0, barchart.height]);

// Initialize axes with our previously creates scalars.
barchart.x_axis = d3.svg.axis().scale(barchart.x).orient("bottom");
barchart.y_axis = d3.svg.axis().scale(barchart.y).ticks(5).orient("left");

barchart.line = d3.svg.line()
    .x(function(d) { return barchart.x(d.date); })
    .y(function(d) { return barchart.y(d.position); });

barchart.svg = barchart.container.append("svg")
    .attr("width", barchart.width + barchart.margin.left + barchart.margin.right + barchart.offset)
    .attr("height", barchart.width + barchart.margin.top + barchart.margin.bottom);

barchart.group = barchart.svg.append("g")
    .attr("transform", "translate(" + barchart.margin.left + "," + barchart.margin.top + ")");

d3.tsv(barchart.tsv_data, convert, function(error, data) {
    barchart.x.domain(d3.extent(data, function(d) { return d.date; }));
    barchart.y.domain([1, 20]);

    barchart.group.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + barchart.offset / 2 + "," + barchart.height + ")")
            .call(barchart.x_axis)
        .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(90)")
            .style("text-anchor", "start");

    barchart.group.append("g")
            .attr("class", "y axis")
            .call(barchart.y_axis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Chart Position");

    barchart.group.selectAll(".bar")
            .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("x", function(d) { return barchart.x(d.date) + (barchart.offset / 4); })
            .attr("width", barchart.offset)
            .attr("y", function(d) { return barchart.y(d.position); })
            .attr("height", function(d) { return barchart.height - barchart.y(d.position); });
});

function convert(d) {
    d.date = barchart.parseDate(d.date);
    d.position = +d.position;
    return d;
};