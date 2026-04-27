module.exports = {
    autenticacao(req, res, next) {
        if(!req.session.user) {
            return res.status(401).render('pages/login', {message: 'Usuario nao autenticado!'});
        }

        req.session.user = req.session.user;
        

        next();


    }
}