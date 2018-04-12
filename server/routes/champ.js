const router = require('express').Router();

const db = require('../db');

router.get('/', function (req, res) {
	const stripName = req.query.name.replace(/\s+/g, '').toLowerCase();

	db.getChampion(stripName, champion => {
		console.log('global champion data from database');
		res.send(champion);
	});
});

module.exports = router;
