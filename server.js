const path = require('path')
const cors = require('cors');
const express = require('express')
const app = express()

var userRoute = require('./rutas/usuarios.js');
var prendasRoute = require('./rutas/prendas.js');
var connection = require('./conexion');

//midelwares
//comunicar con otro servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('port',process.env.PORT || 3000)

//static files
app.use(express.static(path.join(__dirname,'public')));

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

const server=app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})

  

