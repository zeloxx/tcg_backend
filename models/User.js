const mongoose = require('mongoose');
const environment = process.env.NODE_ENV;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        googleId: { type: String, required: true },
        displayName: { type: String, trim: true, required: true, max: 64 },
        firstName: { type: String, trim: true, required: true, max: 32 },
        lastName: { type: String, trim: true, required: true, max: 32 },
        image: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
