const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Para ler dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Rota principal: Renderiza o formulário
app.get('/', (req, res) => {
    res.render('index', { 
        nome: null, 
        email: null,
        nascimento:null,
        estado:null       
    });
});

//importar a lista de um outro arquivo
const produtos = require('./lista-produtos');

app.get('/produtos',(req,res)=>{

    //res.json(produtos)

    res.render('produtos',{
        listaProdutos:produtos
    });    
});

// Rota POST: Recebe os dados enviados
app.post('/enviarContato', (req, res) => {
    const nome = req.body.nome  
    const email = req.body.email    
    const nascimento = req.body.nascimento
    const estado = req.body.estado
            
    res.render('index',{
            nome:nome,
            email:email,
            nascimento:nascimento,
            estado:estado            
        }        
    );
});

const mensagens = [
    "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado",
    "Não importa que você vá devagar, contanto que você não pare.",
    "A inspiração existe, porém temos que encontrá-la trabalhando.",
    "Não existe nada de completamente errado no mundo, mesmo um relógio parado, consegue estar certo duas vezes por dia.",
]

app.get('/mensagem',(req,res)=>{
    const randomMessage = mensagens[Math.floor(Math.random()*mensagens.length)]
    res.render('mensagem',{mensagem:randomMessage})
});

app.use((req,res)=>{
    res.status(404)
    res.render('404')
});

app.use((err,req,res,next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
});

app.listen(8081, () => 
    console.log("Servidor executando na porta 8081")
);