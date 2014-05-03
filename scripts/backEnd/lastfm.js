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

backEnd.lastFm.cache    = new backEnd.Cache();
backEnd.lastFm.URL_PRE  = backEnd.lastFm.URL_BASE        + backEnd.lastFm.URL_METHOD;
backEnd.lastFm.URL_POST = backEnd.lastFm.URL_FORMAT_JSON + backEnd.lastFm.URL_API_KEY;

// ----------- //
// Convenience //
// ----------- //

/** 
 * Creates a URL for the last.fm API.
 *
 * \param method
 *		The method of the request (e.g., artist.artistTopTracks)
 * \param optionList
 *		A list of parameter-value tuples,
 *		general arguments such as the api key
 *		are added by default.
 * \return
 *		The composed url for the request
 */
backEnd.lastFm.createUrl = function(method, optionList) {
	var ns = backEnd.lastFm;
	var url = ns.URL_PRE + method + ns.URL_POST;
	
	for(var i = 0; i < optionList.length; i++) {
		var pair = optionList[i];
		url += "&" + pair[0] + "=" + pair[1];
	}	
	return url;
}

/**
 * Create a HTTP GET request, send it and return
 * the reply it contains. 
 * This doest __not__ happen asynchronously
 *
 * \param url
 *		The url to send the request to.
 * \return
 *		The http response (null if failed)
 */
backEnd.lastFm.getHttp = function(url) {
	var ns = backEnd.lastFm;
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
 * Checks if a Last.FM object contains an error
 * \param object
 *		Object to be checked
 * \return 
 *		True if the object contained an error.
 *		False otherwise.
 */
backEnd.lastFm.containsError = function(object) {
	return (typeof(object) === "undefined") ||
	       (typeof(object.error) === "number");
}	

/*
 * Report an error to the user.
 *
 * \param object
 *		The error object
 * \return
 *		An array containing the error number
 *		and message.
 */
backEnd.lastFm.handleError = function(object) {
	var errorno = object.error;
	var errormsg = object.message;
	
	console.warn("Error %s: %s", errorno, errormsg);
	return [errorno, errormsg];
}

/**
 * Create a request, send it, check
 * if it returned any errors, and
 * return the data it returned.
 *
 * \param method
 *		The method to provide to createUrl
 * \param optionList
 *		The optionList to send to createUrl
 * \return
 *		A last.fm data object, or null
 *		if something went wrong.
 */
backEnd.lastFm.request = function(method, optionList) {
	var ns = backEnd.lastFm;
	var url = ns.createUrl(method, optionList);
	var obj = JSON.parse(ns.getHttp(url));

	if(ns.containsError(obj)) {
		ns.handleError(obj);
		return null;
	} else {
		return obj;
	}
}

// -------- //
// Requests //
// -------- //

/**
 * Get the metros of a country
 * \param country
 *		The name of the country for which we want to receive the metros.
 * \return
 *		The last FM response to this request, in object form.
 */
backEnd.lastFm.getCountryMetros = function(country) {
	var res = backEnd.lastFm.request("geo.getMetros", [["country", country]]);
	return res.metros.metro;
}

/**
 * Get the top artists for a country.
 *
 * \param country 
 *		The country for which we request the data
 * \param limit
 *		The amount of artists you want to fetch.
 * \return
 *		The last FM response to this request, in object form.
 */
backEnd.lastFm.getCountryTopArtists = function(country, limit) {
	var res = backEnd.lastFm.request(
		"geo.getTopArtists", 
		[["country", country],["limit", limit]]
	);
	return res.topartists.artist;
}

/**
 * Get the top artists for a metro.
 *
 * \param country
 *		The country of the metro.
 * \param metro
 *		The name of the metro.
 * \param limit
 *		The amount of artists you want to fetch.
 * \return
 *		The last FM response to this request, in object form.
 */
backEnd.lastFm.getMetroTopArtists = function(country, metro, limit) {
	var res = backEnd.lastFm.request(
		"geo.getMetroArtistChart", 
		[["country", country], ["metro", metro]]
	);
	return res.topartists.artist;
}

/**
 * Get the top tracks for a country.
 *
 * \param country 
 *		The country for which we request the data
 * \param limit
 *		The amount of tracks you want to fetch.
 * \return
 *		The last FM response to this request, in object form.
 */
backEnd.lastFm.getCountryTopTracks = function(country, limit) {
	var res = backEnd.lastFm.request(
		"geo.getTopTracks", 
		[["country", country],["limit", limit]]
	);
	return res.toptracks.track;
}

/**
 * Get the top tracks for a metro.
 *
 * \param country
 *		The country of the metro.
 * \param metro
 *		The name of the metro.
 * \param limit
 *		The amount of tracks you want to fetch.
 * \return
 *		The last FM response to this request, in object form.
 */
backEnd.lastFm.getMetroTopTracks = function(country, metro, limit) {
	var res = backEnd.lastFm.request(
		"geo.getMetroTrackChart", 
		[["country", country], ["metro", metro]]
	);
	return res.toptracks.track;
}