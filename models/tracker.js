module.exports =  (sequelize, DataTypes) => {
    const Tracker = sequelize.define('tracker', {
        name: {
            type: DataTypes.STRING
        },
        timeStarted: {
            type: DataTypes.DATE
        },
        timePaused: {
            type: DataTypes.DATE
        },
        timePassed: {
            type: DataTypes.INTEGER
        },
        isRunning: {
            type: DataTypes.BOOLEAN
        },
        oldTimePassed: {
            type: DataTypes.INTEGER
        }
    })

    Tracker.associate = (models) => {
        Tracker.belongsTo(models.User, {
            foreignKey: 'userId'
        })
    }

    return Tracker;
}