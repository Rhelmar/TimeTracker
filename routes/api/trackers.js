const express = require('express');
const db = require('../../config/database');
const TimeTracker = require('../../models/timeTracker');

const router = express.Router();

router.get('/', async (req, res) => {
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.post('/', async (req, res) => {
});

router.patch('/:id', async (req, res) => {
    const user = await TimeTracker.update(req.body.tracker, {
        where: {
            id: req.params.id
        }
    })
        .catch(err => console.log(err));
    console.log(user);
});


async function loadTrackers() {
    return await TimeTracker.findAll()
    .catch (err => console.log(err));
}

module.exports = router;