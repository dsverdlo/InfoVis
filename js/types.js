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
 * Defines a location.
 */
types.Loc = function(name, country, continent) {
	this.lat = lat; /**< latitude of the location */
	this.lon = lon; /**< longitude of the location */

	this.name      = name;      /**< Name of the location */
	this.country   = country;   /**< Country of the location */
	this.continent = continent; /**< Continent of the location */
};

/**
 * Enum that contains the
 * various continents.
 */
types.Loc.Continents = {
	UNKNOWN : 0,

	ASIA : 1, AFRICA : 2, EUROPE : 3,
	SOUTH_AMERICA : 4, NORTH_AMERICA : 5,
	AUSTRALIA : 6, Antarctica : 7
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