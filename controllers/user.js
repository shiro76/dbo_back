const db = require('../db');
const md5 = require('md5');
const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
    const { username, password } = req.body;

    let errors = [];
    if (!username || !password) {
        errors.push('Please enter all fields');
        return res.status(400).json({ errors });
    }
  
    db.query('SELECT * FROM accounts WHERE Username = ?', [username], async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        errors.push('Invalid credentials');
        return res.status(400).json({ errors });
      }
  
      const user = result[0];
      const hashedPassword = md5(password);
      if (hashedPassword !== user.Password_hash) {
        errors.push('Invalid credentials');
        return res.status(400).json({ errors });
      }
    //   const isMatch = await bcrypt.compare(password, user.Password_hash);
    //   if (!isMatch) {
    //     errors.push('Invalid credentials');
    //     return res.status(400).json({ errors });
    //   }
  
      //const token = jwt.sign({ id: user.AccountID }, SECRET_KEY, { expiresIn: '24h' });
      res.status(200).json({ 
        userID: user.AccountID,
        token: jwt.sign(
            { id: user.AccountID },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
      });
      console.log(user.AccountID,user.Username,user.last_ip)
    });
};

exports.signup = (req, res) => {
    const { username, email, password, password2 } = req.body;

    let errors = [];
    if (!username || !email || !password || !password2) {
        errors.push('Please enter all fields');
    }
    if (password !== password2) {
        errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    db.query('SELECT * FROM accounts WHERE Username = ? OR email = ?', [username, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length > 0) {
            if (result[0].Username === username) {
                errors.push('Username already exists');
            }
            if (result[0].email === email) {
                errors.push('Email already exists');
            }
            return res.status(400).json({ errors });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        db.query('INSERT INTO accounts (Username, email, Password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};
