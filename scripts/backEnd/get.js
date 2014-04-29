/* get.js
 * InfoVis Project
 */

/**
 * This namespace provides the various requests
 * that fetch data from the last.fm api.
 */

// --------- //
// Constants //
// --------- //

backEnd.URL_BASE = "http://ws.audioscrobbler.com/2.0/";
backEnd.URL_METHOD = "?method=";
backEnd.URL_FORMAT_JSON = "&format=json";
backEnd.URL_API_KEY = "&api_key=46d561a6de9e5daa380db343d40ffbab";

// ----- //
// Cache //
// ----- //

backEnd.cache = {};

/**
 * See if a key is a part of the cache.
 * \param key
 *		The key to look for.
 * \return
 *		The value for key, if it is present
 *		null if it is not.
 */
backEnd.checkCache = function(key) {
	if (key in backEnd.cache) {
		return backEnd.cache[key];
	} else {
		return null;
	}
}

/**
 * Add a value to the cache.
 */
backEnd.addToCache = function(key, value) {
	backEnd.cache[key] = value;
}

// ----------- //
// Convenience //
// ----------- //

/* 
 * createUrl - Creates the url for the GET request.
 * @param method - The method of the request (e.g., artist.artistTopTracks)
 * @param optionList - A list of parameter-value tuples
 * @return url - The composited url for the request
 */
backEnd.createUrl = function(method, optionList) {
	var url = backEnd.URL_BASE + backEnd.URL_METHOD + method + backEnd.URL_FORMAT_JSON + backEnd.URL_API_KEY;
	
	for(var i = 0; i < optionList.length; i++) {
		var tuple = optionList[i];
		url += "&" + tuple[0] + "=" + tuple[1];
	}
	
	return url;
}

/*
 * getHttp - Sends the HTTP GET request.
 * @param url - Url for the request
 * @return response - The http response (null if failed)
 */
backEnd.getHttp = function(url) {
	var cacheRes = backEnd.checkCache(url);
	if (cacheRes) return cacheRes;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
	
	try {
		var res = xmlHttp.responseText;
		backEnd.addToCache(url, res);
		return res;
	} catch(e) {
		return null;
	}
}

/*
 * containsError - Checks if a Last.FM object contains an error
 * @param object - Object to be checked
 * @return bool - Boolean indicating to containing error or not
 */
backEnd.containsError = function(object) {
	if ( typeof(object) === "undefined" ) return true;
	if ( typeof(object.error) === "number") return true;
	return false;
}	

/*
 * handleError - If there was an error from Last.FM, this function extracts it
 * @param object - The error object
 * @return list of error number and message
 */
backEnd.handleError = function(object) {
	var errorno = object.error;
	var errormsg = object.message;
	
	alert("Error " + errorno + ": " + errormsg);
	return [errorno, errormsg];
}

// -------- //
// Requests //
// -------- //

/*
 * getMetrosFor - Sends a GET request to retrieve list of available metros
 * @param location - Country for which to search on
 * @return metros - List of metros
 *
 */
function getMetrosFor(location) {
	var url = backEnd.createUrl("geo.getMetros", [["country", location]]);
	var obj = JSON.parse(backEnd.getHttp(url));
	
	if(backEnd.containsError(obj)) {
		return backEnd.handleError(obj)
	}
	
	 // Uncomment for debug
	// if(obj.metros.total == 0) {
	// 	return document.writeln("<br>No results found");
	// }
	// metros = obj.metros.metro;
	// for(var i = 0; i < metros.length; i++) {
	// 	var metro = metros[i];
	// 	document.writeln("<br/>" + metro.name);
	// } 
	
	return obj.metros.metro;
}

/*
 * getArtistTopTracks - Gets the most popular tracks for a given artist
 * @param artist - Name of the artist
 * @return - List of tracks
 */
function getArtistTopTracks(artist)
{
	var url = backEnd.createUrl("artist.getTopTracks", [["artist",artist]]);
	
	var obj = JSON.parse(backEnd.getHttp(url));
	
	if(backEnd.containsError(obj)) {
		return backEnd.handleError(obj);
	}
	
	/*
	if(obj.toptracks.total == 0) {
		return document.writeln("<br>No results found");
	}
	
	tracks = obj.toptracks.track;
	for(var i = 0; i < tracks.length; i++) {
		var track = tracks[i];
		document.writeln("<br\>" + (i+1) + ": " + track.name + " - " + track.duration);
	} */
	
	return obj.toptracks;
}

