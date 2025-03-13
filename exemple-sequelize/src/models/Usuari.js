// src/models/Usuari.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuari = sequelize.define('Usuari', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3],
        msg: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Has d'introduir un email vàlid"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8],
        msg: "La contrasenya ha de tenir com a mínim 8 caràcters"
      }
    }
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idioma: {
    type: DataTypes.STRING,
    defaultValue: 'ca'
  },
  data_registre: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Asegurándonos de que se exporte el modelo directamente
module.exports = Usuari;
