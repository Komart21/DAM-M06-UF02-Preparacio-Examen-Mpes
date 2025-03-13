// src/models/Valoracio.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuari = require('./Usuari');
const Video = require('./Video');

const Valoracio = sequelize.define('Valoracio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  puntuacio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuari_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuari,
      key: 'id'
    }
  },
  video_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Video,
      key: 'id'
    }
  }
});

module.exports = Valoracio;
