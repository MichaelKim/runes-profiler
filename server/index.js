require('dotenv').config();

const express = require("express");
const app     = express();
const comp    = require("compression");
const https   = require("https");
const XRegExp = require("xregexp");

const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');

app.use(comp());

app.get('/run', function(req, res) {
	const summonerName = req.query.name;
	const region = getRegionEndpoint(req.query.region);

	if (!XRegExp.test(summonerName, nameRegex)) {
		res.status(400);
		res.send('Invalid summoner name');
		return;
	}

	if (!region) {
		res.status(400);
		res.send('Invalid region');
		return;
	}

	console.log(summonerName, region);

	getRiotData('/lol/summoner/v3/summoners/by-name/' + summonerName, region, (summonerData) => {
		if (summonerData.status && summonerData.status.status_code >= 400) { // Assuming errors are formatted this way
			if (summonerData.status.status_code === 404) { // Summoner not found
				res.send('Summoner name not found');
			}
			else {
				res.status(500);
				res.send(summonerData.status.message);
			}
			return;
		}

		console.log(summonerData);

		getRiotData('/lol/match/v3/matchlists/by-account/' + summonerData.accountId + '/recent', region, (matchesData) => {
			console.log(matchesData);

			let count = 0;
			let data = [];

			matchesData.matches.forEach(match => {
				getRiotData('/lol/match/v3/matches/' + match.gameId, region, (matchData) => {
					count += 1;
					console.log(count, matchesData.matches.length);

					let pId = matchData.participantIdentities.find((e) => e.player.accountId === summonerData.accountId).participantId;
					let playerData = matchData.participants.find((e) => e.participantId === pId);

					data.push({
						champion: playerData.championId,
						runesData: [
							{
								id: playerData.stats.perk0,
								vars: [playerData.stats.perk0Var1, playerData.stats.perk0Var2, playerData.stats.perk0Var3]
							},
							{
								id: playerData.stats.perk1,
								vars: [playerData.stats.perk1Var1, playerData.stats.perk1Var2, playerData.stats.perk1Var3]
							},
							{
								id: playerData.stats.perk2,
								vars: [playerData.stats.perk2Var1, playerData.stats.perk2Var2, playerData.stats.perk2Var3]
							},
							{
								id: playerData.stats.perk3,
								vars: [playerData.stats.perk3Var1, playerData.stats.perk3Var2, playerData.stats.perk3Var3]
							},
							{
								id: playerData.stats.perk4,
								vars: [playerData.stats.perk4Var1, playerData.stats.perk4Var2, playerData.stats.perk4Var3]
							},
							{
								id: playerData.stats.perk5,
								vars: [playerData.stats.perk5Var1, playerData.stats.perk5Var2, playerData.stats.perk5Var3]
							}
						]
					});

					if (count >= matchesData.matches.length) {
						res.send(data);
					}
				}, (err) => {
					count += 1;
					console.log(count, matchesData.length);
					console.error('Error retrieving match ' + match.gameId);

					if (count >= matchesData.matches.length) {
						res.send(data);
					}
				});
			});
		}, (err) => {
			res.status(500);
			res.send(err);
		})

	}, (err) => {
		res.status(500);
		res.send(err);
	});
});

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

function getRiotData(path, region, callback, err) {
	https.get('https://' + region + '.api.riotgames.com' + path + '?api_key=' + process.env.RIOT_API, (res) => {
		let rawData = '';

		res.on('data', (chunk) => rawData += chunk);
		res.on('end', () => {
			try {
				let jsonData = JSON.parse(rawData);
				callback(jsonData);
			} catch(e) {
				console.error(e.message);
				err(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(e.message);
		err(e.message);
	});
}

app.use(express.static(__dirname + '/../client'));
var port = process.env.PORT  || 5000;
app.listen(port, function() {
    console.log("listening on:" + port);
});
