var tsv_data = "data/linechart.tsv"

var container = document.getElementById("linechart");

var calculatedWidth = parseInt(window.getComputedStyle(container).width, 10),
    calculatedHeight = parseInt(window.getComputedStyle(container).height, 10);

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = calculatedWidth - margin.left - margin.right,
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

var svg = d3.select("#linechart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
       .append("g")
          .attr("id", "linechartcontainer")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv(tsv_data, function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.position = +d.position;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([1, 20]);

  var container = d3.select("#linechartcontainer");

  container.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  container.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Chart Position");

  container.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});
