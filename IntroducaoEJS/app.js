const express = require ("express")
const app = express()

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get("/", function(req, res){
    const num1 = 8;
    const num2 = 2;
    const soma = num1+num2;

    res.render("index", {
        resultado: soma
    });
});

app.listen(8081, () => 
    console.log("servidor executando na porta 8081")
)