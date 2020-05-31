const express = require('express');
const db = require('../../config/database');
const models = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = models.User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (user) {
        res.status(409).send("Username taken");
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.status(409).json(err);
            } else {
                models.User.create({
                    username: req.body.username,
                    password: hash
                });
                res.send("User added");
            }
        })
    }
});

router.post('/login', async (req, res) => {
    const user = await models.User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                res.status(404).send("Username or Password wrong!");
            }
            else if (result) {
                const token = jwt.sign({
                    username: user.username
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1d"
                });
                res.status(200).json({
                    message: "Successfully logged in!",
                    toke: token
                });
            } else {
                res.status(404).send("Username or Password wrong!");
            }
        })
    }
})


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

module.exports = router;