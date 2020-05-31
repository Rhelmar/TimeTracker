const express = require('express');
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors');
const db = require('./config/database');
const models = require('./models');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

dotenv.config({
    path: './config/config.env'
});

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const trackers = require('./routes/api/trackers');
const users = require('./routes/api/users');

app.use('/api/trackers', trackers);
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 8000;

models.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    })
})

