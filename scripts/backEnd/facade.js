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

backEnd.fetchAllCountryData = function() {
	backEnd.loadMetros();
	backEnd.forEachCountry(types.Country.prototype.fetchArtistChart);
	backEnd.forEachCountry(types.Country.prototype.fetchTrackChart);
};