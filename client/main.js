var nameInput = document.getElementById('summoner-name-input');
var regionSelect = document.getElementById('region-select');
var searchBtn = document.getElementById('search-btn');
var nameHistory = (Cookies.get('hist') || '').split('&').filter(c => c);

nameInput.onkeypress = function(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
		run();
	}
};

searchBtn.onclick = run;
	
function run() {
	var region = regionSelect.options[regionSelect.selectedIndex].value;
	var summonerName = nameInput.value.trim();

	console.log(region, summonerName);

	nameHistory.push(summonerName);
	// Cookies.set('hist', nameHistory.join('&'), { expires: 365 });

	window.location.href = 'http://localhost:5000/summoner?name=' + summonerName + '&region=' + region;
};
