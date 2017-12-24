const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

function getRuneData(runeId, callback) {
	let ref = firebase.database().ref('runes/' + runeId);
	ref.once('value', (snap) => {
		let data = snap.val();
		if (data === undefined || data === null) {
			const emptyRune = {
				wins: 0,
				games: 0,
				stats: [0, 0, 0]
			};

			ref.set(emptyRune);
			return emptyRune;
		}

		return data;
	});
}

function addRuneData(runeId, runeData, callback) {
	let ref = firebase.database().ref('runes/' + runeId);
	ref.once('value', (snap) => {
		let data = snap.val();

		let newRuneData;
		if (data === undefined || data === null) {
			newRuneData = {
				wins: runeData.wins,
				games: runeData.games,
				stats: [
					runeData.stats[0],
					runeData.stats[1],
					runeData.stats[2]
				]
			};
		}
		else {
			newRuneData = {
				wins: runeData.wins + data.wins,
				games: runeData.games + data.games,
				stats: [
					data.stats[0] + runeData.stats[0],
					data.stats[1] + runeData.stats[1],
					data.stats[2] + runeData.stats[2]
				]
			};
		}

		ref.set(newRuneData);

		callback(newRuneData);
	});
}

module.exports = {
	database: firebase.database,
	getRuneData,
	addRuneData
};