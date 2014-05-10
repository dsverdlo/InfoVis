/* 
 * lastfm.js
 * InfoVis Project
 */

var backEnd = backEnd || {};

// --------- //
// Constants //
// --------- //

backEnd.URL_BASE        = "http://ws.audioscrobbler.com/2.0/";
backEnd.URL_METHOD      = "?method=";
backEnd.URL_API_KEY     = "&api_key=46d561a6de9e5daa380db343d40ffbab";
backEnd.URL_FORMAT_JSON = "&format=json";

// -------------- //
// Namespace Data //
// -------------- //

backEnd.URL_PRE  = backEnd.URL_BASE        + backEnd.URL_METHOD;
backEnd.URL_POST = backEnd.URL_FORMAT_JSON + backEnd.URL_API_KEY;

// -------- //
// Requests //
// -------- //

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
backEnd.createUrl = function(method, optionList) {
	var url = backEnd.URL_PRE + method + backEnd.URL_POST;
	
	for(var i = 0; i < optionList.length; i++) {
		var pair = optionList[i];
		url += "&" + pair[0] + "=" + pair[1];
	}	
	return url;
};

/*
 * Checks if a Last.FM object contains an error
 * \param object
 *		Object to be checked
 * \return 
 *		True if the object contained an error.
 *		False otherwise.
 */
backEnd.containsError = function(object) {
	return (typeof(object) === "undefined") ||
		   (typeof(object.error) === "number");
};

/*
 * Report an error to the user.
 *
 * \param object
 *		The error object
 * \return
 *		An array containing the error number
 *		and message.
 */
backEnd.handleError = function(object) {
	var errorno = object.error;
	var errormsg = object.message;
	
	console.warn("Error %s: %s", errorno, errormsg);
	return [errorno, errormsg];
};

/**
 * Perform an asynchronous get request.
 * The proc operation will be called when the
 * request is successful. It will receive the 
 * json version of the response as argument.
 */
backEnd.asyncGet = function(url, proc) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			try {
				var res = request.responseText;
				var obj = JSON.parse(res);

				if (backEnd.containsError(obj)) {
					backEnd.handleError(obj)
				} else {
					proc(obj);
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
	request.send()
};

// ----- //
// Url's //
// ----- //

/** Url to get all the metros */
backEnd.metrosUrl = function() {
	return backEnd.createUrl("geo.getMetros", []);
};

/** Create a url to get the top tracks of an artist */
backEnd.artistTopTracksUrl = function(artist, limit) {
	return backEnd.createUrl("artist.getTopTracks", [["artist", artist], ["limit", limit]]);
};

/** Create a url to get the global top artists */
backEnd.globalTopArtistUrl = function() {
	return backEnd.createUrl("chart.getTopArtists", []);
};

/** Create an url to get the top artists of a country */
backEnd.countryTopArtistUrl = function(country, limit) {
	return backEnd.createUrl("geo.getTopArtists", 
		[["country", country],["limit", limit]]);
};

/** Create an url to get the top artists of a metro */
backEnd.metroTopArtistUrl = function(country, metro, limit) {
	return backEnd.createUrl("geo.getMetroArtistChart", 
		[["country", country], ["metro", metro], ["limit", limit]]);
};

/** Create a url to get the global top tracks */
backEnd.globalTopTrackUrl = function() {
	return backEnd.createUrl("chart.getTopTracks", []);
};

/** Create an url to get the top tracks of a country */
backEnd.countryTopTrackUrl = function(country, limit) {
	return backEnd.createUrl("geo.getTopTracks",
		[["country", country],["limit", limit]]);
};

/** Create an url to get the top tracks of a metro */
backEnd.metroTopTrackUrl = function(country, metro, limit) {
	return backEnd.createUrl("geo.getMetroTrackChart", 
		[["country", country], ["metro", metro], ["limit", limit]]);
};

// ----------- //
// Convenience //
// ----------- //

/** Calculate a popularity, based on a ranking in the charts. */
backEnd.calculatePopularity = function(position, chartLength) {
	return (chartLength - position) / chartLength;
};

/* Call a certain method on every country */
backEnd.forEachCountry = function(proc) {
	for (var i = 0; i < backEnd.countryList.length; i++) {
		proc.call(backEnd.countryList[i]);
	};	
};

/**
 * Call a certain method on every metro of a country.
 * This function assumes metros have already been added.
 */
backEnd.forEachMetro = function(country, proc) {
	var metros = country.metros;
	for (var i = 0; i < metros.length; i++) {
		proc.call(metros[i]);
	};
};

/**
 * Call a method on every metro of every
 * country.
 */
backEnd.forAllMetros = function(proc) {
	backEnd.forEachCountry(function() {backEnd.forEachMetro(this, proc)});
};

/** Find an element in a chart */
backEnd.findName = function(chart, name) {
	for (var i = 0; i < chart.length; i++) {
		var obj = chart[i];
		if (obj.name == name) {
			return obj;
		}
	};
	return null;
}

/**
 * Create an array of track objects
 * from a chart array.
 */ 
backEnd.createTrackChart = function(res) {
	if ('#text' in res.toptracks) return [];
	var chart = res.toptracks.track;

	for (var i = 0; i < chart.length; i++) {
		var track = chart[i];
		track = new types.Track(
			track.name,
			track.url,
			track.artist.name,
			i + 1,
			backEnd.calculatePopularity(i, chart.length)
		);
		chart[i] = track;
	}
	return chart;
};

/**
 * Create an array of artist objects
 * from a chart array.
 */ 
backEnd.createArtistChart = function(res) {
	if ('#text' in res.topartists) return [];
	var chart = res.topartists.artist;

	for (var i = 0; i < chart.length; i++) {
		var artist = chart[i];
		artist = new types.Artist(
			artist.name,
			artist.url,
			i + 1,
			backEnd.calculatePopularity(i, chart.length)
		);
		chart[i] = artist;
	}
	return chart;
};

// -------- //
// Requests //
// -------- //

/** Fetch all the metros and add them to the countries they belong to. */
backEnd.loadMetros = function() {
	backEnd.forEachCountry(function() {this.metrosRequested = true});
	var url = backEnd.metrosUrl();

	var fun = function(res) {
		var metros = res.metros.metro;	
		for (var i = 0; i < metros.length; i++) {
			var obj = metros[i];
			var cnt = backEnd.getCountryByName(obj.country);
			var mtr = new types.Metro(obj.name, cnt);
			cnt.metros.push(mtr);
		}
		backEnd.forEachCountry(function() {this.metrosComplete = true});
	}
	backEnd.asyncGet(url, fun);
};