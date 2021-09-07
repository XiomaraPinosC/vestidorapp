const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'xiomara',
  password: 'Escuelita_29',
  database: 'vestidorapp'
});


module.exports = connection;



/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vestidorapp'
});
*/
