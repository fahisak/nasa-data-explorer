const express = require('express');
const { apodController } = require('../controllers/apodController');
const {marsPhotosController} = require('../controllers/marsPhotosController');
const {epicController} = require('../controllers/epicController');
const {neoController} = require('../controllers/neoController');
const {nasaMediaController} = require('../controllers/nasaMediaController');
const router = express.Router();
const logger=require('../helper/logger')

logger.info("NASA Routes Loaded");
router.get('/apod', apodController.getApod);
router.get('/mars-photos', marsPhotosController.getMarsPhotos);
router.get('/epic',epicController.getEpicData);
router.get('/neo-ws', neoController.getAsteroidData);
router.get('/nasa-media', nasaMediaController.getNasaMedia);

module.exports = router;
