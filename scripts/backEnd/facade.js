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
};

/** Get a country object by it's name. */
backEnd.getCountryByName = function(name) {
	return backEnd.countryDict[name];
};

/** Fetch all the global data */
backEnd.fetchGlobalData = function() {
	backEnd.world.fetchArtistChart();
	backEnd.world.fetchTrackChart();
};

/** Fetch all the data of all the countries */
backEnd.fetchAllCountryData = function() {
	backEnd.loadMetros();
	backEnd.forEachCountry(types.Country.prototype.fetchArtistChart);
	backEnd.forEachCountry(types.Country.prototype.fetchTrackChart);
};

/** Fetch the data of all the metros */
backEnd.fetchAllMetroData = function() {
	backEnd.forAllMetros(types.Metro.prototype.fetchTrackChart);
	backEnd.forAllMetros(types.Metro.prototype.fetchArtistChart);
};

/** Fetch all the data */
backEnd.fetchAllData = function() {
	backEnd.fetchAllCountryData();
	backEnd.fetchGlobalData();
	backEnd.fetchAllMetroData();
};

backEnd.fetchAllData();