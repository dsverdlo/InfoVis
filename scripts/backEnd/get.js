
/*
 * Some variables to construct the Last.FM API urls
 */
URL_BASE = "http://ws.audioscrobbler.com/2.0/";
URL_METHOD = "?method=";
URL_FORMAT_JSON = "&format=json";
URL_API_KEY = "&api_key=46d561a6de9e5daa380db343d40ffbab";


/* 
 * createUrl - Creates the url for the GET request.
 * @param method - The method of the request (e.g., artist.artistTopTracks)
 * @param optionList - A list of parameter-value tuples
 * @return url - The composited url for the request
 */
function createUrl(method, optionList) {
	
	var url = URL_BASE + URL_METHOD + method + URL_FORMAT_JSON + URL_API_KEY;
	
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
function getHttp(url) {
    var xmlHttp = null;
	
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
	
	try {
		return xmlHttp.responseText;
	}
	
	catch(e) {
		return null;
	}
}

/*
 * containsError - Checks if a Last.FM object contains an error
 * @param object - Object to be checked
 * @return bool - Boolean indicating to containing error or not
 */
function containsError(object) {
	if ( typeof(object) === "undefined" ) return true;
	if ( typeof(object.error) === "number") return true;
	return false;
}	

/*
 * handleError - If there was an error from Last.FM, this function extracts it
 * @param object - The error object
 * @return list of error number and message
 */
function handleError(object) {
	var errorno = object.error;
	var errormsg = object.message;
	
	alert("Error " + errorno + ": " + errormsg);
	return [errorno, errormsg];
}

/*
 * getMetrosFor - Sends a GET request to retrieve list of available metros
 * @param location - Country for which to search on
 * @return metros - List of metros
 *
 */
function getMetrosFor(location)
{
	var url = createUrl("geo.getMetros", [["country", location]]);
	
	var obj = JSON.parse(getHttp(url));
	
	if(containsError(obj)) {
		return handleError(obj)
	}
	
	/* // Uncomment for debug
	if(obj.metros.total == 0) {
		return document.writeln("<br>No results found");
	}
	metros = obj.metros.metro;
	for(var i = 0; i < metros.length; i++) {
		var metro = metros[i];
		document.writeln("<br/>" + metro.name);
	} 
	*/
	
	return obj.metros;
}

/*
 * getArtistTopTracks - Gets the most popular tracks for a given artist
 * @param artist - Name of the artist
 * @return - List of tracks
 */
function getArtistTopTracks(artist)
{
	var url = createUrl("artist.getTopTracks", [["artist",artist]]);
	
	var obj = JSON.parse(getHttp(url));
	
	if(containsError(obj)) {
		return handleError(obj);
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
	var url = createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro]]);
	
	var obj = JSON.parse(getHttp(url));
	
	if(containsError(obj)) {
		return handleError(obj);
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
	var url = createUrl("geo.getMetroHypeTrackChart", [["country",country], ["metro", metro], ["start", from],["end", to]]);
	
	var obj = JSON.parse(getHttp(url));
	
	if(containsError(obj)) {
		return handleError(obj);
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

