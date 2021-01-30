const mongoose = require('mongoose');
const Card = require('../models/Card');

const connUri = process.env.MONGO_URI;

module.exports = {
    getAll: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            Card.find({}, (err, cards) => {
                if (!err) {
                    res.status(200).json(cards);
                } else {
                    console.log('Error', err);
                }
            });
        });
    },
};
