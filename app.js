// const express = require('express');
// const app = express();
// const PORT = 3000;
// const rotaFilmes = require('./routes/rota_filmes');
// const rotaUsuarios = require('./routes/rota_usuarios');
// const expressLayouts = require('express-ejs-layouts');
// const expressSession = require('express-session');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(expressSession({
//     secret: process.env.SECRET_SITE,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // 1 dia
//     }
// }))


// app.use((req, res, next) => {
//     res.locals.usuarioLogado = req.session.user || null;
//     next();
// });


// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.set('layout', 'layouts/layout');

// app.use(express.static('public'));
// app.use(expressLayouts);
// app.use('/filmes', rotaFilmes);
// app.use('/usuarios', rotaUsuarios);

// app.get('/', (req, res) => {
//     res.render('pages/index');
// });

// app.get('/sobre', (req, res) => {
//     res.render('pages/sobre');
// });

// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

const express = require('express');
const app = express();
const PORT = 3000;
const rotaFilmes = require('./routes/rota_filmes');
const rotaUsuarios = require('./routes/rota_usuarios');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// CONFIG DO BANCO (Railway + local)
const options = {
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'meubanco'
};

const sessionStore = new MySQLStore(options);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    key: 'session_cookie',
    secret: process.env.SECRET_SITE,
    store: sessionStore, // 🔥 AQUI ESTÁ A MUDANÇA
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use((req, res, next) => {
    res.locals.usuarioLogado = req.session.user || null;
    next();
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');

app.use(express.static('public'));
app.use(expressLayouts);
app.use('/filmes', rotaFilmes);
app.use('/usuarios', rotaUsuarios);

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/sobre', (req, res) => {
    res.render('pages/sobre');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});