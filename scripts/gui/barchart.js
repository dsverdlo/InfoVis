/* File:      barchart.js         *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};
var barchart = barchart || {};

// This script bootstraps the barchart widget.

barchart.container = document.getElementById("container-barchart");

barchart.total_width = parseInt(window.getComputedStyle(barchart.container).width, 10);
barchart.total_height = parseInt(window.getComputedStyle(barchart.container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////

barchart.offset = 20;

barchart.margin = {top: 20, right: 20, bottom: 20, left: 20};
barchart.width = barchart.total_width - barchart.margin.left - barchart.margin.right;
barchart.height = barchart.total_height - barchart.margin.top - barchart.margin.bottom;

barchart.maximum_bars = 5;

barchart.x_axis_offset = 30;
barchart.bar_width = 40;

barchart.track_text = "World Track Chart";
barchart.artist_text = "World Artist Chart";


//// UI SETUP ///////////////////////////////////////////////////////////////////

barchart.container = d3.select("#container-barchart");

// The x scalar maps the scales linearly over the top X (top 5, top 20, ...). The y scales
// linearly over the popularity.
barchart.x = d3.scale.ordinal().domain(["a", "b", "c", "d", "e"])
    .rangeRoundBands([barchart.margin.left, barchart.width], 0.05);
barchart.y = d3.scale.linear().range([0, barchart.height]).domain([100, 0]);

// Initialize axes with our previously creates scalars.
barchart.x_axis = d3.svg.axis().scale(barchart.x).orient("bottom");
barchart.y_axis = d3.svg.axis().scale(barchart.y).orient("left");

barchart.svg = barchart.container.append("svg")
    .attr("width", barchart.width + barchart.margin.left + barchart.margin.right)
    .attr("height", barchart.width + barchart.margin.top + barchart.margin.bottom);

barchart.group = barchart.svg.append("g")
    .attr("transform", "translate(" + barchart.margin.left + "," + barchart.margin.top + ")");

// Draw the x axis.
barchart.x_axis_g = barchart.group.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + barchart.offset / 2 + "," + barchart.height + ")")
        .call(barchart.x_axis)

// Draw the y axis.
barchart.y_axis_g = barchart.group.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + 10 + "," + 0 + ")")
        .call(barchart.y_axis);

barchart.axis_text = barchart.y_axis_g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(barchart.y_axis_text);

banner.setChartData = function(array, label, x_value, y_value) {
    var data = array.slice(0, barchart.maximum_bars);
    barchart.axis_text.text(label);

    // Reset the labels.
    barchart.x.domain(data.map(function(d) { return x_value(d); }));
    barchart.x_axis_g.call(barchart.x_axis);

    // Draw the bars.
    barchart.group.selectAll(".bar")
            .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("x", function(d) { return barchart.x(x_value(d)) + 30 })
            .attr("width", barchart.bar_width)
            .attr("y", function(d) { return barchart.y(y_value(d)); })
            .attr("height", function(d) { return barchart.height - barchart.y(y_value(d)); });
};
