// Importa o Express
const express = require("express");

// Importa o MongoClient para conectar o Node.js ao MongoDB
const { MongoClient } = require("mongodb");

// Cria uma aplicação Express
const app = express();

// 1ª ADIÇÃO: Configura o EJS como motor de visualização
app.set('view engine', 'ejs');

// Permite que o Express receba dados enviados por formulários HTML
app.use(express.urlencoded({ extended: true }));

// Define a pasta "public" como local dos arquivos estáticos do site
app.use(express.static("public"));

// CORREÇÃO DA PORTA: Ajustado de 2/017 para 27017
const url = "mongodb://localhost:27017";

// Cria um cliente para fazer a conexão com o MongoDB
const client = new MongoClient(url);

// Função responsável por iniciar o sistema
async function iniciar() {

    // Faz a conexão com o MongoDB
    await client.connect();

    console.log("MongoDB conectado!");

    // Acessa o banco de dados chamado "login"
    const banco = client.db("login");

    // Acessa a coleção "usuario" (ajustado para o singular conforme seu Compass)
    const usuarios = banco.collection("usuario");

    // ROTA DA PÁGINA INICIAL: Carrega o seu views/index.ejs na tela do navegador
    app.get("/", function (req, res) {
        res.render("index");
    });

    // Cria uma rota para receber os dados do formulário de login
    app.post("/login", async function (req, res) {

        // Pega o usuário enviado pelo formulário
        const usuario = req.body.usuario;

        // Pega a senha enviada pelo formulário
        const senha = req.body.senha;

        // Procura no MongoDB um usuário que tenha o mesmo usuário E a mesma senha
        const resultado = await usuarios.findOne({
            usuario: usuario,
            senha: senha
        });

        // Verifica se o usuário foi encontrado
        if (resultado) {
            // Renderiza a página sucesso.ejs passando o nome correspondente
            res.render("sucesso", { nomeUsuario: resultado.usuario });
        } else {
            // Se não encontrou, envia uma mensagem de erro
            res.send("Usuário ou senha incorretos!");
        }

    });

    // Inicia o servidor na porta 3000
    app.listen(3000, function () {
        console.log("Servidor rodando em http://localhost:3000");
    });

}

// Executa a função iniciar()
iniciar();
