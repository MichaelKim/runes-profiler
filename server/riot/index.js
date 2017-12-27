const https   = require("https");
const XRegExp = require("xregexp");
const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');

function query(path, region, callback) {
	console.log('Querying riot:', path, region);
	https.get('https://' + region + '.api.riotgames.com' + path + '?api_key=' + process.env.RIOT_API, (res) => {
		let rawData = '';

		res.on('data', (chunk) => rawData += chunk);
		res.on('end', () => {
			let jsonData = JSON.parse(rawData);
			// if (data.status && data.status.status_code >= 400) {
			// 	console.error(data);
			// 	callback(data.status.message, null);
			// }
			// else {
				callback(null, jsonData);	
			// }
		});
	}).on('error', (e) => {
		console.error(e.message);
		callback(e.message, null);
	});
}

function getPlayer(summonerName, region, callback) {
	query('/lol/summoner/v3/summoners/by-name/' + summonerName, region, (err, data) => {
		if (data.status && data.status.status_code >= 400) { // Assuming errors are formatted this way
			// if (summonerData.status.status_code === 404) { // Summoner not found
			// 	res.send('Summoner name not found');
			// }
			callback(data.status.message, null);
		}
		else if (err) {
			callback(err.message, null);
		}
		else {
			callback(null, data);
		}
	});
}

function getMatches(accountId, region, callback) {
	query('/lol/match/v3/matchlists/by-account/' + accountId + '/recent', region, (err, data) => {
		if (err) callback(err.message, null);
		else callback(null, data.matches);
	});
}

function getMatch(matchId, region, callback) {
	query('/lol/match/v3/matches/' + matchId, region, (err, data) => {
		if (err) callback(err.message, null);
		else callback(null, data);
	});
}

function validName(summonerName) {
	return XRegExp.test(summonerName, nameRegex);
}

function getPlayerData(accountId, region, callback) {
	getMatches(accountId, region, (err, matches) => {
		if (err) {
			callback(err, null);
			return;
		}

		let count = 0;
		let playerData = {};

		matches.forEach((m, i) => {
			setTimeout(() => {
				getMatch(m.gameId, region, (err, match) => {
					count += 1;

					console.log(count, matches.length);

					if (!err) {
						const playerId = match.participantIdentities.find((p) => p.player.accountId === accountId).participantId;
						const playerPart = match.participants.find((p) => p.participantId === playerId);

						for (let i = 0; i < 6; i++) {
							if (!playerData[playerPart.stats['perk' + i]]) {
								playerData[playerPart.stats['perk' + i]] = {
									wins: 0,
									games: 0,
									stats: [0, 0, 0]
								};
							}

							if (playerPart.stats.win) playerData[playerPart.stats['perk' + i]].wins++;
							playerData[playerPart.stats['perk' + i]].games++;
							for (let j = 0; j < 3; j++) {
								playerData[playerPart.stats['perk' + i]].stats[j] += playerPart.stats['perk' + i + 'Var' + (j+1)];	
							}
						}
					}

					if (count >= matches.length) {
						callback(null, playerData);
					}
				});
			}, 50 * i);
		});
	});
}

function getRegionEndpoint(region) {
	return {
		'br': 'br1',
		'eune': 'eun1',
		'euw': 'euw1',
		'jp': 'jp1',
		'kr': 'kr',
		'lan': 'la1',
		'las': 'la2',
		'na': 'na1',
		'oce': 'oc1',
		'tr': 'tr1',
		'ru': 'ru',
		'pbe': 'pbe1'
	}[region] || '';
}


module.exports = {
	query,
	getPlayer,
	getMatches,
	getMatch,
	validName,
	getPlayerData,
	getRegionEndpoint
};
