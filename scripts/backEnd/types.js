/*
 * types.js
 * InVi Project
 */

/**
 * This namespace provides a bunch of 
 * data types that are used to transport data in the program.
 * I also can't figure out how to do js inheritance in a non-dirty way :(
 */
var types = {};

// --------- //
// Countries //
// --------- //

/**
 * Create a country object.
 * The name and alpha code should follow
 * ISO-3166
 *
 * \param name
 *		The name of the country.
 * \param apha
 *		The alpha-3 code of the country.
 */
types.Country = function(name, alpha) {
	this.name   = name;
	this.alpha  = alpha;

	this.metros = [];

	this.trackChart = [];
	this.artistChart = [];

	this.hasTracks  = false;
	this.hasArtists = false;

	this.metrosComplete  = false;
	this.metrosRequested = false;

};

/** See if the metros of a country have been fetched */
types.Country.prototype.metrosReady = function() {
	return this.metrosComplete;
};
/** See if the artists of a country are present */
types.Country.prototype.artistsReady = function() {
	return (this.hasArtists) && (this.artistChart.length > 0);
};
/** See if the tracks of a country are present */
types.Country.prototype.tracksReady = function() {
	return (this.hasTracks) && (this.trackChart.length > 0);
};

/** Fetch the top artists of a country */
types.Country.prototype.fetchArtistChart = function() {
	if (!this.hasArtists) {
		this.hasArtists = true;
		var c = this;

		var url = backEnd.countryTopArtistUrl(this.name, backEnd.chartLength);
		var fun = function(res) {
			c.artistChart = backEnd.createArtistChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Fetch the top tracks of a country */
types.Country.prototype.fetchTrackChart = function() {
	if (!this.hasTracks) {
		this.hasTracks = true;
		var c = this;

		var url = backEnd.countryTopTrackUrl(this.name, backEnd.chartLength);
		var fun = function(res) {
			c.trackChart = backEnd.createTrackChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Get the top track of a country */
types.Country.prototype.getTopTrack = function() {
	if (this.tracksReady()) {
		return this.trackChart[0];
	} else {
		return null;
	}
};

/** Get the top artist of a country */
types.Country.prototype.getTopArtist = function() {
	if (this.artistsReady()) {
		return this.artistChart[0];
	} else {
		return null;
	}
};

/** Find a track with a name in the track chart of this country */
types.Country.prototype.findTrack = function(name) {
	return backEnd.findName(this.trackChart, name)
};

/** Find a track with a name in the artist chart of this country */
types.Country.prototype.findArtist = function(name) {
	return backEnd.findName(this.artistChart, name);
};

// ------ //
// Metros //
// ------ //

/**
 * Represents a metro.
 * A metro is part of a country.
 */
types.Metro = function(name, country) {
	this.name = name;
	this.country = country;

	this.trackChart = [];
	this.artistChart = [];

	this.hasTracks  = false;
	this.hasArtists = false;
};

/** See if the artists of a metro are present */
types.Metro.prototype.artistsReady = function() {
	return (this.hasArtists) && (this.artistChart.length > 0);
};
/** See if the tracks of a metro are present */
types.Metro.prototype.tracksReady = function() {
	return (this.hasTracks) && (this.trackChart.length > 0);
};

/** Fetch the top artists of a metro */
types.Metro.prototype.fetchArtistChart = function() {
	if (!this.hasArtists) {
		this.hasArtists = true;
		var m = this;

		var url = backEnd.metroTopArtistUrl(this.country.name, this.name, backEnd.chartLength);
		var fun = function(res) {
			m.trackChart = backEnd.createArtistChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Fetch the top tracks of a metro */
types.Metro.prototype.fetchTrackChart = function() {
	if (!this.hasTracks) {
		this.hasTracks = true;
		var c = this;

		var url = backEnd.metroTopTrackUrl(this.country.name, this.name, backEnd.chartLength);
		var fun = function(res) {
			c.trackChart = backEnd.createTrackChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Get the top track of a metro */
types.Metro.prototype.getTopTrack = function() {
	if (this.tracksReady()) {
		return this.trackChart[0];
	} else {
		return null;
	}
};

/** Get the top artist of a metro */
types.Metro.prototype.getTopArtist = function() {
	if (this.artistsReady()) {
		return this.artistChart[0];
	} else {
		return null;
	}
};

/** Find a track with a name in the track chart of this metro */
types.Metro.prototype.findTrack = function(name) {
	return backEnd.findName(this.trackChart, name)
};

/** Find a track with a name in the artist chart of this metro */
types.Metro.prototype.findArtist = function(name) {
	return backEnd.findName(this.artistChart, name);
};

// ----- // 
// World //
// ----- //

types.World = function() {
	this.trackChart = [];
	this.artistChart = [];

	this.hasTracks  = false;
	this.hasArtists = false;
};

/** Fetch the top artists of the world */
types.World.prototype.fetchArtistChart = function() {
	if (!this.hasArtists) {
		this.hasArtists = true;
		var w = this;

		var url = backEnd.globalTopArtistUrl();
		var fun = function(res) {
			res.topartists = res.artists;
			w.artistChart = backEnd.createArtistChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Fetch the top tracks of the world */
types.World.prototype.fetchTrackChart = function() {
	if (!this.hasTracks) {
		this.hasTracks = true;
		var c = this;

		var url = backEnd.globalTopTrackUrl();
		var fun = function(res) {
			res.toptracks = res.tracks;
			c.trackChart = backEnd.createTrackChart(res);
		}
		backEnd.asyncGet(url, fun);
	}
};

/** Get the global top tracks */
types.World.prototype.getTopTrack = function() {
	if (this.tracksReady()) {
		return this.trackChart[0];
	} else {
		return null;
	}
};

/** Get the global top artist */
types.World.prototype.getTopArtist = function() {
	if (this.artistsReady()) {
		return this.artistChart[0];
	} else {
		return null;
	}
};

/** Find a track with a name in the global track chart */
types.World.prototype.findTrack = function(name) {
	return backEnd.findName(this.trackChart, name)
};

/** Find a track with a name in the global artist chart */
types.World.prototype.findArtist = function(name) {
	return backEnd.findName(this.artistChart, name);
};

// ----------- //
// Information //
// ----------- //

types.Track = function(name, lastFm, artist, position, popularity) {
	this.name = name;
	this.lastFm = lastFm;
	this.artist = artist;
	this.chartPos = position;
	this.popularity = popularity;
};

types.Artist = function(name, lastFm, position, popularity) {
	this.name = name;
	this.lastFm = lastFm;
	this.chartPos = position;
	this.popularity = popularity;

	this.hasTracks = false;
	this.trackChart = [];
};

types.Artist.prototype.fetchTopTracks = function() {
	if (!this.hasTracks) {
		this.hasTracks = true;
		var a = this;

		var url = backEnd.artistTopTracksUrl(this.name, backEnd.chartLength);
		var fun = function(res) {
			console.log(res);
			a.trackChart = backEnd.createTrackChart(res);
		}
	backEnd.asyncGet(url, fun);
	}
};