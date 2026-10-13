const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

//Quinto exercício: Linkagem de páginas
app.get('/', function(req, res) {

    res.render('index', {
    })
})


//primeiro exercício: reajuste de valor
app.get('/reajuste', function(req, res) {
    const valor = Number(req.query.valor) || 0;
    const porcentagem = Number(req.query.porcentagem) || 0;
    let valorDesconto = (valor * porcentagem) / 100;
    let valorFinal = valor + valorDesconto;

    res.render('reajuste', {
        valorinicial: valor,
        porcentagem: porcentagem,
        valorDesconto: valorDesconto,
        valorfinal: valorFinal
    })
})

//Segundo exercício: cálculo de IMC
app.get('/imc', function(req, res) {
    const peso = Number(req.query.peso) || 0;
    const altura = Number(req.query.altura) || 0;
    let imc = peso / (altura * altura);

    if(imc <18.6){
        imc = 'Abaixo do peso';
    }else if(imc >= 18.6 && imc < 24.9){
        imc = 'Peso ideal (Parabéns)';
    }else if(imc >= 24.9 && imc < 29.9){
        imc = 'Levemente acima do peso';
    }   else if(imc >= 29.9 && imc < 34.9){
        imc = 'Obesidade grau I';
    }else if(imc >= 34.9 && imc < 39.9){
        imc = 'Obesidade grau II (Severa)';
    }else{
        imc = 'Obesidade grau III (Mórbida)';
    }

    res.render('imc', {
        peso: peso,
        altura: altura,
        imc: imc
    });
});

//terceiro exercício: cálculo de média de um aluno
app.get('/aluno', function(req, res) {
    const nota1 = Number(req.query.nota1) || 0;
    const nota2 = Number(req.query.nota2) || 0;
    const nota3 = Number(req.query.nota3) || 0;
    const nota4 = Number(req.query.nota4) || 0;

    let media = (nota1 + nota2 + nota3 + nota4) / 4;

    let situação = '';

    if(media < 7){
        situação = 'Reprovado';
    }else{
        situação = 'Aprovado';
    }

    res.render('aluno', {
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        nota4: nota4,
        media: media,
        situação: situação
    });
});

//quarto exercício: cdesconto segundo a forma de pagamento
app.get('/pagamento', function(req, res){
    const valor = Number(req.query.valor) || 0;
    const avistadp = (valor * 15) / 100
    const avistacartao = (valor * 10) / 100
    const parcelado = (valor / 2)
    const opcao = req.query.opcao || '';

    let valorfinal = 0;

    if(opcao == 1){
        valorfinal = valor - avistadp;
    }else if(opcao == 2){
        valorfinal = valor - avistacartao;
    }else{
        valorfinal = parcelado;
    }

    res.render('pagamento', {
        valor: valor,
        avistadp: avistadp,
        avistacartao: avistacartao,
        parcelado: parcelado,
        valorfinal: valorfinal
    })
})


app.listen(8081 , () =>
    console.log('Servidor rodando na porta 8081')
);