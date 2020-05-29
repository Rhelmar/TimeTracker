const express = require('express');
const db = require('../../config/database');
const models = require('../../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.post('/', async (req, res) => {
    const tracker = await models.Tracker.create(req.body.tracker);
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.patch('/:id', async (req, res) => {
    const tracker = await models.Tracker.update(req.body.tracker, {
        where: {
            id: req.params.id
        }
    })
        .catch(err => console.log(err));
    const trackers = await loadTrackers();
    res.send(trackers);
});

router.delete('/:id', async (req, res) => {    
    models.Tracker.destroy({
        where: {
            id: req.params.id
        }
    })
        .catch(err => console.log(err));
    const trackers = await loadTrackers();
    res.send(trackers);
})


async function loadTrackers() {
    return await models.Tracker.findAll()
    .catch (err => console.log(err));
}

module.exports = router;