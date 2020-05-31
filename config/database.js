const Sequelize = require('sequelize');
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({
    path: __dirname + '/config.env'
});

console.log(process.env.host);
module.exports = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});
