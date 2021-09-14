//const { json } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../conexion');
var nodemailer = require('nodemailer');
xoauth2 = require('xoauth2')
var multer = require("multer");
var upload = multer({dest:"./public/images/uploads/"});


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

router.get('/getListUsers', function (req, res) {
    connection.query('select * from usuarios', (err, row)=>{
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

router.get('/formSendMail', function(req, res){
    res.send('<form method="post" enctype="multipart/form-data" action="compartir">'
        + '<p>Post Title: <input type="text" name="title"/></p>'
        + '<p>Post Content: <input type="text" name="content"/></p>'
        + '<p>Image: <input type="file" name="image"/></p>'
        + '<p><input type="submit" value="Upload"/></p>'
        + '</form>');
})

router.post('/compartir', upload.single("image"), function (req, res) {
    de=req.body.de
    para= req.body.para
    //var image = req.file.filename;

    //console.log(req)

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        secureConnection: true,
        auth: {
            user: "xiomytapinos@gmail.com",
            pass: "iydpckzbqstwtuib"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    contenido=
        "<html>"+
        "   <head>"+
        "       <style>"+
        "           .cab{"+
        "               width: 100%;"+
        "               height: 20vh"+
        "               background: #555"+
        "           }"+
        "           .cuerpo{"+
        "               width: 100%;"+
        "               height: 60vh"+
        "               background: #AFFC86"+
        "           }"+
        "       </style>"+
        "   </head>"+
        "   <body>"+
        "       <div class='cab'>"+
        "           <h3>Mira mi captura de la App de Prendas</h3>"+
        "       <div>"+
        "       <div class='cuerpo'>"+
        "           <p>Te invito a que uses esta aplicación, sirve para probarse ropa en un entorno de realidad aumentada.<br><br>¿Qué te parece?</p>"+
        "       <div>"+
        "   </body>"+
        "</html>"
        
    
    var mailOptions = {
        from: de, // sender address
        to: para, // list of receivers
        subject: "Mira lo que me probé en la App de Ropa Virtual", // Subject line
        html: contenido, // plaintext body
        /*
        attachments:[{
                fileName: req.body.title,
                contentType: req.file.mimetype,
                path: req.file.path
            }
        ]
        */
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.send('Failed');
        }else{
            console.log("Message sent: " + JSON.stringify(response));
            res.send('Worked');
        }
    }); 
})



module.exports = router;