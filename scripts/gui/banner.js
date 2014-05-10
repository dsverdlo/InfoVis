/* File:      banner.js           *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var gui = gui || {};
var banner = banner || {};

// This script creates the banner UI element. The functions that are called
// by the elements in the banner are exported in the utilities namespace, so
// they can be used if need be.

banner.container = document.getElementById("container-banner");

banner.total_width = parseInt(window.getComputedStyle(banner.container).width, 10);
banner.total_height = parseInt(window.getComputedStyle(banner.container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////
banner.margin = banner.total_width / 10;

banner.element_space = ((banner.total_width - banner.margin) * 3) / 10;
banner.divider_space = (banner.total_width - banner.margin) / 20;

banner.about_pos = (banner.margin / 2);
banner.div1_pos = banner.about_pos + banner.element_space;
banner.help_pos = banner.div1_pos + banner.divider_space;
banner.div2_pos = banner.help_pos + banner.element_space;
banner.toggle_pos = banner.div2_pos + banner.divider_space;

banner.divider_margin_top = 2;
banner.divider_height = banner.total_height - (2 * banner.divider_margin_top);
banner.divider_width = 2;
banner.divider_margin_left = banner.divider_space - (2 * banner.divider_width);

banner.text_size = banner.total_height * (4 / 10);

banner.icon_radius = (banner.divider_height / 2) - 4;
banner.text_offset = banner.element_space * (2 / 10);
banner.icon_offset = banner.element_space - (banner.element_space / 4);


//// UI SETUP ///////////////////////////////////////////////////////////////////
banner.svg = d3.select("#container-banner").append("svg")
    .attr("width", banner.total_width)
    .attr("height", banner.total_height);

banner.background_expanded = gui.createWidgetCanvas(banner.svg);
banner.background_contracted = gui.createWidgetCanvas(banner.svg)
    .attr("width", banner.element_space + banner.divider_space)
    .attr("x", banner.toggle_pos)
    .style("opacity", 0);

banner.group = banner.svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (banner.total_height / 2) + ")");

banner.append_divider = function(position) {
    return banner.group.append("rect")
        .attr("class", "banner-divider")
        .attr("height", banner.divider_height)
        .attr("width", banner.divider_width)
        .attr("x", position)
        .attr("y", - (banner.divider_height / 2));
};

banner.append_element = function(position, text, icon_text) {
    // Group the constituents of our element.
    var element_container = banner.group.append("g").style("pointer-events", "all");

    // An invisible rectangle to capture mouse events.
    element_container.append("rect")
        .style("visibility", "hidden")
        .attr("x", position)
        .attr("y", - (banner.total_height / 2))
        .attr("width", banner.element_space)
        .attr("height", banner.total_height);

    // The text of the element.
    var element_text = element_container.append("text")
        .attr("class", "banner-element text")
        .attr("dy", ".3em")
        .attr("x", position + banner.text_offset)
        .attr("text-anchor", "begin")
        .style("font-size", banner.text_size + "px") 
        .style("font-weight", "bold") 
        .text(text);

    // The circle of the icon.
    var element_icon = element_container.append("circle")
        .attr("class", "banner-element icon")
        .attr("cx", position + banner.icon_offset + (banner.divider_height / 2))
        .attr("r", banner.icon_radius);    

    // The text of the icon.
    var element_icon_text = element_container.append("text")
        .attr("class", "banner-element text")
        .attr("x", position + banner.icon_offset + (banner.divider_height / 2))
        .attr("dy", ".3em")
        .attr("text-anchor", "middle")
        .style("font-size", banner.text_size + "px") 
        .style("font-weight", "bold") 
        .text(icon_text);

    // Flashy text on mouse over! Awww yisss!
    var highlight = function(d) {
        element_text.attr("class", "banner-element highlight text");
        element_icon_text.attr("class", "banner-element highlight text");
    };

    // Aww, no more flashy text. :(
    var dehighlight = function(d) {
        element_text.attr("class", "banner-element text");
        element_icon_text.attr("class", "banner-element text");
    };

    // Install the whole shamboozle, and we're good to go.
    element_container.on("mouseover", highlight)
                     .on("mouseout", dehighlight);

    // Return an object so we can manipulate the entire thing later.
    return {
        container: element_container,
        text: element_text,
        icon: element_icon,
        icon_text: element_icon_text
    };
};

banner.divider1 = banner.append_divider(banner.div1_pos + banner.divider_margin_left);
banner.divider2 = banner.append_divider(banner.div2_pos + banner.divider_margin_left);

banner.about_element = banner.append_element(banner.about_pos, "ABOUT", "!");
banner.help_element = banner.append_element(banner.help_pos, "HELP", "?");
banner.toggle_element = banner.append_element(banner.toggle_pos, "TOGGLE", "");


//// EXPORTS ////////////////////////////////////////////////////////////////////

gui.ui_state = 0; // 0 = opaque, 1 = non-opaque

/**
 * "Minimizes" the UI, so that more of the map becomes visible. Is assigned
 * to the "toggle" element in the banner. */
gui.toggleGui = function(d) {
    var elements = [d3.select("#searchbar"), d3.select("#barchart"), d3.select("#linechart"),
        banner.about_element.container, banner.help_element.container, banner.background_expanded,
        banner.divider1, banner.divider2];
    var ui_state_inverse = Math.abs(gui.ui_state - 1);

    gui.gradualOpacity(elements, gui.ui_state);
    gui.gradualOpacity([banner.background_contracted], ui_state_inverse);

    var toggle_text = (gui.ui_state ? "" : "X");
    banner.toggle_element.icon_text.text(toggle_text);
    gui.ui_state = ui_state_inverse;
};

banner.toggle_element.container.on("click", gui.toggleGui);
banner.about_element.container.on("click", gui.showAbout);
