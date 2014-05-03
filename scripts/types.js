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
	this.name  = name;
	this.alpha = alpha;
};

/**
 * Define a metro.
 * A metro simply contains 
 * it's name and country.
 */
types.Metro = function(name, country) {
	this.name = name;
	this.country = country;
};

// ----------- //
// Information //
// ----------- //

/**
 * Defines information.
 * An information prototype contains the required
 * data for visualizing a single point of information
 * on the map.
 */
types.Information = function(name, type, rating, loc) {
	this.loc = loc;       /**< A location object */
	this.type = type;     /**< The type of the data we are showing */
	this.name = name;     /**< The name of the data (e.g. a song title) */
	this.rating = rating; /**< The rating of our piece of data, a float between 0 and 1 */
};

/**
 * Defines the different data types
 * we can get information about.
 */
types.Information.Types = {
	ARTIST : 0,
	ALBUM  : 1,
	TRACK  : 2	
};