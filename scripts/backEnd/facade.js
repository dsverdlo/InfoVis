/*
 * facade.js
 * InfoVis Project
 */

/**
 * This namespace provides a facade to
 * interact with the backend. 
 */
var backEnd = backEnd || {};
backEnd.chartLength = 50;

/** 
 * Get an array containing a 
 * country object for every country.
 */
backEnd.getCountries = function() {
	return backEnd.countryList;
}

/** Get a country object by it's name. */
backEnd.getCountryByName = function(name) {
	return backEnd.countryDict[name];
}

backEnd.loadMetros = backEnd.operations.addAllMetros;
backEnd.addGlobalArtistCharts = backEnd.operations.addGlobalArtistCharts;
backEnd.addGlobalTrackCharts = backEnd.operations.addGlobalTrackCharts;
backEnd.addMetroArtistCharts = backEnd.operations.addMetroArtistCharts;
backEnd.addMetroTrackCharts = backEnd.operations.addMetroTrackCharts;