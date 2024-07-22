const express = require('express');
const router = express.Router();
const { db } = require('../database');

// Discution routes
router.post('/discution', (req, res) => {
    const { idUser, idOther } = req.body;
    const sql = `INSERT INTO Discution (id_user, id_other) VALUES (?, ?)`;
    db.run(sql, [idUser, idOther], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Discution created successfully', discutionId: this.lastID });
    });
});

// GET MY discution 
router.get('/discution/:id', (req, res) => {
    const sql = `
    SELECT 
        d.id,
        d.date_last,
        d.id_user,
        d.id_other,
        d.unread,
        d.contenue,
        (SELECT nom FROM users u WHERE u.iduser = CASE WHEN d.id_other = ? THEN d.id_user ELSE d.id_other END) AS title,
        (SELECT avatar_link FROM users u WHERE u.iduser = CASE WHEN d.id_other = ? THEN d.id_user ELSE d.id_other END) AS avatar_link
    FROM 
        Discution d 
    WHERE 
        d.id_user = ? OR d.id_other = ?
    `;
    
    db.all(sql, [req.params.id, req.params.id, req.params.id, req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'Discution not found' });
        }
    });
});

router.put('/discution/:id', (req, res) => {
    const { dateLast, lu } = req.body;
    const sql = `UPDATE Discution SET date_last = ?, lu = ? WHERE id = ?`;
    db.run(sql, [dateLast, lu, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Discution updated successfully' });
    });
});

router.delete('/discution/:id', (req, res) => {
    const sql = `DELETE FROM Discution WHERE id = ?`;
    db.run(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Discution deleted successfully' });
    });
});

// Messages routes
router.post('/message', (req, res) => {
    const { discutionId, expediteurId, contenu, reaction } = req.body;
    var sql = 'SELECT * FROM Discution WHERE id = ? ' 

    db.get(sql, [discutionId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row.id != 0) {
            sql = 'UPDATE Discution SET contenue = ? , unread = ? '
        } else {
            sql = 'INSERT INTO Discution '
        }

    })


    sql = `INSERT INTO Messages (discution_id, expediteur_id, contenu, reaction) VALUES (?, ?, ?, ?)`;
    db.run(sql, [discutionId, expediteurId, contenu, reaction], function (err) {
        if (err) console.log(err.message);
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.get('/message/:id', (req, res) => {
    const sql = `SELECT * FROM Messages WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    });
});

router.put('/message/:id', (req, res) => {
    const { contenu, reaction } = req.body;
    const sql = `UPDATE Messages SET contenu = ?, reaction = ? WHERE id = ?`;
    db.run(sql, [contenu, reaction, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Message updated successfully' });
    });
});

router.delete('/message/:id', (req, res) => {
    const sql = `DELETE FROM Messages WHERE id = ?`;
    db.run(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Message deleted successfully' });
    });
});

router.get('/discution/:id/messages', (req, res) => {
    const sql = `SELECT * FROM Messages WHERE discution_id = ? ORDER BY date_envoi ASC`;
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;