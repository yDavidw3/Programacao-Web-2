const express = require('express');
const app = express();

app.use(express.static('public'));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {

    res.render('index', {
        valor: null,
        num: null, 
        nota1: null,
        nota5: null,
        nota10: null,
        nota20: null,
        nota50: null,
        nota100: null,
        nota200: null
    });
});

app.post('/notaEnviada', (req, res) => {
    let num = Number(req.body.num);
    const valor = num;

    let nota1 = 0;
    let nota5 = 0;
    let nota10 = 0;
    let nota20 = 0;
    let nota50 = 0;
    let nota100 = 0;
    let nota200 = 0;

    nota200 = Math.floor(num/200);
    num = num % 200;

    

    nota100 = Math.floor(num/100);
    num = num % 100;

    nota50 = Math.floor(num/50);
    num = num % 50;

    nota20 = Math.floor(num/20);
    num = num % 20;

    nota10 = Math.floor(num/10);
    num = num % 10;

    nota5 = Math.floor(num/5);
    num = num % 5;  

    nota1 = Math.floor(num/1);
    num = num % 1;

    res.render('index', {
        valor,
        num: num, 
        nota1: nota1,
        nota5: nota5,
        nota10: nota10,
        nota20: nota20,
        nota50: nota50,
        nota100: nota100,
        nota200: nota200
    });

});


app.listen(8081, () => {
    console.log('Servidor rodando na porta 8081')
})