/* File:      gui.js              *
 * Project:   InfoVis Project     *
 * Author(s): Trieu Thanh Ngoan   *
              Kenny Deschuyteneer */

var backEnd = backEnd || {};
var gui = gui || {};
var map = map || {};

// This script builds the bulk of our visualization page: the map that
// shows data about musical trends around the globe.

map.json_topology = "data/datamaps.world.min.json";


//// UI SETUP ///////////////////////////////////////////////////////////////////

map.width = parseInt(window.getComputedStyle(body).width, 10);
map.height = parseInt(window.getComputedStyle(body).height, 10);
map.active = d3.select(null);

map.scale = d3.scale.sqrt()
    .domain([0, 100])
    .range([0, 30]);

map.scaleColor = d3.scale.sqrt()
    .domain([0, 1.0])
    .range([0, 7]);

map.basecolor = "#FFE8CC";
map.colors = ["#FFDDB2", "#FFD699", "#FFC97F", "#FFBC66", "#FFAE4C", "#FF9F32", "#FF9019", "#FF8300"];
map.colorsCity = ["#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"];

map.projection = d3.geo.mercator().translate([0, 0]).scale(map.width / 2 / Math.PI);  

map.zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", move);

map.path = d3.geo.path().projection(map.projection);

map.svg = d3.select("body").append("svg")
        .attr("width", map.width).attr("height", map.height)
    .append("g")
        .attr("transform", "translate(" + map.width / 2 + "," + map.height / 2 + ")")
        .on("click", map.stopped, true);

map.svg.append("rect").attr("class", "overlay")
    .attr("x", -map.width / 2).attr("y", -map.height / 2)
    .attr("width", map.width).attr("height", map.height)
    .on("click", map.reset);

map.g = map.svg.append("g").style("stroke-width", 1)
    .attr("transform", "translate(0, 100)scale(1)");
    
map.svg.call(map.zoom).call(map.zoom.event);

d3.json(map.json_topology, function(error, world) {
    map.g.selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter().append("path")
              .attr("d", map.path)
              .attr("class", "feature")
              .on("click", map.clicked);

    map.g.append("path").datum(
            topojson.mesh(world, world.objects.countries,
                    function(a, b) {
                        return a !== b;
                    })).attr("class", "boundary").attr("d", map.path);
});

map.bubblegroup = map.svg.append("g");

gui.removeBubbles = function() {
    map.bubblegroup.selectAll("#map-marker")
        .remove();
};

gui.loadTrackBubbles = function() {
    map.bubblegroup.selectAll("circle")
        .remove();

    backEnd.countryList.map(function(country) {
        var toppesttrack = country.trackChart[0];

        if (toppesttrack != undefined) {
            var longitude  = country.longitude - 180;
            var latitude   = country.latitude - 85.609038;
            var popularity = toppesttrack.popularity;
            var name       = toppesttrack.name;

            console.log(name + " is most popular track in " + country.name);
            gui.drawBubble(name, longitude, latitude, popularity);
        };
    });
};

gui.loadArtistBubbles = function() {
    gui.removeBubbles();

    backEnd.countryList.map(function(country) {
        var toppestartist = country.artistChart[0];

        if (toppestartist != undefined) {
            var longitude  = country.longitude - 180;
            var latitude   = country.latitude - 85.609038;
            var popularity = toppestartist.popularity;
            var name       = toppestartist.name;

            console.log(name + " is most popular artist in " + country.name);
            gui.drawBubble(name, longitude, latitude, popularity);
        };
    });
};

// Periodically check whether the backend has loaded yet.
map.loading = function() {
    if (backEnd.world.tracksReady()) {
        console.log("Top tracks loaded!");
        gui.loadTrackBubbles();
    } else {
        setTimeout(map.loading, 500);
    };
};

// map.loading();

gui.drawBubble = function(name, cx, cy, radius) {
    map.bubblegroup.append("circle")
        .attr("class", "map-marker")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", map.scale(radius*30));
};

function containCountry(tracks, artists, countries, name, typeArtist){
	map.index = -1;
	for (var i = 0; i < countries.length; i++) {
		map.index = countries.indexOf(name);
		if( map.index > -1 ){
			if(typeArtist){
				return Math.round(map.scaleColor(artists[map.index].popularity));
			}else{
				return Math.round(map.scaleColor(tracks[map.index].popularity));
			};
		}else{
			return -1;
		};
	};
};

