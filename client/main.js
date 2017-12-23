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
	Cookies.set('hist', nameHistory.join('&'), { expires: 365 });
	getAccount(summonerName, region);
};



function getAccount(summonerName, region) {
	var xml = new XMLHttpRequest();
	xml.onreadystatechange = function() {
		if (xml.readyState == 4) {
			if (xml.status == 200) {
				console.log(JSON.parse(xml.responseText));
			}
			else {
				console.log('HTTP Error ' + xml.status);
				console.log(xml.responseText);
				console.log(xml.statusText);
			}
		}
	};
	xml.open('GET', 'http://localhost:5000/run?name=' + summonerName + '&region=' + region, true);
	xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xml.send();
}
