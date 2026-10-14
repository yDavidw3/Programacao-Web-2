const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        nome: null,
        email: null,
        telefone: null,
        dataNasc: null,
        genero: null,
        estadoCivil: null,
        rg: null,
        cpf: null,
        logradouro: null,
        numero: null,
        complemento: null,
        cidade: null,
        estado: null,
        cep: null
    });
});

app.post('/cadastro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const dataNasc = req.body.dataNasc;
    const genero = req.body.genero;
    const estadoCivil = req.body.estadoCivil;
    const rg = req.body.rg;
    const cpf = req.body.cpf;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const cep = req.body.cep;

    res.render('index', {
        nome: nome,
        email: email,
        telefone: telefone,
        dataNasc: dataNasc,
        genero: genero,
        estadoCivil: estadoCivil,
        rg: rg,
        cpf: cpf,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep
        }
    );
});

app.listen(8081, () => {
    console.log('Servidor rodando na porta 8081');
});