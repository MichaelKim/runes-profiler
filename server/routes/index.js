const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/champ', require('./champ'));
router.use('/test/', require('./test'));

module.exports = router;
