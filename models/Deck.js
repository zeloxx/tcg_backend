const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema(
    {
        name: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        cards: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Deck', DeckSchema);
