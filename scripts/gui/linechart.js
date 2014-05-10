/* File:      linechart.js        *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};
var linechart = linechart || {};

// This script bootstraps the linechart widget.

linechart.tsv_data = "data/linechart.tsv";

linechart.container = document.getElementById("container-linechart");

linechart.total_width = parseInt(window.getComputedStyle(linechart.container).width, 10);
linechart.total_height = parseInt(window.getComputedStyle(linechart.container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////

linechart.margin = {top: 20, right: 20, bottom: 20, left: 20};
linechart.width = linechart.total_width - linechart.margin.left - linechart.margin.right;
linechart.height = linechart.total_height - linechart.margin.top - linechart.margin.bottom;


//// UI SETUP ///////////////////////////////////////////////////////////////////

linechart.container = d3.select("#container-linechart");

linechart.parseDate = d3.time.format("%d-%b-%y").parse;

// The x scales with time, the y just scales linearly with track position.
linechart.x = d3.time.scale().range([0, linechart.width]);
linechart.y = d3.scale.linear().range([0, linechart.height]);

// Initialize axes with our previously creates scalars.
linechart.x_axis = d3.svg.axis().scale(linechart.x).orient("bottom");
linechart.y_axis = d3.svg.axis().scale(linechart.y).ticks(5).orient("left");

linechart.line = d3.svg.line()
    .x(function(d) { return linechart.x(d.date); })
    .y(function(d) { return linechart.y(d.position); });

linechart.svg = linechart.container.append("svg")
    .attr("width", linechart.width + linechart.margin.left + linechart.margin.right)
    .attr("height", linechart.height + linechart.margin.top + linechart.margin.bottom);

linechart.group = linechart.svg.append("g")
    .attr("transform", "translate(" + linechart.margin.left + "," + linechart.margin.top + ")");

d3.tsv(linechart.tsv_data, function(error, data) {
    data.forEach(function(d) {
        d.date = linechart.parseDate(d.date);
        d.position = +d.position;
    });

    linechart.x.domain(d3.extent(data, function(d) { return d.date; }));
    linechart.y.domain([1, 20]);

    linechart.group.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + linechart.height + ")")
        .call(linechart.x_axis);

    linechart.group.append("g")
            .attr("class", "y axis")
            .call(linechart.y_axis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Chart Position");

    linechart.group.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", linechart.line);
});
