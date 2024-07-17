// const mysql = require('mysql2');
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool;

db.getConnection()
    .then(connection => {
        console.log('Connected to database');
        connection.release(); // Libérer la connexion après vérification
    })
    .catch(err => {
        console.error('Database connection failed:', err.stack);
    });

module.exports = db;

// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// db.connect(err => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to database');
// });

// module.exports = db;
