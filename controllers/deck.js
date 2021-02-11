const mongoose = require('mongoose');
const Deck = require('../models/Deck');

const connUri = process.env.MONGO_URI;

module.exports = {
    getAll: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            // Deck.find({}, (err, decks) => {
            //     if (!err) {
            //         res.status(200).json(decks);
            //     } else {
            //         console.log('Error', err);
            //     }
            // });
        });
    },
    getAllDecksBySignedInUser: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            // refactor
            if (req.user) {
                Deck.find({ user: req.user._id })
                    .populate('cards')
                    .exec((err, decks) => {
                        res.status(200).json({
                            success: true,
                            error: '',
                            data: decks,
                        });
                    });
            } else {
                res.send({
                    success: false,
                    error: 'User not logged in.',
                    data: [],
                });
            }
        });
    },
    create: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, async (err) => {
            // refactor
            if (!req.user) {
                res.send({ success: false, error: 'User not logged in.' });
            } else {
                const deck = {};
                deck.name = req.body.name;
                deck.user = req.user._id;
                deck.cards = req.body.cards;
                try {
                    const newDeck = await Deck.create(deck);
                    res.send({ success: true, errors: '', data: newDeck });
                } catch (error) {
                    console.error(error);
                }
            }
        });
    },
    update: (req, res) => {},
    delete: (req, res) => {},
};
