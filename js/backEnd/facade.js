// facade.js
// InVi Project

/**
 * This module provides a facade to interact with
 * the backend. 
 */

var Artist = 0;
var Album  = 1;
var Track  = 2;

var World  = 'WORLD';

/**
 * Get the currently trending objects
 * of type at the location.
 *
 * \param type
 * 		The type of the data you want to request
 * \param location
 *		The location to retrieve data for.
 */
function getTrending(type, location){
}

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
function getPopularity(type, location, identifier){
}
