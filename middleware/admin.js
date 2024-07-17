module.exports = (req, res, next) => {
    console.log('Checking if user is admin'); // Ajoutez ce log
    console.log('req.user:', req.user); // Ajoutez ce log

    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Access refusée. Réservé au Admins.' });
    }
    console.log('Admin access granted'); // Ajoutez ce log
    next();
};
