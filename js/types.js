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
 * Defines a popularity object.
 * A popularity object contains the data
 * about an element, like it's location and popularity
 * at that location.
 */
types.Popularity = function(name, location, rating, type) {
	this.location = location
	this.rating   = rating
	this.type     = type
	this.name     = name
}

/**
 * See if the location is global.
 * A global location is added to objects
 * which have information about the entire world.
 */
types.Popularity.prototype.isGlobal() {
	return this.location == backEnd.Locations.WORLD
}