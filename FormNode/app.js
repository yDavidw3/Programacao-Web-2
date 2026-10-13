const { render } = require('ejs');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// INDEX (exercício 1) ------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {

    res.render('index', {
        nome: null,
        email: null,
        assunto: null,
        mensagem: null
    });
});

app.post('/enviarContato', (req, res) => {
    const nome  = req.body.nome;
    const email =  req.body.email;
    const assunto = req.body.assunto;
    const mensagem = req.body.mensagem;

    res.render('index', {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    });

});
// INDEX ------------------------------------------------------------------------------------------------

// VEICULO (exercício 2) ------------------------------------------------------------------------------------------------
app.get('/cadastroVeiculo', (req, res) => {
    res.render('veiculo',  {
        marca: null,
        modelo: null, 
        anoFabricacao: null,
        cor: null, 
        placa: null,
        renavam: null,
        tipo: null,
        preco: null
    });
});

app.post('/dadosVeiculo', (req, res) => {
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const anoFabricacao = req.body.anoFabricacao;
    const cor = req.body.cor;
    const placa = req.body.placa;
    const renavam = req.body.renavam;
    const tipo = req.body.tipo;
    const preco = req.body.preco;

    res.render('veiculo', {
        marca:marca,
        modelo: modelo, 
        anoFabricacao:anoFabricacao,
        cor: cor,
        placa:placa,
        renavam: renavam,
        tipo: tipo,
        preco:preco
    });

});
// VEICULO ------------------------------------------------------------------------------------------------

// TABUADA (exercício 5) ------------------------------------------------------------------------------------------------

    app.get('/tabuada1a10', (req, res) => {
        res.render('tabuada', {
            num: null
        });
    });

    app.post('/resultadoTabuada', (req, res) => {
        const num = req.body.num;

        res.render('tabuada', {
            num: num,
        })
    })

// TABUADA  ------------------------------------------------------------------------------------------------

// FIBONACCI (exercício 3) ------------------------------------------------------------------------------------------------

app.get('/fibonacci', (req, res) => {
    res.render('fibonacci', {
        num: null,
        resultado: null
    });
});

app.post('/resultadoFibonacci', (req, res) => {
    const num = Number(req.body.num);

    // validação básica
    if (isNaN(num) || num < 0) {
        return res.render('fibonacci', {
            num: null,
            resultado: "Digite um número válido"
        });
    }

    let a = 0;
    let b = 1;
    let resultado = [];

    for (let i = 0; i < num; i++) {
        resultado.push(a);
        let temp = a + b;
        a = b;
        b = temp;
    }

    res.render('fibonacci', {
        num: num,
        resultado: resultado
    });
});

// FIBONACCI  ------------------------------------------------------------------------------------------------

// SORTEIO (Exercício 4) ------------------------------------------------------------------------------------------------
let numeroRandom = 0;
let tentativas = 0;

app.get('/sorteio', (req, res) => {
    numeroRandom = Math.floor(Math.random()*6) + 1;
    tentativas = 0;
    res.render('sorteio', { resultado: null});
});

app.post('/sorteio', (req, res) => {
    const numero = parseInt(req.body.numero);
    tentativas++;
    let resultado;
    
    if (numero == numeroRandom) {
        resultado = `Parabéns! Você acertou o número sorteado: ${numeroRandom}`;
    }
    else if (tentativas >= 3) {
        resultado = `Você perdeu, o número sorteado era: ${numeroRandom}, você usou suas 3 tentativas`;
    }
    else {
        resultado = `Número incorreto! Tentativas restantes: ${3 - tentativas}`;
    }
    res.render('sorteio', {
        resultado: resultado
    });
});


// SORTEIO  ------------------------------------------------------------------------------------------------

app.listen(8081, () => {
    console.log("Servidor rodando normalmente na porta 8081")
});



























/*app.get('/in', function(req, res) {

    const n1 = Number(req.query.n1);
    const n2 = Number(req.query.n2);
    const n3 = Number(req.query.n3);

    let resultado = []
    let numSorteado = Math.floor(Math.random() * 10) + 1;

        if(n1<numSorteado) {
            resultado.push("1° menor que o sorteado")
        } else if (n1>numSorteado) {
            resultado.push("1° maior que o sorteado")
        } else {
            resultado.push("Parabéns, você acertou o número sorteado")
        }

        if(n2<numSorteado) {
            resultado.push("2° menor que o sorteado")
        } else if (n2>numSorteado) {
            resultado.push("2° maior que o sorteado")
        } else {
            resultado.push("Parabéns, você acertou o número sorteado")
        }

        if(n3<numSorteado) {
            resultado.push("3° menor que o sorteado. Tente novamente")
        } else if (n3>numSorteado) {
            resultado.push("3° maior que o sorteado. Tente novamente")
        } else {
            resultado.push("Parabéns, você acertou o número sorteado. Teste de novo a sua sorte!")
        }
    

    res.render("index", {
        n1: n1,
        n2: n2,
        n3: n3, 
        numSorteado: numSorteado,
        resultado: resultado
    })

});
*/