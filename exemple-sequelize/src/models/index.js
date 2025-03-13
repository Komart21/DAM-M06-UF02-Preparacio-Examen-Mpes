const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Youtuber = require('./Youtuber');
const PerfilYoutuber = require('./PerfilYoutuber');
const Video = require('./Video');
const Categoria = require('./Categoria');
const Usuari = require('./Usuari');
const Comentari = require('./Comentari');
const Valoracio = require('./Valoracio');

// Definir el modelo intermedio VideosCategories
const VideosCategories = sequelize.define('VideosCategories', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'videos_categories',
  timestamps: false
});

// Relación 1:1 entre Youtuber y PerfilYoutuber
Youtuber.hasOne(PerfilYoutuber, { foreignKey: 'youtuber_id' });
PerfilYoutuber.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relación 1:N entre Youtuber y Video
Youtuber.hasMany(Video, { foreignKey: 'youtuber_id' });
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relación N:M entre Video y Categoria
Video.belongsToMany(Categoria, { through: VideosCategories, foreignKey: 'video_id' });
Categoria.belongsToMany(Video, { through: VideosCategories, foreignKey: 'categoria_id' });

// Relación 1:N entre Usuari y Comentari
Usuari.hasMany(Comentari, { foreignKey: 'usuari_id' });
Comentari.belongsTo(Usuari, { foreignKey: 'usuari_id' });

// Relación 1:N entre Video y Comentari
Video.hasMany(Comentari, { foreignKey: 'video_id' });
Comentari.belongsTo(Video, { foreignKey: 'video_id' });

// Relación 1:N entre Usuari y Valoracio
Usuari.hasMany(Valoracio, { foreignKey: 'usuari_id' });
Valoracio.belongsTo(Usuari, { foreignKey: 'usuari_id' });

// Relación 1:N entre Video y Valoracio
Video.hasMany(Valoracio, { foreignKey: 'video_id' });
Valoracio.belongsTo(Video, { foreignKey: 'video_id' });

// Relación entre Video y Youtuber
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

module.exports = {
  Youtuber,
  PerfilYoutuber,
  Video,
  Categoria,
  VideosCategories,
  Usuari,
  Comentari,
  Valoracio
};
