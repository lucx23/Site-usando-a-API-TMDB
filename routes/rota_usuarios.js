const express = require('express');
const router = express.Router();
const controllerUsuarios = require('../controllers/controller_usuarios');

router.get('/', controllerUsuarios.pegaUsuarios);

router.get('/login', (req, res) => {
    res.render('pages/login', {message: null});
});

router.get('/cadastrar', (req, res) => {
    res.render('pages/cadastro', {message: null});
});

router.get('/:id/deletar', controllerUsuarios.deletaUsuario);

router.get('/logout', controllerUsuarios.logout);

router.get('/:id', controllerUsuarios.pegaUsuario);

router.get('/perfil/:id', controllerUsuarios.pegaUsuario);

router.post('/login', controllerUsuarios.loginUsuario);

router.post('/logout', controllerUsuarios.logout);

router.post('/cadastrar', controllerUsuarios.cadastroUsuario);

router.put('/:id', controllerUsuarios.editaUsuario);

router.delete('/:id/deletar', controllerUsuarios.deletaUsuario);

module.exports = router;