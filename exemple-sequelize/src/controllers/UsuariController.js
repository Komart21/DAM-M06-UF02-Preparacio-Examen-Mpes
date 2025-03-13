/**
 * UsuariController.js
 * Controlador per gestionar les operacions relacionades amb els usuaris
 */

const Usuari = require('../models/Usuari');
const Comentari = require('../models/Comentari');
const Video = require('../models/Video');
const Youtuber = require('../models/Youtuber');
const { logger } = require('../config/logger');

/**
 * Crea un nou usuari
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const crearUsuari = async (req, res, next) => {
  try {
    const { username, email, password, nom, idioma } = req.body;
    logger.info(`Intent de creació d'usuari: ${username}`);

    if (!username || username.length < 3) {
      return res.status(400).json({
        ok: false,
        codi: 'ERROR_VALIDACIO',
        missatge: "Les dades proporcionades no compleixen els requisits",
        detalls: [{ camp: 'username', error: "El nom d'usuari ha de tenir com a mínim 3 caràcters" }]
      });
    }

    const existent = await Usuari.findOne({ where: { username } }) || await Usuari.findOne({ where: { email } });

    if (existent) {
      logger.warn(`Usuari duplicat detectat: ${username}`);
      return res.status(409).json({
        ok: false,
        codi: 'ERROR_DUPLICAT',
        missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
        detalls: [{
          camp: existent.username === username ? 'username' : 'email',
          error: existent.username === username ? "Aquest nom d'usuari ja està registrat" : "Aquest email ja està registrat"
        }]
      });
    }

    const nouUsuari = await Usuari.create({
      username,
      email,
      password,
      nom,
      idioma
    });

    logger.info(`Usuari creat amb èxit: ${nouUsuari.username}`);

    return res.status(201).json({
      ok: true,
      missatge: "Usuari creat amb èxit",
      resultat: {
        id: nouUsuari.id,
        username: nouUsuari.username,
        email: nouUsuari.email,
        nom: nouUsuari.nom,
        data_registre: nouUsuari.data_registre,
        idioma: nouUsuari.idioma
      }
    });

  } catch (error) {
    logger.error("Error creant usuari:", error);
    next(error);
  }
};

/**
 * Obté els comentaris d'un usuari
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const obtenirComentarisPerUsuari = async (req, res, next) => {
    try {
      const idUsuari = req.params.id_usuari;
      
      const comentaris = await Comentari.findAll({
        where: { usuari_id: idUsuari },
        include: [{
          model: Video,
          include: [{
            model: Youtuber,
            required: false
          }],
          required: true
        }]
      });
  
      if (!comentaris || comentaris.length === 0) {
        return res.status(404).json({
          ok: false,
          missatge: 'No s\'han trobat comentaris per aquest usuari'
        });
      }
  
      return res.status(200).json({
        ok: true,
        missatge: 'Comentaris de l\'usuari obtinguts amb èxit',
        resultat: comentaris.map(comentari => ({
          id: comentari.id,
          text: comentari.text,
          data_creacio: comentari.data_publicacio,
          video: comentari.video ? {
            id: comentari.video.id,
            titol: comentari.video.titol,
            url_video: comentari.video.url_video,
            youtuber: comentari.video.youtuber ? comentari.video.youtuber.nom_canal : null
          } : null
        }))
      });
  
    } catch (error) {
      console.error('Error detallado:', error);
      return res.status(500).json({
        ok: false,
        codi: 'ERROR_BASE_DADES',
        missatge: 'S\'ha produït un error en la base de dades',
        detalls: error.message || 'Error desconegut en la base de dades'
      });
    }
  };  
  

module.exports = {crearUsuari, obtenirComentarisPerUsuari};