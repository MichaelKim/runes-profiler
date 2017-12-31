const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

const champions = require('../champions.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

function getPlayer(stripName, region, callback) {
	const ref = firebase.database().ref('players/' + stripName + '@' + region);
	ref.once('value', snap => {
		const data = snap.val();
		if (data === undefined || data === null ||
			!data.name || !data.icon || !data.lastUpdated || !data.runes) { // Not stored
			callback(null);
		}
		else {
			callback({
				name: data.name,
				icon: data.icon,
				lastUpdated: data.lastUpdated,
				runes: data.runes
			});
		}
	});
}

function updatePlayer(stripName, region, updatedData) {
	const ref = firebase.database().ref('players/' + stripName + '@' + region);

	ref.once('value', snap => {
		const data = snap.val();
		if (data === undefined || data === null) { // Not stored
			updateGlobal(updatedData.runes, {});
			updateChampion(updatedData.champions, {});
		}
		else {
			updateGlobal(updatedData.runes, data.runes);
			updateChampion(updatedData.champions, data.champions);
		}
		ref.set({
			...updatedData,
			lastUpdated: Date.now()
		});
	});
}

function getGlobal(callback) {
	firebase.database().ref('runes').once('value', snap => {
		const data = snap.val();
		callback(data);
	});
}

function updateGlobal(updatedData, oldData) {
	const globalRef = firebase.database().ref('runes');
	
	globalRef.once('value', snap => {
		const globalData = snap.val();
		const updatedGlobalData = Object.entries(updatedData).reduce((acc, [runeId, rune]) => {
			if (!acc[runeId]) {
				acc[runeId] = {
					wins: 0,
					games: 0,
					stats: [0, 0, 0]
				};
			}

			let temp = {
				wins: 0,
				games: 0,
				stats: [0, 0, 0]
			};
			if (oldData[runeId]) {
				Object.assign(temp, oldData[runeId]);
			}

			acc[runeId].wins += rune.wins - temp.wins;
			acc[runeId].games += rune.games - temp.games;
			for (let i = 0; i < 3; i++) {
				acc[runeId].stats[i] += rune.stats[i] - temp.stats[i];
			}
			return acc;
		}, globalData || {});

		globalRef.set(updatedGlobalData);
	});
}

function getChampion(championName, callback) {
	firebase.database().ref('champions/' + championName).once('value', snap => {
		const data = snap.val();
		callback(data);
	});
}

function updateChampion(updatedData, oldData) {
	Object.entries(updatedData).forEach(([championId, championData]) => {

		const stripName = champions[championId].replace(/\s+/g, '').toLowerCase();
		const ref = firebase.database().ref('champions/' + stripName);
		ref.once('value', snap => {
			let data = snap.val();
			
			if (data === undefined || data === null) {
				data = {
					name: champions[championId],
					key: championId,
					keystones: {},
					pages: {}
				};
			}

			if (oldData[championId] && oldData[championId].keystones) {
				Object.entries(oldData[championId].keystones).forEach(([runeId, runeData]) => {
					if (data.keystones[runeId]) {
						data.keystones[runeId] = {
							wins: data.keystones[runeId].wins - runeData.wins,
							games: data.keystones[runeId].games - runeData.games
						}
					}
				});
			}
			if (oldData[championId] && oldData[championId].pages) {
				Object.entries(oldData[championId].pages).forEach(([pageId, pageData]) => {
					if (data.pages[pageId]) {
						data.pages[pageId] = {
							wins: data.pages[pageId].wins - pageData.wins,
							games: data.pages[pageId].games - pageData.games
						}
					}
				});
			}

			Object.entries(championData.keystones).forEach(([runeId, runeData]) => {
				if (!data.keystones[runeId]) {
					data.keystones[runeId] = {
						wins: runeData.wins,
						games: runeData.games
					};
				}
				else {
					data.keystones[runeId] = {
						wins: data.keystones[runeId].wins + runeData.wins,
						games: data.keystones[runeId].games + runeData.games
					}
				}
			});

			Object.entries(championData.pages).forEach(([pageId, pageData]) => {
				if (!data.pages[pageId]) {
					data.pages[pageId] = {
						wins: pageData.wins,
						games: pageData.games
					};
				}
				else {
					data.pages[pageId] = {
						wins: data.pages[pageId].wins + pageData.wins,
						games: data.pages[pageId].games + pageData.games
					}
				}
			});

			ref.set(data);
		});
	});
	
}

module.exports = {
	getPlayer,
	updatePlayer,
	getGlobal,
	getChampion,
	updateChampion
};
