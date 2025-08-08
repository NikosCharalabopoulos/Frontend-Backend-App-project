const express = require('express');
const router = express.Router();
const { searchOmdb, omdbDetails } = require('../controllers/externalControllers');

router.get('/search', searchOmdb)
router.get('/details/:imdbID', omdbDetails)

module.exports = router;
