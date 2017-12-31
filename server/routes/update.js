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

	riot.getPlayer(summonerName, region, (err, profileData) => {
		console.log('profile from riot');
		riot.getPlayerData(profileData.accountId, region, (err, updatedData, otherData, champData) => {
			console.log('player from riot');
			db.updatePlayer(stripName, region, {
				name: profileData.name,
				icon: profileData.profileIconId,
				runes: updatedData
			});
			console.log(champData);
			db.updateChampion(champData);
			console.log('player saved to database');

			db.getGlobal(globalData => {
				console.log('global from database');
				res.send({
					profileData: {
						name: profileData.name,
						icon: profileData.profileIconId,
						lastUpdated: Date.now()
					},
					playerData: updatedData,
					globalData
				});
			});
		});
	});
});

module.exports = router;