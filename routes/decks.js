const express = require('express');
const DeckController = require('../controllers/deck');
const router = express.Router();

router.get('/', DeckController.getAllDecksBySignedInUser);

router.post('/', DeckController.create);

router.put('/', DeckController.update);

router.delete('/', DeckController.delete);

module.exports = router;
