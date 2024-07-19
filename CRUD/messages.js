
const { db } = require('../database');

const crudMessages = {
    // Discution CRUD
    createDiscution: (idUser, idOther) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Discution (id_user, id_other) VALUES (?, ?)`;
            db.run(sql, [idUser, idOther], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    },

    getDiscution: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Discution WHERE (id_user = ? OR id_other = ?)`;
            db.all(sql, [id, id], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    updateDiscution: (id, dateLast, lu) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Discution SET date_last = ?, lu = ? WHERE id = ?`;
            db.run(sql, [dateLast, lu, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    deleteDiscution: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Discution WHERE id = ?`;
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    // Messages CRUD
    createMessage: (discutionId, expediteurId, contenu, reaction) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Messages (discution_id, expediteur_id, contenu, reaction) VALUES (?, ?, ?, ?)`;
            db.run(sql, [discutionId, expediteurId, contenu, reaction], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    },

    getMessage: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Messages WHERE id = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    updateMessage: (id, contenu, reaction) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Messages SET contenu = ?, reaction = ? WHERE id = ?`;
            db.run(sql, [contenu, reaction, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    deleteMessage: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Messages WHERE id = ?`;
            db.run(sql, [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    getMessagesForDiscution: (discutionId) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Messages WHERE discution_id = ? ORDER BY date_envoi ASC`;
            db.all(sql, [discutionId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = crudMessages;