const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

function getPlayer(stripName, region, callback) {
	const ref = firebase.database().ref('players/' + stripName + '@' + region);
	ref.once('value', snap => {
		const data = snap.val();
		if (data === undefined || data === null) { // Not stored
			callback(null);
		}
		else {
			callback(data);
		}
	});
}

function updatePlayer(stripName, region, updatedData) {
	const ref = firebase.database().ref('players/' + stripName + '@' + region);

	ref.once('value', snap => {
		const data = snap.val();
		if (data === undefined || data === null) { // Not stored
			updateGlobal(updatedData, {});
		}
		else {
			updateGlobal(updatedData, data.runes);
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
		const updatedGlobalData = Object.entries(updatedData.runes).reduce((acc, [runeId, rune]) => {
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

module.exports = {
	getPlayer,
	updatePlayer,
	getGlobal
};
