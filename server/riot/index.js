const https   = require("https");
const XRegExp = require("xregexp");
const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');
const runeNames = require("./runeNames.json");

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

function getRuneName(runeId) {
	return runeNames[runeId] || '';
}

module.exports = {
	query,
	getPlayer,
	getMatches,
	getMatch,
	validName,
	getRuneName
};