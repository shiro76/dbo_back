exports.welcome =  (req, res) => {
    console.log('adminCtrl.welcome called'); // Ajoutez ce log
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
};