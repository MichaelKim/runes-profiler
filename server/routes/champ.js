const router = require('express').Router();

const riot = require('../riot');
const db = require('../db');

router.get('/', function (req, res) {
	const championName = req.query.name;

	// Valid champ name check
	if (false) {
		res.redirect('http://localhost:5000/champion');
	}

	console.log(championName);

	stripName = championName.replace(/\s+/g, '').toLowerCase();

	db.getChampion(stripName, champion => {
		console.log('global champion data from database');
		res.send(champion);
	});
});

module.exports = router;