/* File:      dialog.js           *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};
var dialog = dialog || {};

// This script generates the dialogs. It also exports functions to
// show and hide the dialog.

dialog.container = document.getElementById("container-dialog");

dialog.total_width = parseInt(window.getComputedStyle(dialog.container).width, 10);
dialog.total_height = parseInt(window.getComputedStyle(dialog.container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////

dialog.about_text =
	"The page you are looking at right now is the manifestation of years and years " +
	"of hard work. Blood, sweat and tears were drawn by four brave people to produce " +
	"this work of art. But in the end, it was worth it. Oh. So. Worth it.\n\n" +
	"Just kidding.\n\nWhat you actually see is the outcome of the project for the " +
	"course \"Information Visualization\", given at the Masters Trajectory for " +
	"Computer Science at the VUB. We wanted to visualize the hottest musical trends " +
	"around the globe. Therefore, we used the Last.fm api.";

dialog.about_title = "ABOUT | Who made this?";
dialog.help_title = "HELP | Our Website 101";

dialog.top_spacing = dialog.total_height * (2 / 100);
dialog.mid_spacing = dialog.total_height * (2 / 100);
dialog.bot_spacing = dialog.total_height * (2 / 100);
dialog.all_spacing = dialog.top_spacing + dialog.mid_spacing + dialog.bot_spacing;

dialog.content_width = dialog.total_width * (9 / 10);
dialog.header_height = dialog.total_height * (1 / 10);
dialog.content_height = dialog.total_height - dialog.header_height - dialog.all_spacing;

dialog.left_spacing = (dialog.total_width - dialog.content_width) / 2;

dialog.header_top = dialog.top_spacing;
dialog.content_top = dialog.top_spacing + dialog.header_height + dialog.mid_spacing;


//// UI SETUP ///////////////////////////////////////////////////////////////////

dialog.container = d3.select("#container-dialog");

dialog.container.append("svg")
		.attr("width", "100%")
		.attr("height", "10%")
	.append("rect")
		.attr("width", "100%")
		.attr("height", "100%");

function createHeader(value) {
	var header = container_dialog.append("svg")
		.attr("width", width)
		.attr("height", header_height)
		.attr("top", header_top)
		.attr("left", left_spacing);

	var header_text = header.append("text")
		.attr("dy", ".5em")
        .attr("text-anchor", "begin")
        .style("font-size", header_height + "px")
        .style("font-weight", "bold")
        .text(value);

    return header;
};

// var about_header = createHeader(about_title);
// var help_header = createHeader(help_title);


//// EXPORTS ////////////////////////////////////////////////////////////////////

/** Shows the about dialog. */
gui.showAbout = function() {
	// about_header.style("opacity", 1);
	// help_header.style("opacity", 0);
	gui.showDialog();
};

/** Hides the about dialog. */
gui.hideAbout = function() {
	gui.hideDialog();
};
