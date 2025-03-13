const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Crea un nou usuari al sistema amb validació de dades.
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'usuari (3 caràcters o més)
 *                 example: nomUsuari
 *               email:
 *                 type: string
 *                 description: Correu electrònic de l'usuari
 *                 example: usuari@exemple.com
 *               password:
 *                 type: string
 *                 description: Contrasenya de l'usuari
 *                 example: contrasenya123
 *               nom:
 *                 type: string
 *                 description: Nom complet de l'usuari
 *                 example: Nom Complet
 *               idioma:
 *                 type: string
 *                 description: Idioma preferit de l'usuari
 *                 example: ca
 *     responses:
 *       201:
 *         description: Usuari creat correctament
 *       400:
 *         description: Error de validació
 *       409:
 *         description: L'usuari ja existeix
 *       500:
 *         description: Error en el servidor
 */
router.post('/', usuariController.crearUsuari);

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté els comentaris d'un usuari
 *     description: Recupera tots els comentaris d'un usuari pel seu ID.
 *     tags: [Usuaris]
 *     parameters:
 *       - name: id_usuari
 *         in: path
 *         required: true
 *         description: ID de l'usuari per obtenir els comentaris
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Comentaris de l'usuari obtinguts amb èxit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 missatge:
 *                   type: string
 *                   example: "Comentaris de l'usuari obtinguts amb èxit"
 *                 resultat:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       text:
 *                         type: string
 *                         example: "Gran tutorial, m'ha ajudat molt amb el meu projecte!"
 *                       data_creacio:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-15T18:30:45.000Z"
 *                       video:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           titol:
 *                             type: string
 *                             example: "Curso GRATIS de JAVASCRIPT desde cero (con ejercicios)"
 *                           url_video:
 *                             type: string
 *                             example: "https://www.youtube.com/watch?v=e3x1W9r9-rk"
 *                           youtuber:
 *                             type: object
 *                             properties:
 *                               nom_canal:
 *                                 type: string
 *                                 example: "Hola Mundo"
 *       404:
 *         description: No s'han trobat comentaris per aquest usuari
 *       500:
 *         description: Error en el servidor
 */
router.get('/comentaris/:id_usuari', usuariController.obtenirComentarisPerUsuari);

module.exports = router;
