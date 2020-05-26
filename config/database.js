const Sequelize = require('sequelize');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({
    path: __dirname + '/config.env'
});
module.exports = new Sequelize('TimeTrackers', 'postgres', process.env.Password, {
    host: process.env.host,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});
