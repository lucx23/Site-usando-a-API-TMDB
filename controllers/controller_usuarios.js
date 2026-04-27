const { Usuarios } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    async pegaUsuarios(req, res) {
        const usuarios = await Usuarios.findAll();
        res.json({usuarios: usuarios});
    },

    async pegaUsuario(req, res) {
        const id = req.params.id;
        const usuario = await Usuarios.findByPk(id);

        if(!usuario) {
            return res.status(404).json({error: 'Usuario nao encontrado'});
        }

        res.render('pages/usuario', {usuario: usuario});
    },

    async cadastroUsuario(req, res) {
        const {nome, email, senha } = req.body;

        try {
            const usuarioExistente = await Usuarios.findOne({ where: { email: email } });

            if(usuarioExistente) {
                return res.status(400).render('pages/cadastro', {message: 'Email já cadastrado'});
            }

            const hash = await bcrypt.hash(senha, 10);
            const novoUsuario = await Usuarios.create({nome, email, senha: hash});
            req.session.user = { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email };

            res.render('pages/cadastro', {usuario: novoUsuario, message: 'Usuario cadastrado com sucesso'});
            
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    async loginUsuario(req, res) {
        const { email, senha } = req.body;
        
        try {
            const usuario = await Usuarios.findOne({ where: { email: email } });

            if(!usuario) {
                return res.status(404).render('pages/login', {message: 'Usuário nao encontrado'});
            }

            const comparaSenha = await bcrypt.compare(senha, usuario.senha);
            if (!comparaSenha) {
                return res.status(401).render('pages/login', {message: 'Senha incorreta'});
            }

            req.session.user = { id: usuario.id, nome: usuario.nome, email: usuario.email };
            res.redirect(`/filmes/filmes-populares`);

        } catch ( error ) {
            res.status(400).render('pages/login', {message: error.message});
        }
    },

    async logout(req, res) {
        req.session.destroy(err => {
            return res.redirect('/');
        })
    },

    async editaUsuario(req, res) {
        const id = req.params.id;
        const { nome, email, senha } = req.body;

        try {
            const usuario = await Usuarios.findByPk(id);

            if(!usuario) {
                return res.status(404).json({error: 'Usuario nao encontrado'});
            }

            usuario.nome = nome || usuario.nome;
            usuario.email = email || usuario.email;
            usuario.senha = senha || usuario.senha;
            await usuario.save();

            res.json({usuario: usuario, message: 'Usuario atualizado com sucesso'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    },

    async deletaUsuario(req, res) {
        const id = req.params.id;
        try {
            const usuario = await Usuarios.findByPk(id);

            if(!usuario) {
                return res.status(404).json({error: 'Usuario nao encontrado'});
            }

            await usuario.destroy();
            res.redirect("/");
        } catch (error) {
            res.status(400).json({error: error.message});
        }
        
    }
}