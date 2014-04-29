/*
 * facade.js
 * InfoVis Project
 */

/**
 * This namespace provides a facade to
 * interact with the backend. 
 */
var backEnd = {}

/**
 * Get the current top objects
 * of type at the location.
 *
 * \param type
 * 		The type of the data you want to request.
 *		A types.Information.Type element.
 * \param location
 *		The location to retrieve data for.
 *		Should be a types.Loc instance, 
 *		or a types.Loc.Continents element.
 *		Use types.Loc.Continents.UNKNOWN to request 
 *		global information.
 */
backEnd.getTop = function(type, location){
	var loc1 = new types.Loc("Brussels", "Belgium", types.Loc.Continents.EUROPE, 50, 4);
	var loc2 = new types.Loc("London", "United Kingdom", types.Loc.Continents.EUROPE, 51, 0);
	var loc3 = new types.Loc("New York", "USA", types.Loc.Continents.NORTH_AMERICA, 40, 74);

	return [
		new types.Information("Parov Stelar", types.Information.Types.ARTIST, 0.9, loc1),
		new types.Information("At The Flamingo Bar", types.Information.Types.TRACK, 0.7, loc2),
		new types.Information("The Invisible Girl", types.Information.Types.ALBUM, 0.6, loc3)
	]
},

/**
 * Get the popularity of a given
 * resource.
 *
 * \param type
 *		The type of data you want to request.
 *		A types.Information.Type element.
 * \param location
 *		The location you want to request data from.
 * \param identifier
 *		The identifier of the resource you want to request.
 */
backEnd.getPopularity = function (type, location, searchTerm){
}


/*
Trending:
	- getHypedArtists
	- getHypedTracks

Popularity:
	- getPopularityForArtist
	- getPopularityForAlbum
	- getPopularityForTrack
*/