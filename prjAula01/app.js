//const express = require('express');

//const app = express();

//app.listen(3000, function(){
    //console.log('hello world');
//})

const express = require('express');
const path = require('patch');

const app = express();

app.use(express.static(patch.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(patch.join(__dirname, 'index.html'));
})

app.listen(3000, function(){})
