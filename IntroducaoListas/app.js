const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const produtos = require('./listaProdutos');
const games = require('./listaProdutosGames');

app.get('/', (req, res) => {

    res.render('index', {
        listaProdutos:produtos
    });
});

app.get('/games', (req, res) => {

    res.render('games', {
        listaProdutosGames: games
    });
});

app.listen(8081, () => {
    console.log("Servidor rodando na porta 8081");
});