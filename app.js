const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const rotaFilmes = require('./routes/rota_filmes');
const rotaUsuarios = require('./routes/rota_usuarios');
const expressLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

app.use(expressSession({
    secret: process.env.SECRET_SITE,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
        secure: true,
    }
}))




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