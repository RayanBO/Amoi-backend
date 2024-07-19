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
    authenticateUser(login, password, (err, user) => {
        if (err || !user) {
            res.status(401).json({ message: 'Authentication failed' });
        } else {
            res.status(200).json({ message: 'Authentication successful', user: user });
        }
    });
});


module.exports = router;