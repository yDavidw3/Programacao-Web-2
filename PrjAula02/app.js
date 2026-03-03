const express = require ("express");
const app = express();

//Rota 1
app.get("/", function(req, res){
    res.send("Hello World");
})

//Rota 2
app.get("/contato", function(req, res){
    res.send("Página de contato");
})

//Rota 3
app.get("/usuario", function(req, res){
    res.send("Usuário");
})

//Rota 4
app.get("/usuario/:id", function(req, res){
    if(req.params.id == "1"){
        res.send("Usuario 1");
    }
})

app.listen(8081, function(){})