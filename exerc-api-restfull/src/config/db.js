// src/config/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root',       
    password: 'cimatec',       
    database: 'th_obras_db' 
});

module.exports = pool.promise();
