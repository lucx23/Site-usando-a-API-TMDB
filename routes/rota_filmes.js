const express = require('express');
const router = express.Router();
const controllerFilmesPopulares = require("../controllers/controller_filmes");

router.get('/', controllerFilmesPopulares.filmesPopulares);

router.get('/filmes-populares', controllerFilmesPopulares.filmesPopulares);

router.get('/buscar-filme', controllerFilmesPopulares.buscarFilme);

router.get('/:id', controllerFilmesPopulares.detalhesFilme);

module.exports = router;