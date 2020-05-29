const db = require('../config/database');

const models = {
    User: db.import('./user'),
    Tracker: db.import('./tracker')
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = db;

module.exports = models;