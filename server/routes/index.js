const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/update', require('./update'));
router.use('/test', require('./test'));

module.exports = router;