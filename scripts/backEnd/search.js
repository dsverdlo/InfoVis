var backEnd = backEnd || {};
var gui = gui || {};

function search() {
	var artistName = document.getElementById("searchinput").value;

	backEnd.countryList.map(function(country) {
		var artist = country.findArtist(artistName);

		if (artist != null) {
			var longitude  = country.longitude;
			var latitude   = country.latitude;
			var popularity = artist.popularity;
	
			gui.drawBubble(artistName, longitude, latitude, popularity);
		};
	});
};
