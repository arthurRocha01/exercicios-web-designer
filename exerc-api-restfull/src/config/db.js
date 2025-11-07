import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'devuser2',
    password: 'admin123',
    database: 'cimatec_materials_db'
});
