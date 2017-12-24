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
	makeRequest('/test?name=' + summonerName + '&region=' + region, (data) => {
		dataBox.innerHTML = `
			<tr>
				<th rowspan="2"></th>
				<th colspan="4">${data.player.name}</th>
				<th colspan="4">Global</th>
			</tr>
			<tr>
				<td>Winrate</td>
				<td>Stat 1</td>
				<td>Stat 2</td>
				<td>Stat 3</td>
				<td>Winrate</td>
				<td>Stat 1</td>
				<td>Stat 2</td>
				<td>Stat 3</td>
			</tr>
		`;

		Object.entries(data.playerData).forEach(([runeId, playerRune]) => {
			const globalRune = data.globalData[runeId];

			const playerStats = [
				playerRune.wins / playerRune.games,
				playerRune.stats[0] / playerRune.games,
				playerRune.stats[1] / playerRune.games,
				playerRune.stats[2] / playerRune.games
			];
			const globalStats = [
				globalRune.wins / globalRune.games,
				globalRune.stats[0] / globalRune.games,
				globalRune.stats[1] / globalRune.games,
				globalRune.stats[2] / globalRune.games
			];

			let row = '<tr><td>' + runeNames[runeId] + '</td>';

			for (let i = 0; i < 4; i++) {
				if (playerStats[i] > globalStats[i]) {
					row += '<td><b>' + playerStats[i].toFixed(2) + '</b></td>';
				}
				else {
					row += '<td>' + playerStats[i].toFixed(2) + '</td>';	
				}
			}
			for (let i = 0; i < 4; i++) {
				if (playerStats[i] < globalStats[i]) {
					row += '<td><b>' + globalStats[i].toFixed(2) + '</b></td>';
				}
				else {
					row += '<td>' + globalStats[i].toFixed(2) + '</td>';	
				}
			}
			row += '</tr>';

			dataBox.innerHTML += row;
		});
	});
}

function makeRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.log(xhr.responseText);
				callback(JSON.parse(xhr.responseText));
			}
			else {
				console.log('HTTP Error ' + xml.status);
				console.log(xml.responseText);
				console.log(xml.statusText);
			}
		}
	}
	xhr.open('GET', 'http://localhost:5000' + url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send();
}