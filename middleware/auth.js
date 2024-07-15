const jwt = require('jsonwebtoken');
require('dotenv').config();
//const db = require('../db')
const pool = require('../db');


module.exports = (req,res,next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // Vérifier le statut admin de l'utilisateur
        pool.query('SELECT admin FROM accounts WHERE AccountID = ?', [req.user.id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user.isAdmin = results[0].admin === 10;
            next();
        });
        //next();
    } catch(error){
        res.status(400).json({ error });
    }
};

// module.exports = (req,res,next) => {
//     const authHeader = req.header('Authorization');
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ error: 'No token, authorization denied' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         // Vérifier le statut admin de l'utilisateur
//         db.query('SELECT admin FROM accounts WHERE AccountID = ?', [req.user.id], (err, results) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             if (results.length === 0) {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             req.user.isAdmin = results[0].admin === 10;
//             next();
//         });
//         //next();
//     } catch(error){
//         res.status(400).json({ error });
//     }
// };