var nameInput = document.getElementById('summoner-name-input');
var invalidNameBox = document.getElementById('invalid-name-box');
var regionSelect = document.getElementById('region-select');
var searchBtn = document.getElementById('search-btn');

var nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');
var nameHistory = Cookies.get('hist') || '';

nameInput.placeholder = nameHistory;

function validName(summonerName) {
	return XRegExp.test(summonerName, nameRegex);
}

nameInput.onkeypress = function(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
		run();
	}
};

searchBtn.onclick = run;

function run() {
	var region = regionSelect.options[regionSelect.selectedIndex].value;
	var summonerName = nameInput.value.trim() || nameHistory;

	if (validName(summonerName)) {
		Cookies.set('hist', summonerName, { expires: 365 });
		window.location.href = 'http://localhost:5000/summoner?name=' + summonerName + '&region=' + region;
	}
	else {
		invalidNameBox.style.opacity = 1;
		setTimeout(function() {
			invalidNameBox.style.opacity = 0;
		}, 2000);
	}
};