/*
 * getMetroHypeTracks - Get hyped tracks for a given metro
 * @param country - The country of the metro
 * @param metro - The name of the metro
 * @return - List of hyped tracks
 */
function getMetroHypeTracks(country, metro) 
{
	var url = backEnd.createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro]]);
	
	var obj = JSON.parse(backEnd.getHttp(url));
	
	if(backEnd.containsError(obj)) {
		return backEnd.handleError(obj);
	}
	
	/*
	if(obj.toptracks.total == 0) {
		return document.writeln("<br>No results found");
	}
	tracks = obj.toptracks.track;
	for(var i = 0; i < tracks.length; i++) {
		var track = tracks[i];
		document.writeln("<br\>" + (i+1) + ": " + track.name + " - " + track.artist.name);
	} */
	
	return obj.toptracks;
}

/*
 * getTimeTrackChart - Gets the top track chart for a given metro and time
 * @param from - Unix seconds from when the data starts
 * @param to - Unix seconds until which period
 * @param country - Country of the metro
 * @param metro - Metro for which the chart needs to be looked up
 * @return list of top tracks
 */
function getTimeTrackChart(from, to, country, metro) 
{
	var url = backEnd.createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro], ["start", from],["end", to]]);
	
	var obj = JSON.parse(backEnd.getHttp(url));
	
	if(backEnd.containsError(obj)) {
		return backEnd.handleError(obj);
	}
	
	/*
	if(obj.toptracks.total == 0) {
		return document.writeln("<br>No results found");
	}
	tracks = obj.toptracks.track;
	for(var i = 0; i < tracks.length; i++) {
		var track = tracks[i];
		document.writeln("<br\>" + (i+1) + ": " + track.name + " - " + track.artist.name);
	} */
	
	return obj.toptracks;
}

/**
 * Get the top artists for a country.
 *
 * \param country 
 *		The country for which you want to fetch results
 * \param limit
 *		The amount of artists you want to fetch.
 * \return
 *		An array with Last FM artist objects
 */
function getCountryTopArtists(country, limit) {
	var url = backEnd.createUrl("geo.getTopArtists", [["country", country],["limit", limit]]);
	var obj = JSON.parse(backEnd.getHttp(url));

	if(backEnd.containsError(obj)) return backEnd.handleError(obj);
	return obj.topartists.artist
}

/**
 * Get the top tracks for a country.
 *
 * \param country 
 *		The country for which you want to fetch results
 * \param limit
 *		The amount of tracks you want to fetch.
 * \return
 *		An array with Last FM track objects
 */
function getCountryTopTracks(country, limit) {
	var url = backEnd.createUrl("geo.getTopTracks", [["country", country],["limit", limit]]);
	var obj = JSON.parse(backEnd.getHttp(url));

	if(backEnd.containsError(obj)) return backEnd.handleError(obj);
	return obj.toptracks.track
}

/**
 * Fetches the top track list for 
 * every country that we have data about.
 */
function getGlobalTopTracks() {
	var cacheRes = backEnd.checkCache("globTopTracks");
	if (cacheRes) return cacheRes;

	var result = [];
	var countries = backEnd.countryList;

	for (var i = 0; i < countries.length; i++) {
		var country = countries[i];
		var res = getCountryTopTracks(country.name, 1);
		result.push({'country' : country, 'track': res});
	};

	backEnd.addToCache("globTopTracks", result)
	return result;
}

/**
 * Fetches the top track list for 
 * every country that we have data about.
 */
function getGlobalTopArtists() {
	var cacheRes = backEnd.checkCache("globTopArtists");
	if (cacheRes) return cacheRes;

	var result = [];
	var countries = backEnd.countryList;

	for (var i = 0; i < countries.length; i++) {
		var country = countries[i];
		var res = getCountryTopArtists(country.name, 1);
		result.push({'country' : country, 'artist': res});
	};

	backEnd.addToCache("globTopArtists", result)
	return result;
}