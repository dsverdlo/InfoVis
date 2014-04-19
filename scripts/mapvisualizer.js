var jsonTopology = "data/countries.topo.json",
    jsonGeneralCircles = "data/circles.general.json",
    jsonZoomCircles = "data/circles.zoom.json"

var width = 1100, height = 600;

var scale = d3.scale.sqrt()
    .domain([0, 100])
    .range([0, 20]);

var projection = d3.geo.mercator().translate([ 0, 0 ]).scale(
		width / 2 / Math.PI);  

var zoom = d3.behavior.zoom().scaleExtent([ 1, 8 ]).on("zoom", move);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg").attr("width", width).attr(
		"height", height).append("g").attr("transform",
		"translate(" + width / 2 + "," + height / 2 + ")").call(zoom);

svg.append("rect").attr("class", "overlay").attr("x", -width / 2).attr(
		"y", -height / 2).attr("width", width).attr("height", height);
		
var g = svg.append("g");

d3.json(jsonTopology, function(error, world) {
	g.selectAll("path")
		.data(topojson.feature(world, world.objects.countries).features)
		.enter().append("path")
		      .attr("d", path)
		      .attr("class", "feature");

	g.append("path").datum(
			topojson.mesh(world, world.objects.countries,
					function(a, b) {
						return a !== b;
					})).attr("class", "boundary").attr("d", path);
					
	zoomLevel(jsonGeneralCircles);
	
});

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

function zoomLevel(jsonfile) {
	d3.json(jsonfile, function(data) {
		g.selectAll("circle")
		 .data([])
		 .exit().remove();

		g.selectAll("text")
		 .data([])
		 .exit().remove();

		g.selectAll("circle")
		 .data(data)
		 .enter().append("circle")
		            .attr("cx", function (d) { return d.x_axis })
		            .attr("cy", function (d) { return d.y_axis })
		            .attr("r", function(d) { return scale(d.radius); })
		            .on("mouseover", function(d){ 
				div.transition()        
			                .duration(200)      
			                .style("opacity", .9);      
		                div.html(d.name)  
			                .style("left", (d3.event.pageX) + "px")     
			                .style("top", (d3.event.pageY - 28) + "px"); })
			    .on("mouseout", function(d) {       
			        div.transition()        
			                .duration(200)      
			                .style("opacity", 0);   
    			    });

		g.selectAll("text")
		 .data(data)
		 .enter().append("text")
		            .text(function (d) { return d.name })
		            .attr("x", function (d) { return (d.x_axis + scale(d.radius) + 1) })
		            .attr("y", function (d) { return (d.y_axis + 2) });
	});
};
	
function move() {
	var t = d3.event.translate, s = d3.event.scale;
	t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s),
			t[0]));
	t[1] = Math.min(height / 2 * (s - 1) + 230 * s, Math.max(height / 2
			* (1 - s) - 230 * s, t[1]));
	zoom.translate(t);
	g.style("stroke-width", 1 / s).attr("transform",
			"translate(" + t + ")scale(" + s + ")");

	if (s > 3) { 
		stateZoomIn();
		zoomLevel(jsonZoomCircles) }
	else { 
		stateZoomOut();
		zoomLevel(jsonGeneralCircles) }
};

function stateZoomIn() {
	d3.json("data/states_usa.topo.json", function(data){
		g.append("g")
		 .attr("id", "states")
		 .selectAll("path")
		    .data(topojson.feature(data, data.objects.states).features)
		    .enter()
		       .append("path")
		       .attr("id", function(d) { return d.id; })
		       .attr("class", "active")
		       .attr("d", path);
	});
};

function stateZoomOut(){
	g.selectAll("#states").remove();
};
