require('dotenv').config();

const express = require("express");
const app     = express();
const comp    = require("compression");
const https   = require("https");
const XRegExp = require("xregexp");

const db = require("../db");

// db.query('SELECT * FROM runes', [], (err, res) => {
// 	console.log(res.rows);
// });

const nameRegex = new XRegExp('^[0-9\\p{L} _\\.]+$');

app.use(comp());

app.get('/summoner', function(req, res) {
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
			let data = {};
			let playerData = {};

			matchesData.matches.forEach(match => {
				getRiotData('/lol/match/v3/matches/' + match.gameId, region, (matchData) => {
					count += 1;
					console.log(count, matchesData.matches.length);

					let pId = matchData.participantIdentities.find((e) => e.player.accountId === summonerData.accountId).participantId;

					matchData.participants.forEach((p) => {
						for (let i = 0; i < 6; i++) {
							if (!data[p.stats['perk' + i]]) {
								data[p.stats['perk' + i]] = {
									wins: 0,
									games: 0,
									vars: [0, 0, 0]
								};
							}

							if (p.stats.win) data[p.stats['perk' + i]].wins++;
							data[p.stats['perk' + i]].games++;
							for (let j = 0; j < 3; j++) {
								data[p.stats['perk' + i]].vars[j] += p.stats['perk' + i + 'Var' + (j+1)];	
							}
						}
						if (p.participantId === pId) {
							for (let i = 0; i < 6; i++) {
								if (!playerData[p.stats['perk' + i]]) {
									playerData[p.stats['perk' + i]] = {
										wins: 0,
										games: 0,
										vars: [0, 0, 0]
									};
								}

								if (p.stats.win) playerData[p.stats['perk' + i]].wins++;
								playerData[p.stats['perk' + i]].games++;
								for (let j = 0; j < 3; j++) {
									playerData[p.stats['perk' + i]].vars[j] += p.stats['perk' + i + 'Var' + (j+1)];	
								}
							}
						}
					});

					if (count >= matchesData.matches.length) {
						updateDatabase(data, (updatedData) => {
							res.send(updatedData);
						});
						res.send({ player: playerData, other: data });
					}
				}, (err) => {
					count += 1;
					console.log(count, matchesData.length);
					console.error('Error retrieving match ' + match.gameId);

					if (count >= matchesData.matches.length) {
						res.send({ player: playerData, other: data });
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

app.get('/test', (req, res) => {
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
	let data = {"8005":{"wins":17,"games":32,"vars":[44558,27183,17359]},"8008":{"wins":1,"games":5,"vars":[662,0,0]},"8009":{"wins":2,"games":3,"vars":[13270,0,0]},"8014":{"wins":35,"games":67,"vars":[45961,0,0]},"8017":{"wins":3,"games":12,"vars":[7370,0,0]},"8021":{"wins":1,"games":2,"vars":[2813,0,0]},"8105":{"wins":5,"games":15,"vars":[71,0,0]},"8112":{"wins":11,"games":26,"vars":[33535,0,0]},"8120":{"wins":5,"games":11,"vars":[120,0,0]},"8124":{"wins":0,"games":1,"vars":[759,0,0]},"8126":{"wins":19,"games":27,"vars":[15449,0,0]},"8128":{"wins":4,"games":11,"vars":[36463,0,0]},"8134":{"wins":6,"games":10,"vars":[50,0,0]},"8135":{"wins":26,"games":51,"vars":[250,0,0]},"8136":{"wins":3,"games":4,"vars":[24,0,0]},"8138":{"wins":30,"games":62,"vars":[1418,0,0]},"8139":{"wins":8,"games":22,"vars":[24155,0,0]},"8143":{"wins":17,"games":42,"vars":[26912,0,0]},"8210":{"wins":39,"games":74,"vars":[306,0,0]},"8214":{"wins":17,"games":29,"vars":[45705,26615,0]},"8224":{"wins":6,"games":17,"vars":[15473,0,0]},"8226":{"wins":20,"games":41,"vars":[60881,0,0]},"8229":{"wins":27,"games":52,"vars":[94387,0,0]},"8230":{"wins":0,"games":2,"vars":[14,0,0]},"8232":{"wins":1,"games":1,"vars":[138,0,0]},"8233":{"wins":3,"games":15,"vars":[7881,0,0]},"8234":{"wins":16,"games":27,"vars":[504,0,0]},"8236":{"wins":20,"games":34,"vars":[600,0,0]},"8237":{"wins":36,"games":73,"vars":[42338,0,0]},"8242":{"wins":8,"games":14,"vars":[223,0,0]},"8243":{"wins":33,"games":59,"vars":[843,0,0]},"8299":{"wins":3,"games":4,"vars":[2552,0,0]},"8304":{"wins":5,"games":12,"vars":[80,12,0]},"8306":{"wins":0,"games":2,"vars":[8,0,0]},"8313":{"wins":5,"games":11,"vars":[0,0,0]},"8316":{"wins":0,"games":1,"vars":[759,0,0]},"8321":{"wins":3,"games":5,"vars":[14,0,0]},"8339":{"wins":0,"games":1,"vars":[0,0,0]},"8345":{"wins":5,"games":6,"vars":[24,0,0]},"8347":{"wins":13,"games":23,"vars":[0,0,0]},"8359":{"wins":3,"games":4,"vars":[2435,101,0]},"8410":{"wins":0,"games":1,"vars":[42,0,0]},"8429":{"wins":14,"games":27,"vars":[1272,378,296]},"8430":{"wins":3,"games":9,"vars":[194,0,0]},"8435":{"wins":2,"games":4,"vars":[64,0,0]},"8437":{"wins":10,"games":15,"vars":[12934,12221,0]},"8439":{"wins":9,"games":21,"vars":[24974,0,0]},"8444":{"wins":12,"games":19,"vars":[30265,0,0]},"8446":{"wins":3,"games":3,"vars":[4976,0,0]},"8451":{"wins":7,"games":17,"vars":[3601,0,0]},"8453":{"wins":3,"games":8,"vars":[11877,5916,0]},"8463":{"wins":11,"games":25,"vars":[25895,0,0]},"9101":{"wins":2,"games":3,"vars":[669,785,0]},"9103":{"wins":6,"games":11,"vars":[100,333,0]},"9104":{"wins":12,"games":32,"vars":[314,746,0]},"9105":{"wins":8,"games":10,"vars":[101,370,0]},"9111":{"wins":42,"games":85,"vars":[137770,0,0]}};
	updateDatabase(data, (updatedData) => {
		res.send(updatedData);
	});
});

function updateDatabase(data, callback) {
	let updatedData = [];
	db.query('SELECT * from runes', [], (err, res) => {
		let count = 0;
		let length = Object.keys(data).length;
		Object.entries(data).forEach(([id, r]) => {
			let runeRow = res.rows.find(row => row.runeid == id);
			updatedData.push({
				id: id,
				name: runeRow.name,
				wins: runeRow.wins + r.wins,
				games: runeRow.games + r.games,
				var1: runeRow.var1 + r.vars[0],
				var2: runeRow.var2 + r.vars[1],
				var3: runeRow.var3 + r.vars[2]
			});
			db.query('UPDATE runes SET wins = $1, games = $2, var1 = $3, var2 = $4, var3 = $5 WHERE runeid = $6', [
					runeRow.wins + r.wins,
					runeRow.games + r.games,
					runeRow.var1 + r.vars[0],
					runeRow.var2 + r.vars[1],
					runeRow.var3 + r.vars[2],
					parseInt(id)
				], (err, res2) => {
					if (err) console.error(err);
					count += 1;
					if (count >= length) {
						callback(updatedData);
					}
				}	
			);
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
