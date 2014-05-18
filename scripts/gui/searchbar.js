function search() {
	var inputfield = document.getElementById('searchinput');
	
	var inputtext = inputfield.value;
	
	// User looks for artist
	backEnd.forEachCountry( function(c) {
		var a = c.findArtist(inputtext);
		if(a !== 'undefined') { 
			console.log('Country: ' + c.name + ' found artist: '+ a.name);
			//display([]);
		} else {
			var t = c.findTrack(inputtext);
			if(t !== 'undefined') {
				// c.drawCircle
				console.log('Country: ' + c.name + ' found track: '+ t.name);
			}
		}
		
		
		
		});
	
}



function gen(artist) {

	artist.fetchTopTracks();
	
	while(!artist.tracksReady()) {
		sleep(0.1);
	}
	
	var tracks = artist.trackChart();
	
	
	var out = "trackname\tposition\n";
	for(var i = 0; i < tracks.length; i++) {
		var track = tracks[i];
		out = out + track.name + "\t" + track.chartPos + "\n";
	}
	
	// write to TSV file
	console.log(out);
	
/*
 track popularity
 hunter 1
 isobel 1
 angel 1
*/

}