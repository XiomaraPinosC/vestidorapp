const express = require('express')
var http = require('http');
var bodyParser = require('body-parser');


var userRoute = require('./rutas/usuarios.js');
var prendasRoute = require('./rutas/prendas.js');
var connection = require('./conexion');


const app = express()
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//rutas 
app.use('/usuarios', userRoute);
app.use('/prendas', prendasRoute);
app.get("/prueba", (req, res)=>{
    response = {
        hola: 'hola, como estas',
        mensaje: 'esto es una prueba del servidor'
    }
    return res.end(JSON.stringify(response));
});


connection.connect((err) => {
    if (err){
        console.log(err);
        console.log('mysql no conectado!');
    }else
        console.log('mysql conectado!');

    var server = http.createServer(app);

    server.listen('3000', err =>{
        if (err){
            console.log('no puedo iniciar el servidor')
        }
        console.log('server iniciado  ')
    })
});

  

