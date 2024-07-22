const express = require('express');
const path = require('path');
const { authenticateUser } = require('../database');

const router = express.Router();

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/login', (req, res) => {
    const { login, password } = req.body;
    authenticateUser(login, (err, user) => {
        if (err || !user) {
            res.status(401).json({ message: 'Compte inconnue !' });
        } else {
            if (user.password !== password) return res.status(401).json({ message: 'Mot de passe incorrect !' })
            res.status(200).json({ message: 'success', user: user });
        }
    });
});


module.exports = router;