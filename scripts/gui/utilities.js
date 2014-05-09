/* File:      utilities.js        *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var utilities = utilities || {};

// This namespace contains the general utilities to make it easier to build
// the pretty UI we want.

/**
 * Create a basic widget. Unfortunately, the style I want can't be created
 * purely with CSS, so I this function dynamically creates one. */
utilities.createWidgetCanvas = function(container) {
	return container.append("rect")
		.attr("class", "widget-background")
		.attr("rx", 10)
		.attr("ry", 10)
		.attr("width", "100%")
		.attr("height", "100%");
};

/** Set the opacity of all elements in the array over a duration of 200ms. */
utilities.gradualOpacity = function(elements, opacity) {
	elements.forEach(function(element) {
		element.transition().duration(400).style("opacity", opacity);
	});
};
