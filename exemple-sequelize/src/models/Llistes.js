const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Video = require('./Video');

const Llista = sequelize.define('Llista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcio: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'llistes'
});

// Relació many-to-many entre Llistes i Videos
Llista.belongsToMany(Video, { through: 'LlistaVideos' });
Video.belongsToMany(Llista, { through: 'LlistaVideos' });

module.exports = Llista;
