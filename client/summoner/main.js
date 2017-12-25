var landingBox = document.getElementById('landing');
var statsBox = document.getElementById('stats');
var loaderBox = document.getElementById('loader-box');
var dataBox = document.getElementById('data-box');

window.onload = () => {
	var summonerName = getQueryVariable('name');
	var region = getQueryVariable('region');
	console.log(summonerName, region);
	if (summonerName && region) getAccount(summonerName, region);
	else window.location.href = "http://localhost:5000";
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

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

		loaderBox.style.display = 'none';
		statsBox.style.display = 'block';
		stats.style.opacity = 1;
		statsBox.className += ' fadein';
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