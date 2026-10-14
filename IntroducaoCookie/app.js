const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Habilita o cookie-parser para ler os cookies enviados pelas requisições
app.use(cookieParser());

// Mapeamento de cores para os temas
const temas = {
    claro: { bg: '#ffffff', text: '#000000', nome: 'Claro' },
    escuro: { bg: '#1a1a1a', text: '#ffffff', nome: 'Escuro' },
    azul: { bg: '#003366', text: '#ffffff', nome: 'Azul' }
};

// Rota principal: Lê o cookie do tema e renderiza a página
app.get('/', (req, res) => {
    // Pega o tema do cookie (padrão é 'claro' se não existir)
    const nomeTema = req.cookies.theme || 'claro';
    const temaAtual = temas[nomeTema] || temas.claro;

    // HTML gerado dinamicamente com base no cookie do usuário
    const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Personalizar Tema com Cookie</title>
            <style>
                body {
                    background-color: ${temaAtual.bg};
                    color: ${temaAtual.text};
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding-top: 50px;
                    transition: background 0.3s, color 0.3s;
                }
                .btn {
                    padding: 10px 20px;
                    margin: 5px;
                    cursor: pointer;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <h1>Bem-vindo ao Meu Site!</h1>
            <p>O tema atual é: <strong>${temaAtual.nome}</strong></p>
            
            <p>Escolha sua cor favorita:</p>
            <a href="/set-theme/claro"><button class="btn" style="background: #ddd; color: #000;">Claro</button></a>
            <a href="/set-theme/escuro"><button class="btn" style="background: #333; color: #fff;">Escuro</button></a>
            <a href="/set-theme/azul"><button class="btn" style="background: #0055ff; color: #fff;">Azul</button></a>
        </body>
        </html>
    `;

    res.send(html);
});

// Rota para salvar a escolha do usuário em um cookie e redirecionar de volta
app.get('/set-theme/:color', (req, res) => {
    const corEscolhida = req.params.color;

    // Valida se o tema enviado existe
    if (temas[corEscolhida]) {
        // Define o cookie com validade de 30 dias
        res.cookie('theme', corEscolhida, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
            httpOnly: true
        });
    }

    // Redireciona o usuário de volta para a página inicial
    res.redirect('/');
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});