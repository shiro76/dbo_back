const express = require('express');
const helmet = require('helmet');

const path = require('path'); // Ajoutez cette ligne
const userRoutes = require('./routes/user.js')
const homeRoutes = require('./routes/home.js');
const adminRoutes = require('./routes/admin.js');

const app = express();

// Utiliser helmet pour définir des en-têtes de sécurité
app.use(helmet());

// Ou configurer individuellement les modules de helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({
    maxAge: 31536000, // 1 an
    includeSubDomains: true,
    preload: true
}));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.dnsPrefetchControl({ allow: false }));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
    }
}));

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