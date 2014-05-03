/*
 * types.js
 * InVi Project
 */

/**
 * This namespace provides a bunch of 
 * data types that are used to transport data in the program.
 */
var types = {}

// --------- //
// Locations //
// --------- //

/**
 * Create a country object.
 * The name and alpha code should follow
 * ISO-3166
 *
 * \param name
 *		The name of the country.
 * \param apha
 *		The alpha-3 code of the country.
 */
types.Country = function(name, alpha) {
	this.name   = name;
	this.alpha  = alpha;

	this.hasMetros = false;
	this.metros = [];

	this.trackChart = [];
	this.artistChart = [];
};

/**
 * Add the metro list to this country.
 * This operation utilizes a synchronous request.
 */
types.Country.prototype.fetchMetros = function() {
	if (!this.hasMetros) {
		this.metros = backEnd.operations.metrosForCountry(this);
		this.hasMetros = true;
	}
};

types.Country.prototype.fetchArtistChart = function() {
	if (this.artistChart.length == 0) {
		this.artistChart = backEnd.operations.artistChartForCountry(this);
	}
};

types.Country.prototype.fetchTrackChart = function() {
	if (this.trackChart.length == 0) {
		this.trackChart = backEnd.operations.trackChartForCountry(this);
	}
};

/**
 * Define a metro.
 * A metro simply contains 
 * it's name and country.
 */
types.Metro = function(name, country) {
	this.name = name;
	this.country = country;

	this.trackChart = [];
	this.artistChart = [];
};

types.Metro.prototype.fetchArtistChart = function() {
	if (this.artistChart.length == 0) {
		this.artistChart = backEnd.operations.artistChartForMetro(this);
	}
};

types.Metro.prototype.fetchTrackChart = function() {
	if (this.trackChart.length == 0) {
		this.trackChart = backEnd.operations.trackChartForMetro(this);
	}
};

// ----------- //
// Information //
// ----------- //

types.Track = function(name, artist, position, popularity) {
	this.name = name;
	this.artist = artist;
	this.chartPos = position;
	this.popularity = popularity;
};

types.Artist = function(name, position, popularity) {
	this.name = name;
	this.chartPos = position;
	this.popularity = popularity;
}