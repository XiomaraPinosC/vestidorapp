//const { json } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../conexion');


router.post('/getPrenda', function (req, res) {
    id = req.body.id_prenda

    connection.query('select * from prendas where id_prenda=?  limit 1', [id], (err, row)=>{
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

router.get('/getPrendas', function (req, res) {
    c = req.query.categoria
    g = req.query.genero
    t = req.query.talla

    connection.query('select * from prendas where id_categoria=? and id_genero=? and id_talla=?', [c, g, t], (err, row)=>{
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})

router.get('/buscarPrendas', function (req, res) {
    c = req.query.criterio
    categoria = req.query.categoria
    genero = req.query.genero
    talla = req.query.talla

   

    console.log(c);

    //sql ='select * from prendas where (nombre like "%"?"%" or color like "%?%") and id_categoria=? and id_genero=? and id_talla=?'
    sql ='select * from prendas where (nombre like "%"?"%" or color like "%?%")'



    console.log("buscando "+ sql);
    ret = connection.query(sql, [c, c, categoria, genero, talla], (err, row)=>{
        
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });

    console.log(ret.sql)
})

router.post('/savePrenda', function (req, res) {
    const reg = {
        'nombres' : req.body.nombres,
        'apellidos' : req.body.apellidos,
        'correo' : req.body.correo,
        'telefono' : req.body.telefono,
        'direccion' : req.body.direccion
    }
    
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

router.post('/modifyPrenda', function (req, res) {
    const reg = {
        'nombres' : req.body.nombre,
        'apellidos' : req.body.apellido,
        'correo' : req.body.correo,
        'clave' : req.body.clave
    }
    
    connection.query('update usuarios set nombres=?, apellidos=?, correo=?, clave=? WHERE id_usuario='+req.body.id_usuario, reg , (err, result)=>{
        if(err) {
            res.send(JSON.stringify({resultado: 'error', 'descripcion': err}))
        }else{
            if (result) {
                res.send(JSON.stringify({resultado: 'exito', 'descripcion': 'el registro se modificó se forma exitosa'}))
            }
        }
    });
})

router.post('/deletePrenda', function (req, res) {
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

router.get('/getLikesPrendas', function (req, res) {
    i = req.query.id

    connection.query('select * from likes where id_prenda=?', [i], (err, row)=>{
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})


router.get('/getFavoritas', function (req, res) {
    id = req.query.id_usuario

    connection.query('select * from favoritos where id_usuario=?', [id], (err, row)=>{
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})

router.get('/getprendasFavoritas', function (req, res) {
    id = req.query.id_usuario

    connection.query('select p.*, f.id_usuario from prendas as p, favoritos as f where p.id_prenda=f.id_prenda and f.id_usuario=?', [id], (err, row)=>{
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})

router.get('/getprendasSimilares', function (req, res) {
    id = req.query.id_prenda

    sql = "SELECT p.* FROM prendas as p, relacionadas_cabecera as c, relacionadas_detalle as d "+
          "where c.id_relacionada=d.id_relacionada and p.id_prenda=d.id_prenda and d.id_relacionada="+
          "(select relacionadas_detalle.id_relacionada from relacionadas_detalle where relacionadas_detalle.id_prenda=? limit 1) "+
          "and d.id_prenda !=?"

    connection.query(sql, [id, id], (err, row)=>{
        if(err) {
            res.send(JSON.stringify({data: 'error '+err}))
            console.log(err);
        }else{
            if (row && row.length ) {
                res.send({data:row})
            }
            else
                res.send(JSON.stringify({data: 'no hay registros'}))
        }
    });
})

module.exports = router;