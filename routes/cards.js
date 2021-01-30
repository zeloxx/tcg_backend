const express = require('express');
const CardController = require('../controllers/card');
const router = express.Router();

// Authenticate with Google
router.get('/', CardController.getAll);

module.exports = router;
