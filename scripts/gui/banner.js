/* File:      banner.js           *
 * Project:   InfoVis Project     *
 * Author(s): Kenny Deschuyteneer */

var utilities = utilities || {};

// This script creates the banner UI element. The functions that are called
// by the elements in the banner are exported in the utilities namespace, so
// they can be used if need be.

var container = document.getElementById("container-banner");

var widthBanner = parseInt(window.getComputedStyle(container).width, 10),
    heightBanner = parseInt(window.getComputedStyle(container).height, 10);


//// SETTINGS ///////////////////////////////////////////////////////////////////
var margin = widthBanner / 10;

var element_space = ((widthBanner - margin) * 3) / 10;
var divider_space = (widthBanner - margin) / 20;

var about_pos = (margin / 2);
var div1_pos = about_pos + element_space;
var help_pos = div1_pos + divider_space;
var div2_pos = help_pos + element_space;
var toggle_pos = div2_pos + divider_space;

var divider_margin_top = 2;
var divider_height = heightBanner - (2 * divider_margin_top);
var divider_width = 2;
var divider_margin_left = divider_space - (2 * divider_width);

var text_size = heightBanner * (4 / 10);

var icon_radius = (divider_height / 2) - 4;
var text_offset = element_space * (2 / 10);
var icon_offset = element_space - (element_space / 4);


//// UI SETUP ///////////////////////////////////////////////////////////////////
var svgBanner = d3.select("#container-banner").append("svg")
                .attr("width", widthBanner)
                .attr("height", heightBanner);

var background_expanded = utilities.createWidgetCanvas(svgBanner);
var background_contracted = utilities.createWidgetCanvas(svgBanner)
                                .attr("width", element_space + divider_space)
                                .attr("x", toggle_pos)
                                .style("opacity", 0);

var group = svgBanner.append("g")
                    .attr("transform", "translate(" + 0 + "," + (heightBanner / 2) + ")");

function append_divider(position) {
    return group.append("rect")
            .attr("class", "banner-divider")
            .attr("height", divider_height)
            .attr("width", divider_width)
            .attr("x", position)
            .attr("y", - (divider_height / 2));
};

function append_element(position, text, icon_text) {
    // Group the constituents of our element.
    var element_container = group.append("g").style("pointer-events", "all");

    // An invisible rectangle to capture mouse events.
    element_container.append("rect")
        .style("visibility", "hidden")
        .attr("x", position)
        .attr("y", - (heightBanner / 2))
        .attr("width", element_space)
        .attr("height", heightBanner);

    // The text of the element.
    var element_text = element_container.append("text")
        .attr("class", "banner-element text")
        .attr("dy", ".3em")
        .attr("x", position + text_offset)
        .style("text-anchor", "begin")
        .style("font-size", text_size + "px") 
        .style("font-weight", "bold") 
        .text(text);

    // The circle of the icon.
    var element_icon = element_container.append("circle")
        .attr("class", "banner-element icon")
        .attr("cx", position + icon_offset + (divider_height / 2))
        .attr("r", icon_radius);    

    // The text of the icon.
    var element_icon_text = element_container.append("text")
        .attr("class", "banner-element text")
        .attr("x", position + icon_offset + (divider_height / 2))
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("font-size", text_size + "px") 
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

var divider1 = append_divider(div1_pos + divider_margin_left);
var divider2 = append_divider(div2_pos + divider_margin_left);

var about_element = append_element(about_pos, "ABOUT", "!");
var help_element = append_element(help_pos, "HELP", "?");
var toggle_element = append_element(toggle_pos, "TOGGLE", "");

var ui_state = 0; // 0 = opaque, 1 = non-opaque

/**
 * "Minimizes" the UI, so that more of the map becomes visible. Is assigned
 * to the "toggle" element in the banner. */
utilities.toggleGui = function(d) {
    var elements = [d3.select("#searchbar"), d3.select("#barchart"), d3.select("#linechart"),
        about_element.container, help_element.container, background_expanded, divider1, divider2];
    var ui_state_inverse = Math.abs(ui_state - 1);

    utilities.gradualOpacity(elements, ui_state);
    utilities.gradualOpacity([background_contracted], ui_state_inverse);

    var toggle_text = (ui_state ? "" : "X");
    toggle_element.icon_text.text(toggle_text);
    ui_state = ui_state_inverse;
};

toggle_element.container.on("click", utilities.toggleGui);
