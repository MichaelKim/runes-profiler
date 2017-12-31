const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/champ', require('./champ'));

module.exports = router;