const Sequelize = require('sequelize');
const db = require('../config/database');

const TimeTracker = db.define('timeTracker', {
    name: {
        type: Sequelize.STRING
    },
    timeStarted: {
        type: Sequelize.DATE
    },
    timePaused: {
        type: Sequelize.DATE
    },
    timePassed: {
        type: Sequelize.INTEGER
    },
    isRunning: {
        type: Sequelize.BOOLEAN
    }
})

module.exports = TimeTracker;