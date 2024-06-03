const express = require('express');
const router = express.Router();
const { add, remove, Watchlist } = require('../controllet/WatchList');

router.post("/add", add);
router.post("/remove", remove);
router.get('/:userId', Watchlist);

module.exports = router;