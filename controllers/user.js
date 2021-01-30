const mongoose = require('mongoose');
const User = require('../models/User');

const connUri = process.env.MONGO_URI;

module.exports = {
    getAll: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {});
    },
};
