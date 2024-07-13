const express = require('express');
const path = require('path'); // Ajoutez cette ligne
const userRoutes = require('./routes/user.js')
const homeRoutes = require('./routes/home.js');
const adminRoutes = require('./routes/admin.js');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth',userRoutes)
app.use('/home', homeRoutes);
app.use('/admin', adminRoutes);

module.exports = app;