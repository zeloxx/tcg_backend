const express = require('express');
const passport = require('passport');

const router = express.Router();

// Check Auth
router.get('/check', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            isSignedIn: true,
            message: 'User is Authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    } else {
        res.json({ success: false, isSignedIn: false, message: 'User is not Authenticated' });
    }
});

// Authenticate with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google Authentication Callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), (req, res) => {
    res.redirect('http://localhost:3000');
});

// Logout User
router.get('/logout', (req, res) => {
    req.logout();
    res.status(302).redirect('http://localhost:3000');
});

module.exports = router;
