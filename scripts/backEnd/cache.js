/* 
 * cache.js
 * InfoVis Project
 */

/**
 * This namespace provides a simple
 * cache ADT for the backend.
 */

var backEnd = backEnd || {};

/** Construct a cache object. */
backEnd.Cache = function() {};

/** Get an element from the cache */
backEnd.Cache.prototype.get = function(key) {
	if (key in this) return this[key];
	else return null;
};

/** Add an element to the cache */
backEnd.Cache.prototype.put = function(key, value) {
	this[key] = value;
}