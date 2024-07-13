const db = require('../db'); // Importer la configuration de la base de données

exports.getUsername = (req, res) => {
    const userId = req.user.id; // ID utilisateur extrait du token

    db.query('SELECT Username FROM accounts WHERE AccountID = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ username: results[0].Username });
    });
};