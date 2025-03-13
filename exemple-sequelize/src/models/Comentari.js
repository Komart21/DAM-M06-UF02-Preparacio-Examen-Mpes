const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuari = require('./Usuari');
const Video = require('./Video');

const Comentari = sequelize.define('Comentari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_publicacio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'comentaris'
});

module.exports = Comentari;
