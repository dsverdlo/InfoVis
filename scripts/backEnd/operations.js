/* 
 * operations.js
 * InfoVis Project
 */

/**
 * This namespace implements most of the
 * functionality that the backed offers, using
 * the replies from the last fm api.
 */

var backEnd = backEnd || {};
backEnd.operations = backEnd.operations || {};

/** Calculate a popularity, based on a ranking in the charts. */
backEnd.operations.calculatePopularity = function(position, chartLength) {
	return (chartLength - position) / chartLength;
}

/* Call a certain method on every country */
backEnd.operations.procGlobal = function(proc) {
	for (var i = 0; i < backEnd.countryList.length; i++) {
		proc.call(backEnd.countryList[i]);
	};	
}

/**
 * Call a certain method on every metro of a country.
 * This function assumes metros have already been added.
 */
backEnd.operations.procMetros = function(country, proc) {
	var metros = country.metros;
	for (var i = 0; i < metros.length; i++) {
		proc.call(metros[i]);
	};
}

/** Add the artist chart to every country */
backEnd.operations.addGlobalArtistCharts = function() {
	backEnd.operations.procGlobal(types.Country.prototype.fetchArtistChart);
}

/** Add the track chart to every country */
backEnd.operations.addGlobalTrackCharts = function() {
	backEnd.operations.procGlobal(types.Country.prototype.fetchTrackChart);
}

/** Add the artist chart to every metro in a country */
backEnd.operations.addMetroArtistCharts = function(country) {
	backEnd.operations.procMetros(country, types.Metro.prototype.fetchArtistChart);
}

/** Add the track chart to every metro in a country */
backEnd.operations.addMetroTrackCharts = function(country) {
	backEnd.operations.procMetros(country, types.Metro.prototype.fetchTrackChart);
}

/**
 * Fetch all the metros and add them to the countries they belong to. 
 * Use this instead of procGlobal to save some time.
 */
backEnd.operations.addAllMetros = function() {
	var metros = backEnd.lastFm.getAllMetros();

	for (var i = 0; i < metros.length; i++) {
		var obj = metros[i];
		var cnt = backEnd.getCountryByName(obj.country);
		var mtr = new types.Metro(obj.name, cnt);
		cnt.metros.push(mtr);
	};

	for (var i = 0; i < backEnd.countryList.length; i++) {
		backEnd.countryList[i].hasMetros = true;
	};
}

/**
 * Fetch the metros for a country object.
 * 
 * \param country
 *		A valid country object.
 * \return
 *		An array with a metro object for every
 *		metro in this country.
 */
backEnd.operations.metrosForCountry = function(country) {
	var metros = backEnd.lastFm.getCountryMetros(country.name);

	for (var i = 0; i < metros.length; i++) {
		var name = metros[i].name;
		metros[i] = new types.Metro(name, country);
	}
	return metros;
}

/**
 * Create an array of track objects
 * from a chart array.
 */ 
backEnd.operations.procTrackChart = function(chart) {
	for (var i = 0; i < chart.length; i++) {
		var track = chart[i];
		track = new types.Track(
			track.name,
			track.url,
			track.artist.name,
			i + 1,
			backEnd.operations.calculatePopularity(i, chart.length)
		);
		chart[i] = track;
	}
	return chart;
}

/**
 * Create an array of artist objects
 * from a chart array.
 */ 
backEnd.operations.procArtistChart = function(chart) {
	for (var i = 0; i < chart.length; i++) {
		var artist = chart[i];
		artist = new types.Artist(
			artist.name,
			artist.url,
			i + 1,
			backEnd.operations.calculatePopularity(i, chart.length)
		);
		chart[i] = artist;
	}
	return chart;
}

/**
 * Fetch the track chart for a country.
 * Create an array of track objects with the
 * relevant information.
 * 
 * \param country
 *		A valid country object.
 * \return
 *		An array with track objects.
 */
backEnd.operations.trackChartForCountry = function(country) {
	var chart = backEnd.lastFm.getCountryTopTracks(country.name, backEnd.chartLength);
	return backEnd.operations.procTrackChart(chart);
}

/**
 * Fetch the track chart for a metro.
 * Returns an array of track objects with
 * the relevan information.
 * \param metro
 *		A valid metro object.
 * \return
 *		An array with track objects.
 */
backEnd.operations.trackChartForMetro = function(metro) {
	var chart = backEnd.lastFm.getMetroTopTracks(
		metro.country.name, 
		metro.name,
		backEnd.chartLength);
	return backEnd.operations.procTrackChart(chart);
}

/**
 * Fetch the artist chart for a country.
 * Create an array of artist objects with the
 * relevant information.
 * 
 * \param country
 *		A valid country object.
 * \return
 *		An array with artist objects.
 */
backEnd.operations.artistChartForCountry = function(country) {
	var chart = backEnd.lastFm.getCountryTopArtists(country.name, backEnd.chartLength);
	return backEnd.operations.procArtistChart(chart);
}

/**
 * Fetch the artist chart for a metro.
 * Returns an array of artist objects with
 * the relevan information.
 * \param metro
 *		A valid metro object.
 * \return
 *		An array with artist objects.
 */
backEnd.operations.artistChartForMetro = function(metro) {
	var chart = backEnd.lastFm.getMetroTopArtists(
		metro.country.name, 
		metro.name,
		backEnd.chartLength);
	return backEnd.operations.procArtistChart(chart);
}