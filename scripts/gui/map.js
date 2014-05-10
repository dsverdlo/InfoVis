var json_topology = "data/datamaps.world.min.json",
    json_general_circles = "data/circles.general.json",
    json_zoom_circles = "data/circles.zoom.json"

var width = parseInt(window.getComputedStyle(body).width, 10),
    height = parseInt(window.getComputedStyle(body).height, 10),
    active = d3.select(null);

var scale = d3.scale.sqrt()
    .domain([0, 100])
    .range([0, 20]);

var projection = d3.geo.mercator().translate([0, 0]).scale(width / 2 / Math.PI);  

var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg").attr("width", width).attr(
             "height", height).append("g").attr("transform",
             "translate(" + width / 2 + "," + height / 2 + ")")
             .on("click", stopped, true);

svg.append("rect").attr("class", "overlay").attr("x", -width / 2).attr(
   "y", -height / 2).attr("width", width).attr("height", height)
   .on("click", reset);

var g = svg.append("g").style("stroke-width", 1)
    .attr("transform", "translate(0, 100)scale(1)");
    
svg.call(zoom).call(zoom.event);

d3.json(json_topology, function(error, world) {
    g.selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter().append("path")
              .attr("d", path)
              .attr("class", "feature")
              .on("click", clicked);

    g.append("path").datum(
            topojson.mesh(world, world.objects.countries,
                    function(a, b) {
                        return a !== b;
                    })).attr("class", "boundary").attr("d", path);
                    
    zoomLevel(json_general_circles);
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
                    .attr("class", "map-marker")
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
                    .attr("x", function (d) { return (d.x_axis + scale(d.radius) + 3) })
                    .attr("y", function (d) { return (d.y_axis + 4) });
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
        zoomLevel(json_zoom_circles) }
    else { 
        stateZoomOut();
        zoomLevel(json_general_circles) }
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

function clicked(d) {
	  if (active.node() === this) return reset();
	  active.classed("active", false);
	  active = d3.select(this).classed("active", true);

	  g.selectAll("#country").remove();
			  
	  country = "data/" + d.id + ".json";

	  d3.json(country, function(error, world) {
		  g.append("g")
		  	.attr("id","country")
		  	.on("click", reset)
		  		.selectAll("path")
				.data(topojson.feature(world, world.objects.layer1).features)
				.enter().append("path")
				      .attr("d", path)
				      .style("fill", "orange");
						      
		  g.append("g")
		  	.attr("id","country")
		  	.on("click", reset)
		  		.append("path").datum(
					topojson.mesh(world, world.objects.layer1,
							function(a, b) {
								return a !== b;
							})).attr("class", "boundary")
							.attr("d", path).style("fill","orange");

			}); 
			  
	  var bounds = path.bounds(d),
	      dx = bounds[1][0] - bounds[0][0],
	      dy = bounds[1][1] - bounds[0][1],
	      x = (bounds[0][0] + bounds[1][0]) / 2,
	      y = (bounds[0][1] + bounds[1][1]) / 2,
	      scale = .9 / Math.max(dx / width, dy / height),
	      translate = [width / 2 - scale * x - 500, height / 2 - scale * y - 300];

	  svg.transition()
          .duration(750)
          .call(zoom.translate(translate).scale(scale).event);
};
			
function reset() {
	  active.classed("active", false);
	  active = d3.select(null);

	  g.selectAll("#country").remove();
			  
	  svg.transition()
	      .duration(750)
	      .call(zoom.translate([0, 0]).scale(1).event);

};
		
// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
};
