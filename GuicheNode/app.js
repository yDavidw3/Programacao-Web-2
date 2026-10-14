const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let senhaPainel = 0;
let minhaSenha = 0;
let mensagem = "";

app.get('/', (req, res) => {
    const painelFormatado = senhaPainel == 0 ? "000" : String(senhaPainel).padStart(3, '0');
    const minhaFormatada = minhaSenha == 0 ? "Nenhuma" : String(minhaSenha).padStart(3, '0');

    res.render('index', {
        senhaAtual: painelFormatado,
        senha: minhaFormatada,
        mensagem: mensagem
    });
});

app.get('/guiche', (req, res) => {
    mensagem = "";
    if (senhaPainel < 20) {
        senhaPainel++;
    } else {
        senhaPainel = 1;
    }
    res.redirect('/');
});

app.get('/guiche2', (req, res) => {
    mensagem = "";
    if (senhaPainel >= 20) {
        senhaPainel = 0;
    }
    
    const min = senhaPainel + 1;
    const max = 20;
    minhaSenha = Math.floor(Math.random() * (max - min + 1)) + min;
    
    res.redirect('/');
});

app.get('/verificar', (req, res) => {
    if (minhaSenha == 0) {
        mensagem = "Você precisa gerar uma senha primeiro!";
    } else if (minhaSenha == senhaPainel) {
        mensagem = "Sucesso! Pode se dirigir ao guichê.";
        minhaSenha = 0;
    } else if (senhaPainel > minhaSenha) {
        mensagem = "Sua senha já passou! Você perdeu a vez.";
        minhaSenha = 0;
    } else {
        mensagem = `Aguarde! O painel está no ${senhaPainel} e a sua é ${minhaSenha}.`;
    }
    res.redirect('/');
});

app.listen(8081, () => {
    console.log("Server rodando na porta 8081");
});