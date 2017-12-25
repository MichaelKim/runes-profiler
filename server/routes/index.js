const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/test', require('./test'));

router.get('/rune', function (req, res) {
	const runeId = req.query.rune;

	fb.getRuneData(runeId, (runeData) => {
		res.send(runeData);
	});
});

module.exports = router;