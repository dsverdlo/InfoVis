/** 
 * facade.js
 * InVi Project
 */

/**
 * This namespace provides a facade to
 * interact with the backend. 
 */
var backEnd = {}

/**
 * Defines the different types
 * of data that you can request.
 */
backEnd.Type = {
	ARTIST : 0,
	ALBUM  : 1,
	TRACK  : 2
};

/**
 * Defines some aggregate locations.
 * These are locations that combine the results
 * of multiple metro's.
 */
backEnd.Locations = {
	WORLD : 0,

	ASIA : 1, AFRICA : 2, EUROPE : 3,
	SOUTH_AMERICA : 4, NORTH_AMERICA : 5,
	AUSTRALIA : 6, Antarctica : 7, OTHER : 8
};

/**
 * Get the currently trending objects
 * of type at the location.
 *
 * \param type
 * 		The type of the data you want to request
 * \param location
 *		The location to retrieve data for.
 */
backEnd.getTrending = function(type, location){
	return [
		types.Popularity('Hipster Trash', 'New York', 'MURRICA', 0.9, type),
		types.Popularity('Hipster Trash', 'Brussels', 'Belgium', 0.9, type),
		types.Popularity('Hipster Trash', 'London', 'UK', 0.9, type)
	]
},

/**
 * Get the popularity of a given
 * resource.
 *
 * \param type
 *		The type of data you want to request.
 * \param location
 *		The location you want to request data from.
 * \param identifier
 *		The identifier of the resource you want to request.
 */
backEnd.getPopularity = function (type, location, searchTerm){
}
