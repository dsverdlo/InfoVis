/* 
 * lastfm.js
 * InfoVis Project
 */

/**
 * This namespace provides the various requests
 * that fetch data from the last.fm api.
 */

var backEnd = backEnd || {};
backEnd.lastFm = backEnd.lastFm || {};

// --------- //
// Constants //
// --------- //

backEnd.lastFm.URL_BASE = "http://ws.audioscrobbler.com/2.0/";
backEnd.lastFm.URL_METHOD = "?method=";
backEnd.lastFm.URL_FORMAT_JSON = "&format=json";
backEnd.lastFm.URL_API_KEY = "&api_key=46d561a6de9e5daa380db343d40ffbab";

// -------------- //
// Namespace Data //
// -------------- //

var ns = backEnd.lastFm;
ns.cache = new backEnd.Cache();
ns.URL_PRE = ns.URL_BASE + ns.URL_METHOD;
ns.URL_POST = ns.URL_FORMAT_JSON + ns.URL_API_KEY;

// ----------- //
// Convenience //
// ----------- //

/* 
 * createUrl - Creates the url for the GET request.
 * @param method - The method of the request (e.g., artist.artistTopTracks)
 * @param optionList - A list of parameter-value tuples
 * @return url - The composited url for the request
 */
ns.createUrl = function(method, optionList) {
	var url = ns.URL_PRE + method + ns.URL_POST;
	
	for(var i = 0; i < optionList.length; i++) {
		var pair = optionList[i];
		url += "&" + pair[0] + "=" + pair[1];
	}	
	return url;
}

/*
 * getHttp - Sends the HTTP GET request.
 * @param url - Url for the request
 * @return response - The http response (null if failed)
 */
ns.getHttp = function(url) {
	var cacheRes = ns.cache.get(url);
	if (cacheRes) return cacheRes;

    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
	
	try {
		var res = request.responseText;
		ns.cache.put(url, res);
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
ns.containsError = function(object) {
	return (typeof(object) === "undefined") ||
	       (typeof(object.error) === "number");
}	

/*
 * handleError - If there was an error from Last.FM, this function extracts it
 * @param object - The error object
 * @return list of error number and message
 */
ns.handleError = function(object) {
	var errorno = object.error;
	var errormsg = object.message;
	
	console.warn("Error %s: %s", errorno, errormsg);
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
	var url = ns.createUrl("geo.getMetros", [["country", location]]);
	var obj = JSON.parse(ns.getHttp(url));
	
	if(ns.containsError(obj)) {
		return ns.handleError(obj)
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
	var url = ns.createUrl("artist.getTopTracks", [["artist",artist]]);
	
	var obj = JSON.parse(ns.getHttp(url));
	
	if(ns.containsError(obj)) {
		return ns.handleError(obj);
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
	var url = ns.createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro]]);
	
	var obj = JSON.parse(ns.getHttp(url));
	
	if(ns.containsError(obj)) {
		return ns.handleError(obj);
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
	var url = ns.createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro], ["start", from],["end", to]]);
	
	var obj = JSON.parse(ns.getHttp(url));
	
	if(ns.containsError(obj)) {
		return ns.handleError(obj);
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
	var url = ns.createUrl("geo.getTopArtists", [["country", country],["limit", limit]]);
	var obj = JSON.parse(ns.getHttp(url));

	if(ns.containsError(obj)) return ns.handleError(obj);
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
	var url = ns.createUrl("geo.getTopTracks", [["country", country],["limit", limit]]);
	var obj = JSON.parse(ns.getHttp(url));

	if(ns.containsError(obj)) return ns.handleError(obj);
	return obj.toptracks.track
}

/**
 * Fetches the top track list for 
 * every country that we have data about.
 */
function getGlobalTopTracks() {
	var cacheRes = ns.cache.get("globTopTracks");
	if (cacheRes) return cacheRes;

	var result = [];
	var countries = backEnd.countryList;

	for (var i = 0; i < countries.length; i++) {
		var country = countries[i];
		var res = getCountryTopTracks(country.name, 1);
		result.push({'country' : country, 'track': res});
	};

	ns.cache.put("globTopTracks", result)
	return result;
}

/**
 * Fetches the top track list for 
 * every country that we have data about.
 */
function getGlobalTopArtists() {
	var cacheRes = ns.cache.get("globTopArtists");
	if (cacheRes) return cacheRes;

	var result = [];
	var countries = backEnd.countryList;

	for (var i = 0; i < countries.length; i++) {
		var country = countries[i];
		var res = getCountryTopArtists(country.name, 1);
		result.push({'country' : country, 'artist': res});
	};

	ns.cache.put("globTopArtists", result)
	return result;
}
