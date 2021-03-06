/* Countries.js
 * This list simply provides a json
 * list of countries along with their
 * alpha-3 code (as defined in ISO-3166)
 */

var backEnd = backEnd || {};

backEnd.countryList = [
	new types.Country("Afghanistan","AFG", 33, 65),
	new types.Country("Åland Islands","ALA", -12.5, 18.5),
	new types.Country("Albania","ALB", 41, 20),
	new types.Country("Algeria","DZA", 28,3),
	new types.Country("American Samoa","ASM",-14.3064071,-170.6950175),
	new types.Country("Andorra","AND", 42.5, 1.5),
	new types.Country("Angola","AGO",-11.2135241,17.877),
	new types.Country("Anguilla","AIA",18.2179006,-63.068),
	new types.Country("Antarctica","ATA",-90,0),
	new types.Country("Antigua and Barbuda","ATG",17.0869391,-61.783),
	new types.Country("Argentina","ARG", -34, -64),
	new types.Country("Armenia","ARM", 40, 45),
	new types.Country("Aruba","ABW",12.517572,-69.964946),
	new types.Country("Australia","AUS", 500, 90),
	new types.Country("Austria","AUT", 47.33333333,13.33333333),
	new types.Country("Azerbaijan","AZE", 40.5,47.5),
	new types.Country("Bahamas","BHS", 24.25,-76),
	new types.Country("Bahrain","BHR",25.9434256,50.6014),
	new types.Country("Bangladesh","BGD", 24,90),
	new types.Country("Barbados","BRB",13.1900628,-59.535),
	new types.Country("Belarus","BLR",53,28),
	new types.Country("Belgium","BEL", 13,-220),
	new types.Country("Belize","BLZ",17.25,-88.75),
	new types.Country("Benin","BEN", 9.5,2.25),
	new types.Country("Bermuda","BMU",32.3191775,-64.767),
	new types.Country("Bhutan","BTN",27.5,90.5),
	new types.Country("Bolivia","BOL",-17,-65),
	new types.Country("Bonaire, Sint Eustatius and Saba","BES",12.1683718,-68.3081),
	new types.Country("Bosnia and Herzegovina","BIH",44,18),
	new types.Country("Botswana","BWA",-22,24),
	new types.Country("Bouvet Island","BVT",-54.4205146,3.36138),
	new types.Country("Brazil","BRA",-10,-55),
	new types.Country("British Indian Ocean Territory","IOT",-7.3347556,72.424),
	new types.Country("Brunei Darussalam","BRN",4.5,114.66666666),
	new types.Country("Bulgaria","BGR", 43,25),
	new types.Country("Burkina Faso","BFA", 13,-2),
	new types.Country("Burundi","BDI", -3.5,30),
	new types.Country("Cambodia","KHM",13,105),
	new types.Country("Cameroon","CMR",6,12),
	new types.Country("Canada","CAN",-420,-270),
	new types.Country("Cape Verde","CPV",16,-24),
	new types.Country("Cayman Islands","CYM",19.3298586,-81.2523),
	new types.Country("Central African Republic","CAF",7,21),
	new types.Country("Chad","TCD",15,19),
	new types.Country("Chile","CHL",-30,-71),
	new types.Country("China","CHN",380,-150),
	new types.Country("Christmas Island","CXR",-10.4912311,105.62),
	new types.Country("Colombia","COL",4,-72),
	new types.Country("Comoros","COM",-12.16666666,44.25),
	new types.Country("Congo","COG",-1,15),
	new types.Country("Congo, the Democratic Republic of the","COD",-1,15),
	new types.Country("Cook Islands","COK",-21.2358796,-159.77788),
	new types.Country("Costa Rica","CRI",10,-84),
	new types.Country("Côte d'Ivoire","CIV",7.54,-5.54),
	new types.Country("Croatia","HRV",45.16666666,15.5),
	new types.Country("Cuba","CUB",21.5,-80),
	new types.Country("Curaçao","CUW",12.2133809,-68.949),
	new types.Country("Cyprus","CYP",35,33),
	new types.Country("Czech Republic","CZE",49.75,15.5),
	new types.Country("Denmark","DNK",56,10),
	new types.Country("Djibouti","DJI",11.5,43),
	new types.Country("Dominica","DMA",15.41666666,-61.33333333),
	new types.Country("Dominican Republic","DOM",19,-70.66666666),
	new types.Country("Ecuador","ECU",-2,-77.5),
	new types.Country("Egypt","EGY",27,30),
	new types.Country("El Salvador","SLV",13.83333333,-88.91666666),
	new types.Country("Equatorial Guinea","GNQ",2,10),
	new types.Country("Eritrea","ERI",15,39),
	new types.Country("Estonia","EST",59,26),
	new types.Country("Ethiopia","ETH",8,38),
	new types.Country("Falkland Islands (Malvinas)","FLK",-51.75,-59),
	new types.Country("Faroe Islands","FRO",61.8925022,-6.972970),
	new types.Country("Fiji","FJI",-18,175),
	new types.Country("Finland","FIN",100,-320),
	new types.Country("France","FRA",5,-200),
	new types.Country("French Guiana","GUF",3.9332383,-53.08757),
	new types.Country("French Polynesia","PYF",-17.68,-149.37),
	new types.Country("French Southern Territories","ATF",-49.1306765,69.58281),
	new types.Country("Gabon","GAB",-1,11.75),
	new types.Country("Gambia","GMB",13.46666666,-16.56666666),
	new types.Country("Georgia","GEO",42,43.5),
	new types.Country("Germany","DEU",51,9),
	new types.Country("Ghana","GHA",8,-2),
	new types.Country("Gibraltar","GIB",36.1319767,-5.3529),
	new types.Country("Greece","GRC",39,22),
	new types.Country("Greenland","GRL",72,-40),
	new types.Country("Grenada","GRD",12.1099659,-61.69),
	new types.Country("Guadeloupe","GLP",16.1730949,-61.40),
	new types.Country("Guam","GUM",13.4502076,144.787),
	new types.Country("Guatemala","GTM",15.5,-90.25),
	new types.Country("Guernsey","GGY",49.4630653,-2.588),
	new types.Country("Guinea","GIN",11,-10),
	new types.Country("Guinea-Bissau","GNB",12,-15),
	new types.Country("Guyana","GUY",5,-59),
	new types.Country("Haiti","HTI",19,-72.41666666),
	new types.Country("Heard Island and McDonald Islands","HMD",-53.0765818,73.51),
	new types.Country("Honduras","HND",15,-86.5),
	new types.Country("Hong Kong","HKG",22.25,114.16666666),
	new types.Country("Hungary","HUN",47,20),
	new types.Country("Iceland","ISL",65,-18),
	new types.Country("India","IND",20,77),
	new types.Country("Indonesia","IDN",-5,120),
	new types.Country("Iran, Islamic Republic of","IRN",32,53),
	new types.Country("Iraq","IRQ",33,44),
	new types.Country("Ireland","IRL",53,-8),
	new types.Country("Isle of Man","IMN",54.25,-4.5),
	new types.Country("Israel","ISR",31.5,34.75),
	new types.Country("Italy","ITA",45,-170),
	new types.Country("Jamaica","JAM",18.25,-77.5),
	new types.Country("Japan","JPN",36,138),
	new types.Country("Jersey","JEY",49.2111266,-2.13263),
	new types.Country("Jordan","JOR",31,36),
	new types.Country("Kazakhstan","KAZ",48,68),
	new types.Country("Kenya","KEN",1,38),
	new types.Country("Kiribati","KIR",1.8709185,-157.3626),
	new types.Country("Korea, Democratic People's Republic of","PRK",40.34,127.43),
	new types.Country("Korea, Republic of","KOR",38.00,127.66),
	new types.Country("Kuwait","KWT",29.5,45.75),
	new types.Country("Kyrgyzstan","KGZ",41,75),
	new types.Country("Lao People's Democratic Republic","LAO",18,105),
	new types.Country("Latvia","LVA",57,25),
	new types.Country("Lebanon","LBN",33.83333333,35.83333333),
	new types.Country("Lesotho","LSO",-29.5,28.5),
	new types.Country("Liberia","LBR",6.5,-9.5),
	new types.Country("Libya","LBY",25,17),
	new types.Country("Liechtenstein","LIE",47.1594184,9.553),
	new types.Country("Lithuania","LTU",56,24),
	new types.Country("Luxembourg","LUX",49.75,6.16666666),
	new types.Country("Macao","MAC",22.1634178,113.5629),
	new types.Country("Macedonia","MKD",41.83333333,22),
	new types.Country("Madagascar","MDG",-20,47),
	new types.Country("Malawi","MWI",-13.5,34),
	new types.Country("Malaysia","MYS",2.5,112.5),
	new types.Country("Maldives","MDV",1.9772469,73.5361),
	new types.Country("Mali","MLI",17,-4),
	new types.Country("Malta","MLT",35.9440174,14.379),
	new types.Country("Marshall Islands","MHL",7.1108635,171.20606),
	new types.Country("Martinique","MTQ",14.6336817,-61.01981),
	new types.Country("Mauritania","MRT",20,-12),
	new types.Country("Mauritius","MUS",-20.28333333,57.55),
	new types.Country("Mayotte","MYT",-12.8210325,45.15),
	new types.Country("Mexico","MEX",23,-102),
	new types.Country("Micronesia, Federated States of","FSM",6.8873509,158.21),
	new types.Country("Moldova","MDA",47,29),
	new types.Country("Monaco","MCO",43.7383229,7.42445),
	new types.Country("Mongolia","MNG",46,105),
	new types.Country("Montenegro","MNE",42.5,19.3),
	new types.Country("Montserrat","MSR",16.7494365,-62.1),
	new types.Country("Morocco","MAR",32,-5),
	new types.Country("Mozambique","MOZ",-18.25,35),
	new types.Country("Myanmar","MMR",22,98),
	new types.Country("Namibia","NAM",-22,17),
	new types.Country("Nauru","NRU",-0.5284144,166.934),
	new types.Country("Nepal","NPL",28,84),
	new types.Country("Netherlands","NLD",-41,174),
	new types.Country("New Caledonia","NCL",-21.5,165.5),
	new types.Country("New Zealand","NZL",-41,174),
	new types.Country("Nicaragua","NIC",13,-85),
	new types.Country("Niger","NER",16,8),
	new types.Country("Nigeria","NGA",9.45, 6.32),
	new types.Country("Niue","NIU",-19.0542682,-169.862),
	new types.Country("Norfolk Island","NFK",-29.0328267,167.95439),
	new types.Country("Northern Mariana Islands","MNP",15.1063896,145.70),
	new types.Country("Norway","NOR",62,10),
	new types.Country("Oman","OMN",21,57),
	new types.Country("Pakistan","PAK",30,70),
	new types.Country("Palau","PLW",7.3663307,134.43409),
	new types.Country("Panama","PAN",9,-80),
	new types.Country("Papua New Guinea","PNG",-6,147),
	new types.Country("Paraguay","PRY",-23,-58),
	new types.Country("Peru","PER",-10,-76),
	new types.Country("Philippines","PHL",13,122),
	new types.Country("Pitcairn","PCN",-24.3729738,-128.3246),
	new types.Country("Poland","POL",52,20),
	new types.Country("Portugal","PRT",39.5,-8),
	new types.Country("Puerto Rico","PRI",18.25,-66.5),
	new types.Country("Qatar","QAT",25.5,51.25),
	new types.Country("Réunion","REU",-21.1306889,55.52),
	new types.Country("Romania","ROU",46,25),
	new types.Country("Russian Federation","RUS",60,100),
	new types.Country("Rwanda","RWA",-2,30),
	new types.Country("Saint Barthélemy","BLM",17.9139222,-62.833852),
	new types.Country("Saint Helena","SHN",-15.9620694,-5.713),
	new types.Country("Saint Kitts and Nevis","KNA",17.2561791,-62.702),
	new types.Country("Saint Lucia","LCA",13.9095248,-60.97),
	new types.Country("Saint Pierre and Miquelon","SPM",46.9466881,-56.26228),
	new types.Country("Saint Vincent and the Grenadines","VCT",13.253351,-61.19625),
	new types.Country("Samoa","WSM",-13.58333333,-172.33333333),
	new types.Country("San Marino","SMR",43.9428779,12.4),
	new types.Country("Sao Tome and Principe","STP",1,7),
	new types.Country("Saudi Arabia","SAU",25,45),
	new types.Country("Senegal","SEN",14,-14),
	new types.Country("Serbia","SRB",44,21),
	new types.Country("Seychelles","SYC",-4.6838871,55.4),
	new types.Country("Sierra Leone","SLE",8.5,-11.5),
	new types.Country("Singapore","SGP",1.3185848,103.8),
	new types.Country("Sint Maarten","SXM",18.0347188,-63.0),
	new types.Country("Slovakia","SVK",48.66666666,19.5),
	new types.Country("Slovenia","SVN",46.11666666,14.81666666),
	new types.Country("Solomon Islands","SLB",-8,159),
	new types.Country("Somalia","SOM",10,49),
	new types.Country("South Africa","ZAF",-29,24),
	new types.Country("South Georgia and the South Sandwich Islands","SGS",-54.5,-37),
	new types.Country("South Sudan","SSD",7,30),
	new types.Country("Spain","ESP",40,-4),
	new types.Country("Sri Lanka","LKA",7,81),
	new types.Country("Sudan","SDN",15,30),
	new types.Country("Suriname","SUR",4,-56),
	new types.Country("Svalbard and Jan Mayen","SJM",78.6351661,21.9939),
	new types.Country("Swaziland","SWZ",-26.5,31.5),
	new types.Country("Sweden","SWE",60,-320),
	new types.Country("Switzerland","CHE",46.8131873,8.22),
	new types.Country("Syrian Arab Republic","SYR",35,38),
	new types.Country("Taiwan","TWN",23.5,121),
	new types.Country("Tajikistan","TJK",39,71),
	new types.Country("Tanzania, United Republic of","TZA",-6,35),
	new types.Country("Thailand","THA",15,100),
	new types.Country("Timor-Leste","TLS",-8.83333333,125.91666666),
	new types.Country("Togo","TGO",8,1.16666666),
	new types.Country("Tokelau","TKL",-9.1668337,-171.818),
	new types.Country("Tonga","TON",-21.2418229,-175.12),
	new types.Country("Trinidad and Tobago","TTO",11,-61),
	new types.Country("Tunisia","TUN",34,9),
	new types.Country("Turkey","TUR",39,35),
	new types.Country("Turkmenistan","TKM",40,60),
	new types.Country("Turks and Caicos Islands","TCA",21.7081886,-71.9721),
	new types.Country("Tuvalu","TUV",-7.4784418,178.6799),
	new types.Country("Uganda","UGA",1,32),
	new types.Country("Ukraine","UKR",49,32),
	new types.Country("United Arab Emirates","ARE",24,54),
	new types.Country("United Kingdom","GBR",-2, -240),
	new types.Country("United States","USA",-380,-170),
	new types.Country("United States Minor Outlying Islands","UMI",19.295374,166.62804),
	new types.Country("Uruguay","URY",-33,-56),
	new types.Country("Uzbekistan","UZB",41,64),
	new types.Country("Vanuatu","VUT",-16,167),
	new types.Country("Venezuela","VEN",8,-66),
	new types.Country("Viet Nam","VNM",16.16666666,107.83333333),
	new types.Country("Virgin Islands, British","VGB",18.3434415,-64.867),
	new types.Country("Virgin Islands, U.S.","VIR",18.3434414,-64.867),
	new types.Country("Wallis and Futuna","WLF",-14.3013291,-178.09086),
	new types.Country("Western Sahara","ESH",24.21,-12.88),
	new types.Country("Yemen","YEM",15,48),
	new types.Country("Zambia","ZMB",-15,30),
	new types.Country("Zimbabwe","ZWE",-20,30)
];

backEnd.countryDict = {};

for (var i = 0; i < backEnd.countryList.length; i++) {
	var country = backEnd.countryList[i]
	backEnd.countryDict[country.name] = country
};