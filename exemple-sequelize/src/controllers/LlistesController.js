const Llista = require('../models/Llistes');
const Video = require('../models/Video');

const crearLlista = async (req, res) => {
    try {
        const { nom, descripcio } = req.body;
        const novaLlista = await Llista.create({ nom, descripcio });
        res.status(201).json(novaLlista);
    } catch (error) {
        res.status(500).json({ error: 'Error en crear la llista' });
    }
};

const obtenirLlistes = async (req, res) => {
    try {
        const llistes = await Llista.findAll({ include: Video });
        res.json(llistes);
    } catch (error) {
        res.status(500).json({ error: 'Error en obtenir les llistes' });
    }
};

const afegirVideoALlista = async (req, res) => {
    try {
        const { llistaId, videoId } = req.body;
        const llista = await Llista.findByPk(llistaId);
        const video = await Video.findByPk(videoId);

        if (!llista || !video) {
            return res.status(404).json({ error: 'Llista o vídeo no trobat' });
        }

        await llista.addVideo(video);
        res.json({ missatge: 'Vídeo afegit correctament a la llista' });
    } catch (error) {
        res.status(500).json({ error: 'Error en afegir el vídeo a la llista' });
    }
};

module.exports = {
    crearLlista,
    obtenirLlistes,
    afegirVideoALlista
};
