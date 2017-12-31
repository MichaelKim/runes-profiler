const router = require('express').Router();

const riot = require('../riot');
const db = require('../db');

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

	stripName = summonerName.replace(/\s+/g, '').toLowerCase();

	db.getPlayer(stripName, region, player => {
		if (player && Date.now() - player.lastUpdated < 1000 * 60 * 5) {
			console.log('player from database');
			db.getGlobal(globalData => {
				console.log('global data from database')
				res.send({
					profileData: {
						name: player.name,
						icon: player.icon,
						lastUpdated: player.lastUpdated
					},
					playerData: player.runes,
					globalData
				});
			});
		}
		else {
			riot.getPlayer(summonerName, region, (err, profileData) => {
				console.log('profile from riot');
				riot.getPlayerData(profileData.accountId, region, (err, playersData) => {
					console.log('player from riot');

					db.updatePlayers(playersData, region);

					console.log('player saved to database');

					db.getGlobal(globalData => {
						console.log('global from database');
						res.send({
							profileData: {
								name: playersData[stripName].name,
								icon: playersData[stripName].icon,
								lastUpdated: playersData[stripName].lastUpdated
							},
							playerData: playersData[stripName].runes,
							globalData
						});
					});
				});
			});
		}
	});
});

module.exports = router;