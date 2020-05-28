const express = require('express');
const db = require('../../config/database');
const TimeTracker = require('../../models/timeTracker');

const router = express.Router();

router.get('/', async (req, res) => {
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.post('/', async (req, res) => {
    const tracker = await TimeTracker.create(req.body.tracker);
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.patch('/:id', async (req, res) => {
    const tracker = await TimeTracker.update(req.body.tracker, {
        where: {
            id: req.params.id
        }
    })
        .catch(err => console.log(err));
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.delete('/:id', async (req, res) => {    
    TimeTracker.destroy({
        where: {
            id: req.params.id
        }
    })
        .catch(err => console.log(err));
    const trackers = await loadTrackers();
    res.send(trackers);
})


async function loadTrackers() {
    return await TimeTracker.findAll()
    .catch (err => console.log(err));
}

module.exports = router;