const express = require('express');
const router = express.Router();

const matches = {};
router.get('/quickplay', (req, res) => {
    console.log(matches);
    console.log(req.user._id);
    if (req.user) {
        if (Object.values(matches).length === 0) {
            const matchId = parseInt(Math.random() * 1000000000000000000000);
            matches[req.user._id] = { matchId: matchId, matchedPlayer: null };

            const intervalId = setInterval(() => {
                if (matches[req.user._id].matchedPlayer) {
                    clearInterval(intervalId);
                    res.send({
                        data: { redirectId: matches[req.user._id].matchId },
                    });
                }
            }, 1000);
        } else {
            const match = Object.values(matches)[0];
            console.log('test', match);
            match.matchedPlayer = req.user._id;
            res.send({
                data: { redirectId: match.matchId },
            });
        }
    }
});

const gameState = {};
const connectedUsers = {};
router.get('/quickplay/:id', (req, res) => {
    const io = req.app.get('socketio');
    room = req.params.id;

    console.log(`hit room ${room} route`);

    console.log(connectedUsers);

    if (!connectedUsers[req.user.id]) {
        io.sockets.on('connection', function (socket) {
            connectedUsers[req.user.id] = true;

            if (!gameState[room]) {
                gameState[room] = { num: 0 };
            }
            socket.on('quickplay', function () {
                gameState[room].num += 1;

                socket.join(room);
                console.log(gameState);
                io.sockets.in(room).emit('getGameState', room);
            });
        });
    }

    res.send(`hit room ${room} route`);
});

module.exports = router;
