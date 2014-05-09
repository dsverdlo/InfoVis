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

backEnd.world = new types.World();

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

backEnd.fetchAllMetroDataForCountry = function(country) {
	backEnd.forEachMetro(country, types.Metro.prototype.fetchArtistChart);
	backEnd.forEachMetro(country, types.Metro.prototype.fetchTrackChart);
}

backEnd.fetchAllData = function() {
	backEnd.fetchAllCountryData();
	backEnd.forAllMetros(types.Metro.prototype.fetchTrackChart);
	backEnd.forAllMetros(types.Metro.prototype.fetchArtistChart);
}