const express = require('express');
const router = express.Router();

let queue = [];
let queueTracker = {};

router.get('/', (req, res) => {
    if (req.user) {
        if (!queueTracker[req.user.id]) {
            queue.push(req.user._id);
            queueTracker[req.user.id] = true;
        }
    }
    console.log(queue);
    res.send({ queue: queue, queuetracker: queueTracker });
});

module.exports = router;