function search() {
	map.artistOrTrack = document.getElementById("searchinput").value;
	map.countries = [];
	map.artists = [];
	map.tracks = [];
	map.typeArtist = true;
	
	backEnd.countryList.map(function(country) {
		map.artist = country.findArtist(map.artistOrTrack);
		if (map.artist != null){
			map.countries.push(country.name); 
			map.artists.push(map.artist);
			map.typeArtist = true;
		};
		
		map.track = country.findTrack(map.artistOrTrack);
		if (map.track != null){
			map.countries.push(country.name); 
			map.tracks.push(map.track);
			map.typeArtist = false;
		};
	});
	
	//remove old paths
	map.g.selectAll("path").remove();
	
	//add new paths
	d3.json(map.json_topology, function(error, world) {
		map.g.selectAll("path")
			.data(topojson.feature(world, world.objects.countries).features)
			.enter().append("path")
				  .attr("d", map.path)
				  .style("fill", function(d){ 
							map.tempColorIndex = containCountry(map.tracks, map.artists, map.countries, d.properties.name, map.typeArtist);
							if( map.tempColorIndex >= 0 && map.tempColorIndex <= 7 ){ return map.colors[map.tempColorIndex];}; 
							if( map.tempColorIndex == -1 ){ return "#FFD38E"};
							return "#9F8170"})
				   .style("stroke", "#FFF")
				   .style("stroke-width", "0.75")
				  .on("click", map.clicked);

		map.g.append("path").datum(
				topojson.mesh(world, world.objects.countries,
						function(a, b) {
							return a !== b;
						})).attr("class", "boundary").attr("d", map.path);
	});
};

map.div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function zoomLevel(jsonfile) {
    d3.json(jsonfile, function(data) {
        map.g.selectAll("circle")
         .data([])
         .exit().remove();

        map.g.selectAll("text")
         .data([])
         .exit().remove();

        map.g.selectAll("circle")
         .data(data)
         .enter().append("circle")
                    .attr("class", "map-marker")
                    .attr("cx", function (d) { return d.x_axis })
                    .attr("cy", function (d) { return d.y_axis })
                    .attr("r", function(d) { return map.scale(d.radius); })
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

        map.g.selectAll("text")
         .data(data)
         .enter().append("text")
                    .text(function (d) { return d.name })
                    .attr("x", function (d) { return (d.x_axis + map.scale(d.radius) + 3) })
                    .attr("y", function (d) { return (d.y_axis + 4) });
    });
};
    
function move() {
    map.t = d3.event.translate;
	map.s = d3.event.scale;
    map.t[0] = Math.min(map.width / 2 * (map.s - 1), Math.max(map.width / 2 * (1 - map.s),
            map.t[0]));
    map.t[1] = Math.min(map.height / 2 * (map.s - 1) + 230 * map.s, Math.max(map.height / 2
            * (1 - map.s) - 230 * map.s, map.t[1]));
    map.zoom.translate(map.t);
    map.g.style("stroke-width", 1 / map.s).attr("transform",
            "translate(" + map.t + ")scale(" + map.s + ")");

    if (map.s > 3) { 
        stateZoomIn(); }
    else { 
        stateZoomOut(); }
};

function stateZoomIn() {
    d3.json("data/states_usa.topo.json", function(data){
        map.g.append("g")
         .attr("id", "states")
         .selectAll("path")
            .data(topojson.feature(data, data.objects.states).features)
            .enter()
               .append("path")
               .attr("id", function(d) { return d.id; })
               .attr("class", "active")
               .attr("d", map.path);
    });
};

function stateZoomOut(){
    map.g.selectAll("#states").remove();
};

