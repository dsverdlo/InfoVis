// facade.js
// InVi Project

/**
 * This module provides a facade to interact with
 * the backend. 
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
 * Defines the "world" location
 * to get global information.
 */
backEnd.Locations = {
	WORLD : 'World'
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
	return "Shit's on fire yo"
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
backEnd.getPopularity = function (type, location, identifier){
	return "top kek"
}
