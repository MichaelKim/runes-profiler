var nameInput = document.getElementById('summoner-name-input');
var regionSelect = document.getElementById('region-select');
var searchBtn = document.getElementById('search-btn');

var dataBox = document.getElementById('data-box');

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
				let data = JSON.parse(xml.responseText);

				let title = document.createElement('h3');
				title.innerHTML = 'Data for ' + summonerName + ':';
				dataBox.appendChild(title);

				data.forEach(r => {
					let runeName = document.createElement('b');
					runeName.innerHTML = r.name;
					dataBox.appendChild(runeName);

					let runeDetailsBox = document.createElement('div');
					runeDetailsBox.innerHTML =
						'<p>Winrate: ' + (r.wins / r.games) + '</p>' +
						'<p>Var 1: ' + (r.var1 / r.games) + '</p>' +
						'<p>Var 2: ' + (r.var2 / r.games) + '</p>' +
						'<p>Var 3: ' + (r.var3 / r.games) + '</p>';
					dataBox.appendChild(runeDetailsBox);
				});
			}
			else {
				console.log('HTTP Error ' + xml.status);
				console.log(xml.responseText);
				console.log(xml.statusText);
			}
		}
	};
	xml.open('GET', 'http://localhost:5000/test?name=' + summonerName + '&region=' + region, true);
	xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xml.send();
}