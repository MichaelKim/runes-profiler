const router = require('express').Router();

const riot = require('../riot');
const fb = require('../db');

router.get('/', function (req, res) {
	const summonerName = req.query.name;
	const region = riot.getRegionEndpoint(req.query.region);

	if (!riot.validName(summonerName)) {
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

	riot.getPlayer(summonerName, region, (err, player) => {
		if (err) {
			res.status(500);
			res.send(err);
			return;
		}

		console.log(player);

		riot.getMatches(player.accountId, region, (err, matches) => {
			if (err) {
				res.status(500);
				res.send(err);
				return;
			}

			console.log(matches);

			let count = 0;
			let data = {};
			let playerData = {};

			matches.forEach((m) => {
				riot.getMatch(m.gameId, region, (err, match) => {
					count += 1;

					console.log(count, matches.length);

					if (!err) {
						let playerId = match.participantIdentities.find((p) => p.player.accountId === player.accountId).participantId;

						match.participants.forEach((p) => {
							for (let i = 0; i < 6; i++) {
								if (!data[p.stats['perk' + i]]) {
									data[p.stats['perk' + i]] = {
										wins: 0,
										games: 0,
										stats: [0, 0, 0]
									};
								}

								if (p.stats.win) data[p.stats['perk' + i]].wins++;
								data[p.stats['perk' + i]].games++;
								for (let j = 0; j < 3; j++) {
									data[p.stats['perk' + i]].stats[j] += p.stats['perk' + i + 'Var' + (j+1)];	
								}
							}

							if (p.participantId === playerId) {
								for (let i = 0; i < 6; i++) {
									if (!playerData[p.stats['perk' + i]]) {
										playerData[p.stats['perk' + i]] = {
											wins: 0,
											games: 0,
											stats: [0, 0, 0]
										};
									}

									if (p.stats.win) playerData[p.stats['perk' + i]].wins++;
									playerData[p.stats['perk' + i]].games++;
									for (let j = 0; j < 3; j++) {
										playerData[p.stats['perk' + i]].stats[j] += p.stats['perk' + i + 'Var' + (j+1)];	
									}
								}
							}
						});
					}

					if (count >= matches.length) {
						let finalData = {
							player: {
								name: player.name
							},
							playerData: playerData,
							globalData: {}
						};

						// Object.entries(playerData).forEach(([runeId, rune]) => {
						// 	finalData.player.push(Object.assign(rune, { name: riot.getRuneName(runeId) }));
						// });

						let count2 = 0;
						let length2 = Object.keys(data).length;

						Object.entries(data).forEach(([runeId, rune]) => {
							fb.addRuneData(runeId, rune, (newRune) => {
								finalData.globalData[runeId] = newRune;

								count2 += 1;
								console.log(count2, length2);
								if (count2 >= length2) {
									res.send(finalData);
								}
							});
						});
					}
				});
			});
		});
	});
});

module.exports = router;