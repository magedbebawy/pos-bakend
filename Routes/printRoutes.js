const { print } = require('../Controller/printCotroller');
const { openDrawer } = require('../Controller/openDrawer');
const router = require('express').Router();

router.post('/printreciept', print);
router.post('/opendrawer', openDrawer)

module.exports = router;