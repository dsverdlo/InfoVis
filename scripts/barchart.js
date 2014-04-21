var tsv_data = "data/barchart.tsv"

var container = document.getElementById("barchart");

var calculatedWidth = parseInt(window.getComputedStyle(container).width, 10),
    calculatedHeight = parseInt(window.getComputedStyle(container).height, 10);

var offset = 20;

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = calculatedWidth - margin.left - margin.right - offset,
    height = calculatedHeight - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.position); });

var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right + offset)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("id", "barchartcontainer")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv(tsv_data, convert, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([1, 20]);

  var container = d3.select("#barchartcontainer");

  container.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + offset / 2 + "," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

  container.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Chart Position");

  //container.selectAll(".bar_container")
  //     .data(data)
  //  .enter().append("rect")
  //    .attr("class", "bar_container")
  //    .attr("rx", "5")
  //    .attr("ry", "5")
  //    .attr("x", function(d) { return x(d.date) + (offset / 4) + 0.5; })
  //    .attr("width", offset - 1)
  //    .attr("y", 0)
  //    .attr("height", function(d) { return height; });

  container.selectAll(".bar")
       .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("rx", "5")
      .attr("ry", "5")
      .attr("x", function(d) { return x(d.date) + offset / 4; })
      .attr("width", offset)
      .attr("y", function(d) { return y(d.position); })
      .attr("height", function(d) { return height - y(d.position); });

});

function convert(d) {
    d.date = parseDate(d.date);
    d.position = +d.position;
    return d;
};