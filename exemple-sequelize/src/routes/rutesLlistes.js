const express = require('express');
const router = express.Router();
const llistesController = require('../controllers/LlistesController');

/**
 * @swagger
 * /api/llistes:
 *   get:
 *     summary: Obté totes les llistes amb els seus vídeos
 *     description: Retorna una llista de totes les llistes de reproducció amb els vídeos associats
 *     tags: [Llistes]
 *     responses:
 *       200:
 *         description: Llistes obtingudes correctament
 *       500:
 *         description: Error en el servidor
 */
router.get('/', llistesController.obtenirLlistes);

/**
 * @swagger
 * /api/llistes:
 *   post:
 *     summary: Crea una nova llista de reproducció
 *     tags: [Llistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               descripcio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Llista creada correctament
 *       500:
 *         description: Error en crear la llista
 */
router.post('/', llistesController.crearLlista);

/**
 * @swagger
 * /api/llistes/afegir-video:
 *   post:
 *     summary: Afegeix un vídeo a una llista
 *     tags: [Llistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               llistaId:
 *                 type: integer
 *               videoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vídeo afegit a la llista correctament
 *       404:
 *         description: Llista o vídeo no trobat
 *       500:
 *         description: Error en afegir el vídeo
 */
router.post('/afegir-video', llistesController.afegirVideoALlista);

module.exports = router;
