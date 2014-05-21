/* File:      gui.js              *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};

// This namespace contains the general utilities to make it easier to build
// the pretty UI we want.

/**
 * Create a basic widget. Unfortunately, the style I want can't be created
 * purely with CSS, so I this function dynamically creates one. */
gui.createWidgetCanvas = function(container) {
	return container.append("rect")
		.attr("class", "widget-background")
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", "100%")
		.attr("height", "100%");
};

/** Set the opacity of all elements in the array over a duration of 200ms. */
gui.gradualOpacity = function(elements, opacity) {
	elements.forEach(function(element) {
		element.transition().duration(400).style("opacity", opacity);
	});
};

/** Dim the entire window and show some dialogs. */
gui.showDialog = function() {
	var overlay = d3.select("#dialog-overlay");
	overlay.style("display", "block");
	overlay.style("opacity", .1);
	overlay.transition().duration(400).style("opacity", 1);
	gui.toggleDialog = gui.hideDialog;
};

/** The inverse of showDialog. */
gui.hideDialog = function() {
	var overlay = d3.select("#dialog-overlay");
	overlay.transition().duration(400).style("opacity", .1);
	overlay.transition().delay(400).style("display", "none");
	gui.toggleDialog = gui.showDialog;
};

/** Toggles the window between the dimmed and undimmed states. */
gui.toggleDialog = gui.showDialog;

/** Changes between modes: artist, track or album. */
gui.changeMode = function() {
	var mode = document.getElementById("mode-selection").value;

	switch (mode) {
		case "track":
			gui.loadTracks();
			break;
		case "artist":
			gui.loadArtists();
			break;
	};
};
