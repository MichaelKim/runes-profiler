const https   = require("https");
const XRegExp = require("xregexp");
const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');

function query(path, region, callback) {
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
	getRegionEndpoint
};