map.clicked = function(d) {
	  if (map.active.node() === this) return map.reset();
	  map.active.classed("active", false);
	  map.active = d3.select(this).classed("active", true);

	  map.g.selectAll("#country").remove();
			  
	  country = "data/" + d.id + ".json";
		//create map for country
	  d3.json(country, function(error, country) {
		  map.g.append("g")
		  	.attr("id","country")
		  	.on("click", map.reset)
		  		.selectAll("path")
				.data(topojson.feature(country, country.objects.layer1).features)
				.enter().append("path")
				      .attr("d", map.path)
				      .style("fill", "#FF4500");
						      
		  map.g.append("g")
		  	.attr("id","country")
		  	.on("click", map.reset)
		  		.append("path").datum(
					topojson.mesh(country, country.objects.layer1,
							function(a, b) {
								return a !== b;
							})).attr("class", "boundary")
							.attr("d", map.path).style("fill","#FF4500");

			});
		
		map.artistOrTrack = document.getElementById("searchinput").value;
		if (map.artistOrTrack == "" | d.id != 'BEL'){
			console.log("No search input or not belgium");
		}else{
			map.metrosname = [];
			map.artists = [];
			map.tracks = [];
			
			var belgium = backEnd.getCountryByName('Belgium');
			for(var i = 0; i< belgium.metros.length; i++){
				var metro = belgium.metros[i];
				metro.fetchArtistChart();
				metro.fetchTrackChart();
				
				if(map.typeArtist){
					//metro.artistChart
					for(var j = 0; j < metro.artistChart.length; j++){
						if(metro.artistChart[j].name.indexOf(map.artistOrTrack) > -1   & metro.name != 'Charleroi' & metro.name != 'Ghent'){
							map.artists.push(metro.artistChart[j]);
							map.metrosname.push(metro.name);
						};
					};
				}else{
					//metro.trackChart
					for(var j = 0; j < metro.trackChart.length; j++){
						if(metro.trackChart[j].name.indexOf(map.artistOrTrack) > -1  & metro.name != 'Charleroi' & metro.name != 'Ghent'){ 
							map.tracks.push(metro.trackChart[j]);
							map.metrosname.push(metro.name);
						};
					};
				};
			};
			
			if(map.metrosname.length > 0 ){
				if(map.typeArtist){
					for(var i = 0; i < map.artists.length; i++){
						console.log(map.metrosname[i] + " " +map.artists[i].name + map.artists[i].popularity);
						var tempColorIndex1 = Math.round(map.scaleColor(map.artists[i].popularity));
						var tempColor = map.colorsCity[tempColorIndex1];
										
						var cityname = map.metrosname[i];
						var cityfile = "data/" + cityname + ".json";
						//create map for city
						drawCity(cityfile, tempColor);
					};
				}else{
					for(var i = 0; i < map.tracks.length; i++){
						console.log(map.metrosname[i] + " " +map.tracks[i].name + map.tracks[i].popularity);
						var tempColorIndex1 = Math.round(map.scaleColor(map.tracks[i].popularity));
						var tempColor = map.colorsCity[tempColorIndex1];
										
						var cityname = map.metrosname[i];
						var cityfile = "data/" + cityname + ".json";
						//create map for city
						drawCity(cityfile, tempColor);
					};
				};
			};
		};
		
	    map.bounds = map.path.bounds(d);
	    map.dx = map.bounds[1][0] - map.bounds[0][0];
	    map.dy = map.bounds[1][1] - map.bounds[0][1];
	    map.x = (map.bounds[0][0] + map.bounds[1][0]) / 2;
	    map.y = (map.bounds[0][1] + map.bounds[1][1]) / 2;
	    map.scaleZoom = .9 / Math.max(map.dx / map.width, map.dy / map.height);
	    map.translate = [map.width / 2 - map.scaleZoom * map.x - 500, map.height / 2 - map.scaleZoom * map.y - 300];

		map.g.selectAll("path").style("stroke-width", 0.1);
		map.svg.transition()
          .duration(750)
          .call(map.zoom.translate(map.translate).scale(map.scaleZoom).event);
};

function drawCity(cityfile, color){
	d3.json(cityfile, function(error, city) {
		map.g.append("g")
			.attr("id", "country")
			.on("click", map.reset)
			.selectAll("path")
			.data(topojson.feature(city, city.objects.layer1).features)
			.enter().append("path")
				  .attr("d", map.path)
				  .style("fill", color);
								  
			map.g.append("g")
			.attr("id", "country")
			.on("click", map.reset)
			.append("path").datum(
			topojson.mesh(city, city.objects.layer1,
				function(a, b) {
					return a !== b;
				})).attr("class", "boundary")
				.attr("d", map.path)
				.style("fill", color);
	}); 
}
			
map.reset = function() {
	  map.active.classed("active", false);
	  map.active = d3.select(null);

	  map.g.selectAll("#country").remove();
			  
	  map.svg.transition()
	      .duration(750)
	      .call(map.zoom.translate([0, 0]).scale(1).event);
	map.g.selectAll("path").style("stroke-width", 0.75);
};
		
		
// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
map.stopped = function() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
};