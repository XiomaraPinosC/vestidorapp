//const { json } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../conexion');


router.post('/getUserData', function (req, res) {
    id = req.body.id_usuario

    console.log("buscando al usuario " + id)
    connection.query('select nombres, apellidos, correo, telefono, direccion from usuarios where id_usuario=?  limit 1', [id], (err, row)=>{
        if(err) {
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send(row)
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})

router.post('/loginUser', function (req, res) {
    correo = req.body.correo
    clave = req.body.clave

    console.log("buscando al usuario " + correo)
    connection.query('select nombres, apellidos, correo, telefono, direccion from usuarios where correo=? and clave=?  limit 1', [correo, clave], (err, row)=>{
        if(err) {
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data: row})
            }
            else
                res.send(JSON.stringify({data: 'error'}))
        }
    });
})

router.post('/saveUser', function (req, res) {
    const reg = {
        'nombres' : req.body.nombre,
        'apellidos' : req.body.apellido,
        'correo' : req.body.correo,
        'clave' : req.body.clave
    }

    console.log("guardando usuario");
    
    connection.query('insert into usuarios set ?', reg , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el registro se guardo se forma exitosa', 'insert_id': result.insertId}))
            }
        }
    });
})

router.post('/modifyUser', function (req, res) {
    const reg = {
        'id_usuario': req.body.id_usuario,
        'nombres' : req.body.nombres,
        'apellidos' : req.body.apellidos,
        'correo' : req.body.correo,
        'telefono' : req.body.telefono,
        'direccion' : req.body.direccion
    }
    
    connection.query('update usuarios set nombres=?, apellidos=?, correo=?, telefono=?, direccion=? WHERE id_usuario=?', reg , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el registro se modificó se forma exitosa'}))
            }
        }
    });
})

router.post('/deleteUser', function (req, res) {
    const reg = {
        'id_usuario': req.body.id_usuario
    }
    
    connection.query('update usuarios set deleted=1 WHERE id_usuario=?', reg , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el registro se eliminó de forma exitosa'}))
            }
        }
    });
})

router.post('/like', function (req, res) {
    const reg = {
        id_usuario: req.body.id_usuario,
        id_prenda: req.body.id_prenda
    }


    console.log('marcando '+reg.id_usuario+" "+reg.id_prenda)
    
    connection.query('insert into likes set ?', reg , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                connection.query('update prendas set likes=likes+1 where id_prenda=?', [reg.id_prenda] , (err, result2)=>{
                    if(err) {
                        res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
                    }else{
                        if (result2) {
                            res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el like se dió de forma exitosa'}))
                        }
                    }
                })
            }
        }
    });
})

router.post('/unlike', function (req, res) {
    id_usuario= req.body.id_usuario,
    id_prenda= req.body.id_prenda
   

    console.log('desmarcando '+id_usuario+" "+id_prenda)
    
    connection.query('delete from likes where id_usuario = ? and id_prenda = ?', [id_usuario, id_prenda] , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                connection.query('update prendas set likes=likes-1 where id_prenda=?', [id_prenda] , (err, result2)=>{
                    if(err) {
                        res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
                    }else{
                        if (result2) {
                            console.log('desmarcando listo')
                            res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el like se quitó de forma exitosa'}))
                            
                        }
                        else
                        console.log('desmarcando no listo 1')
                    }
                })
            }
            else
                console.log('desmarcando no listo 2')
        }
    });
})


router.post('/fav', function (req, res) {
    const reg = {
        id_usuario: req.body.id_usuario,
        id_prenda: req.body.id_prenda
    }


    console.log('marcando favorito '+reg.id_usuario+" "+reg.id_prenda)
    
    connection.query('insert into favoritos set ?', reg , (err, result)=>{
        if(err)
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        else
            res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'se guardó en favoritos de forma exitosa'}))
        
    });
})

router.post('/unfav', function (req, res) {
    id_usuario= req.body.id_usuario,
    id_prenda= req.body.id_prenda
   

    console.log('desmarcando favorito '+id_usuario+" "+id_prenda)
    
    connection.query('delete from favoritos where id_usuario = ? and id_prenda = ?', [id_usuario, id_prenda] , (err, result)=>{
        if(err)
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        else
            res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'se quitó favoritos de forma exitosa'}))
    });
})


module.exports = router;