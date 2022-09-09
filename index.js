const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();

app.use(express.json());

let teste = [
    {id:1, nome:'mateus', fone:'111-111'},
    {id:2, nome:'manu',   fone:'222-222'}
]

app.get('/', (request, response)=>response.json(teste));

app.get('/teste/:id' , (request, response, next) => {
    const {id} = request.params;
    const test = teste.find(value=> value.id == id);

    if(test== undefined){
        response.status(400).send();
    }else{
        response.json(test)
    }

});

app.post('/teste', (request, response, next)=>{
    const test = request.body
    teste.push(test)
    response.json(test);
    //response.json(request.body)
})

app.put('/teste/:id', (request, response,next) => {
    const id = request.params.id
    const nome = request.body.nome
    const test = teste.filter(value=> value.id== id);
    test[0].nome=nome;
    response.json(test[0]) 
})

app.delete('/teste/:id', (req, res, next)=>{
    const id = req.params.id
    teste = teste.filter(value=> value.id != id)
    res.json(teste)
})

app.listen(3000);