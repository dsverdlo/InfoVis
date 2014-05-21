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

barchart.x_axis_offset = 20;
barchart.bar_width = 20;

barchart.track_text = "World Track Chart";
barchart.artist_text = "World Artist Chart";


//// UI SETUP ///////////////////////////////////////////////////////////////////

barchart.container = d3.select("#container-barchart");

// The x scalar maps the scales linearly over the top X (top 5, top 20, ...). The y scales
// linearly over the popularity.
barchart.x = d3.scale.linear().range([barchart.x_axis_offset, barchart.width]).domain([1, barchart.maximum_bars]);
barchart.y = d3.scale.linear().range([0, barchart.height]).domain([100, 0]);

// Initialize axes with our previously creates scalars.
barchart.x_axis = d3.svg.axis().scale(barchart.x).tickValues([1, 2, 3, 4, 5]).orient("bottom");
barchart.y_axis = d3.svg.axis().scale(barchart.y).orient("left");

barchart.svg = barchart.container.append("svg")
    .attr("width", barchart.width + barchart.margin.left + barchart.margin.right)
    .attr("height", barchart.width + barchart.margin.top + barchart.margin.bottom);

barchart.group = barchart.svg.append("g")
    .attr("transform", "translate(" + barchart.margin.left + "," + barchart.margin.top + ")");

// Draw the x axis.
barchart.group.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + barchart.offset / 2 + "," + barchart.height + ")")
        .call(barchart.x_axis)

// Draw the y axis.
barchart.y_axis_g = barchart.group.append("g")
        .attr("class", "y axis")
        .call(barchart.y_axis);

barchart.axis_text = barchart.y_axis_g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(barchart.y_axis_text);

gui.setBarchartLabel = function(txt) {
    barchart.axis_text.text(txt);
};

gui.loadTracks = function() {
    var tracks = backEnd.world.trackChart.slice(0, barchart.maximum_bars);

    gui.setBarchartLabel(barchart.track_text);

    // Draw the bars.
    barchart.group.selectAll(".bar")
            .data(tracks)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("x", function(d) { return barchart.x(d.chartPos) })
            .attr("width", barchart.offset)
            .attr("y", function(d) { return barchart.y(d.popularity * 100); })
            .attr("height", function(d) { return barchart.height - barchart.y(d.popularity * 100); });
};

gui.loadArtists = function() {
    var artists = backEnd.world.artistChart.slice(0, barchart.maximum_bars);

    gui.setBarchartLabel(barchart.artist_text);

    // Draw the bars.
    barchart.group.selectAll(".bar")
            .data(artists)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("rx", "5")
            .attr("ry", "5")
            .attr("x", function(d) { return barchart.x(d.chartPos) })
            .attr("width", barchart.offset)
            .attr("y", function(d) { return barchart.y(d.popularity * 100); })
            .attr("height", function(d) { return barchart.height - barchart.y(d.popularity * 100); });
};

// Periodically check whether the backend has loaded yet.
barchart.loading = function() {
    if (backEnd.world.tracksReady()) {
        console.log("Top tracks loaded!");
        gui.loadTracks();
    } else {
        setTimeout(barchart.loading, 500);
    };
};

barchart.loading();
