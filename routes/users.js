const express = require('express');
const router = express.Router();
const { db } = require('../database');

// CREATE - Add a new user
router.post('/', (req, res) => {
    const { nom, email, password } = req.body;
    const query = 'INSERT INTO users (nom, email, password) VALUES (?, ?, ?)';
    db.run(query, [nom, email, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

// READ - Get all users
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users WHERE isactif > 0';
    db.all(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// READ - Get a specific user by ID
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(results[0]);
    });
});

// UPDATE - Update a user
router.put('/:id', (req, res) => {
    const { nom, email, password } = req.body;
    const query = 'UPDATE users SET nom = ?, email = ?, password = ? WHERE id = ?';
    db.exec(query, [nom, email, password, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

// DELETE - Delete a user
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.exec(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;