const express = require('express');
const app = express();
const PORT = 3000;
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');

app.use(express.static('public'));
app.use(expressLayouts);
app.use('/filmes', require('./routes/rota_filmes'));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/sobre', (req, res) => {
    res.render('pages/sobre');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});