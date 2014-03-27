/*
 * types.js
 * InVi Project
 */

/**
 * This namespace provides a bunch of 
 * data types that are used to transport data in the program.
 */
var types = {}

/**
 * Defines a data object.
 * A data object contains the data
 * about an element at a given location,
 * like it's location and popularity
 * at that location.
 */
types.DataElement = function(name, location, country, rating, type) {
	this.location = location
	this.country  = country
	this.rating   = rating
	this.type     = type
	this.name     = name
}

/**
 * See if the location is global.
 * A global location is added to objects
 * which have information about the entire world.
 */
types.DataElement.prototype.isGlobal = function() {
	return this.location == backEnd.Locations.WORLD
}